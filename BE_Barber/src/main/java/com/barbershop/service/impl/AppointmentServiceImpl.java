package com.barbershop.service.impl;

import com.barbershop.domain.*;
import com.barbershop.model.request.AppointmentRequest;
import com.barbershop.model.response.AppointmentResponse;
import com.barbershop.repository.*;
import com.barbershop.service.AppointmentService;
import com.barbershop.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final CustomerRepository customerRepository;
    private final ServiceRepository serviceRepository;
    private final StaffRepository staffRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private static final Logger log = LoggerFactory.getLogger(AppointmentServiceImpl.class);

    @Override
    public AppointmentResponse createAppointment(AppointmentRequest request, String username) {

        UserEntity user = null;
        if (username != null) {
            user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));
        }

        // Tìm customer theo phone hoặc theo user
        Customer customer = customerRepository.findByPhoneNumber(request.getPhoneNumber())
                .orElse(null);
        if (customer == null && user != null) {
            customer = customerRepository.findByUserId(user.getId()).orElse(null);
        }
        if (customer == null) {
            customer = new Customer();
            customer.setPhoneNumber(request.getPhoneNumber());
            customer.setFullName(request.getFullName());
            customer.setUser(user);
            customer.setEmail(request.getEmail());
            if (user != null) {
                customer.setUser(user);
            }

            customer = customerRepository.save(customer);
        }

        // tìm service
        ServiceEntity service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Dịch vụ không tồn tại"));

        // Tìm nhân viên
        Staff staff;
        if (request.getStaffId() == null) {
            // tìm danh sác nhân viên đang rảnh
            staff = staffRepository.findAllByIsAvailableTrue().stream()
                    .filter(s -> !appointmentRepository.existsByStaffAndStartTime(s, request.getStartTime()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Không có nhân viên nào đang rảnh thời gian này"));
        } else {
            staff = staffRepository.findById(request.getStaffId())
                    .orElseThrow(() -> new RuntimeException("Nhân viên không tồn tại"));

            boolean isBusy = appointmentRepository.existsByStaffAndStartTime(staff, request.getStartTime());
            if (isBusy) {
                throw new RuntimeException("Nhân viên đang bận thời gian này: " + request.getStartTime());
            }
        }


        // tạo lịch hẹn mới
        Appointment appointment = new Appointment();
        appointment.setPhoneNumber(customer);
        appointment.setService(service);
        appointment.setStaff(staff);
        appointment.setStartTime(request.getStartTime());
//        appointment.setEndTime(request.getEndTime());
        appointment.setNote(request.getNotes());
        appointment.setStatus("Đã đặt");

        Appointment saved = appointmentRepository.save(appointment);
        // Gửi email nếu có
        String emailToSend = request.getEmail();
        if ((emailToSend == null || emailToSend.isEmpty()) && customer.getEmail() != null) {
            emailToSend = customer.getEmail();
        }

//        if (emailToSend != null && !emailToSend.isEmpty()) {
//            String subject = "Xác nhận đặt lịch thành công";
//            String content = "<h3>Xin chào " + customer.getFullName() + ",</h3>"
//                    + "<p>Bạn đã đặt lịch thành công dịch vụ <strong>" + service.getServiceName() + "</strong></p>"
//                    + "<p>Thời gian: <strong>" + request.getStartTime() + "</strong></p>"
//                    + "<p>Nhân viên: <strong>" + staff.getFullName() + "</strong></p>"
//                    + "<br/><p>Trân trọng,<br/>Barbershop</p>";
//
//            emailService.sendEmail(emailToSend, subject, content);
//        }
//        if (emailToSend != null && !emailToSend.isEmpty()) {
//            String subject = "🎉 Xác nhận đặt lịch thành công tại Barbershop";
//
////            String formattedTime = request.getStartTime()
////                    .format(DateTimeFormatter.ofPattern("HH:mm 'ngày' dd/MM/yyyy"));
//
//            String content = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; line-height: 1.6; color: #333;'>"
//                    + "<h2 style='color: #f0a500; text-align: center;'>✂️ ĐẶT LỊCH THÀNH CÔNG ✂️</h2>"
//
//                    + "<p>Xin chào <strong>" + customer.getFullName() + "</strong>,</p>"
//                    + "<p>Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của <strong>Barbershop</strong>. Dưới đây là thông tin chi tiết về lịch hẹn của bạn:</p>"
//
//                    + "<table style='width: 100%; border-collapse: collapse;'>"
//                    + "<tr><td style='padding: 8px;'><strong>Dịch vụ:</strong></td><td style='padding: 8px;'>" + service.getServiceName() + " (" + service.getType() + ")</td></tr>"
//                    + "<tr><td style='padding: 8px;'><strong>Giá:</strong></td><td style='padding: 8px;'>" + service.getPrice().toPlainString()  + " VNĐ</td></tr>"
//                    + "<tr><td style='padding: 8px;'><strong>Nhân viên:</strong></td><td style='padding: 8px;'>" + staff.getFullName() + "</td></tr>"
//                    + "<tr><td style='padding: 8px;'><strong>Thời gian:</strong></td><td style='padding: 8px;'>" + request.getStartTime() + "</td></tr>";
//
//            if (request.getNotes() != null && !request.getNotes().trim().isEmpty()) {
//                content += "<tr><td style='padding: 8px;'><strong>Ghi chú:</strong></td><td style='padding: 8px;'>" + request.getNotes() + "</td></tr>";
//            }
//
//            content += "</table>"
//
//                    + "<hr style='margin: 20px 0; border: none; border-top: 1px solid #eee;'/>"
//
//                    + "<h4>👤 Thông tin khách hàng</h4>"
//                    + "<table style='width: 100%; border-collapse: collapse;'>"
//                    + "<tr><td style='padding: 8px;'><strong>Họ tên:</strong></td><td style='padding: 8px;'>" + customer.getFullName() + "</td></tr>"
//                    + "<tr><td style='padding: 8px;'><strong>SĐT:</strong></td><td style='padding: 8px;'>" + customer.getPhoneNumber() + "</td></tr>"
//                    + "<tr><td style='padding: 8px;'><strong>Email:</strong></td><td style='padding: 8px;'>" + (customer.getEmail() != null ? customer.getEmail() : "Chưa cung cấp") + "</td></tr>"
//                    + "</table>"
//
//                    + "<p style='margin-top: 20px;'>⏰ <strong>Lưu ý:</strong> Vui lòng đến sớm 10 phút trước giờ hẹn để được phục vụ tốt nhất.</p>"
//                    + "<p>📍 <strong>Địa chỉ:</strong> 123 Đường Cắt Tóc, Quận 1, TP.HCM</p>"
//                    + "<p>📞 <strong>Hotline:</strong> 0909 999 999</p>"
//
//                    + "<p style='margin-top: 30px;'>Trân trọng,</p>"
//                    + "<p style='font-weight: bold;'>Barbershop Team</p>"
//                    + "<p style='font-size: 12px; color: #888;'>Đây là email tự động, vui lòng không trả lời email này.</p>"
//                    + "</div>";
//
//            emailService.sendEmail(emailToSend, subject, content);
//        }

        if (emailToSend != null && !emailToSend.isEmpty()) {
            String subject = "🎉 Xác nhận đặt lịch thành công tại Barbershop";

            String formattedTime = request.getStartTime()
                    .toLocalDateTime().format(DateTimeFormatter.ofPattern("HH:mm 'ngày' dd/MM/yyyy"));

            String content = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; line-height: 1.6; color: #333;'>"
                    + "<div style='text-align: center;'>"
                    + "<img src='https://res.cloudinary.com/dbpqjnu0o/image/upload/v1751553544/logo_s4uskn.png' alt='Barbershop Logo' style='height: 60px; margin-bottom: 10px;'/>"
                    + "<h2 style='color: #f0a500;'>✂️ Barbershop - Xác nhận đặt lịch ✂️</h2>"
                    + "</div>"

                    + "<p>Xin chào <strong>" + customer.getFullName() + "</strong>,</p>"
                    + "<p>Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của <strong>Barbershop</strong>. Dưới đây là thông tin chi tiết về lịch hẹn của bạn:</p>"

                    + "<table style='width: 100%; border-collapse: collapse;'>"
                    + "<tr><td style='padding: 8px;'><strong>Mã lịch hẹn:</strong></td><td style='padding: 8px;'>#" + saved.getId() + "</td></tr>"
                    + "<tr><td style='padding: 8px;'><strong>Dịch vụ:</strong></td><td style='padding: 8px;'>" + service.getServiceName() + " (" + service.getType() + ")</td></tr>"
                    + "<tr><td style='padding: 8px;'><strong>Giá:</strong></td><td style='padding: 8px;'>" + service.getPrice().toPlainString() + " VNĐ</td></tr>"
                    + "<tr><td style='padding: 8px;'><strong>Nhân viên:</strong></td><td style='padding: 8px;'>" + staff.getFullName() + "</td></tr>"
                    + "<tr><td style='padding: 8px;'><strong>Thời gian:</strong></td><td style='padding: 8px;'>" + formattedTime + "</td></tr>";

            if (request.getNotes() != null && !request.getNotes().trim().isEmpty()) {
                content += "<tr><td style='padding: 8px;'><strong>Ghi chú:</strong></td><td style='padding: 8px;'>" + request.getNotes() + "</td></tr>";
            }

            content += "</table>"

                    + "<hr style='margin: 20px 0; border: none; border-top: 1px solid #eee;'/>"

                    + "<h4>👤 Thông tin khách hàng</h4>"
                    + "<table style='width: 100%; border-collapse: collapse;'>"
                    + "<tr><td style='padding: 8px;'><strong>Họ tên:</strong></td><td style='padding: 8px;'>" + customer.getFullName() + "</td></tr>"
                    + "<tr><td style='padding: 8px;'><strong>SĐT:</strong></td><td style='padding: 8px;'>" + customer.getPhoneNumber() + "</td></tr>"
                    + "<tr><td style='padding: 8px;'><strong>Email:</strong></td><td style='padding: 8px;'>" + (customer.getEmail() != null ? customer.getEmail() : "Chưa cung cấp") + "</td></tr>"
                    + "</table>"

                    + "<div style='text-align: center; margin: 30px 0;'>"
                    + "<a href='http://localhost:5173/services' style='background-color: #f0a500; color: #000; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;'>"
                    + "Xem lịch hẹn của bạn"
                    + "</a>"
                    + "</div>"

                    + "<p style='margin-top: 20px;'>⏰ <strong>Lưu ý:</strong> Vui lòng đến sớm 10 phút trước giờ hẹn để được phục vụ tốt nhất.</p>"
                    + "<p>📍 <strong>Địa chỉ:</strong> 123 Đường Cắt Tóc, Quận 1, TP.HCM</p>"
                    + "<p>📞 <strong>Hotline:</strong> 0909 999 999</p>"

                    + "<hr style='margin: 30px 0; border: none; border-top: 1px solid #eee;'/>"
                    + "<h4>🎁 Ưu đãi hôm nay dành riêng cho bạn</h4>"
                    + "<ul style='padding-left: 18px;'>"
                    + "<li>Giảm 10% khi đặt combo Gội - Cắt - Cạo</li>"
                    + "<li>Tặng 1 gói hấp dầu khi đi cùng bạn bè</li>"
                    + "</ul>"

                    + "<p style='margin-top: 30px;'>Trân trọng,</p>"
                    + "<p style='font-weight: bold;'>Barbershop Team</p>"
                    + "<p style='font-size: 12px; color: #888;'>Đây là email tự động, vui lòng không trả lời email này.</p>"
                    + "</div>";

            emailService.sendEmail(emailToSend, subject, content);
        }




//        return new AppointmentResponse(saved.getId(), saved.getStatus(), "Đã đặt lịch thành công");

        return new AppointmentResponse(
                saved.getId(),
                saved.getStatus(),
                "Đã đặt lịch thành công",
                saved.getService() != null ? saved.getService().getServiceName() : null,
                saved.getStaff() != null ? saved.getStaff().getFullName() : null,
                saved.getStartTime(),
                saved.getNote()
        );
    }

    @Override
    public List<AppointmentResponse> getAppointmentsByUsername(String username) {
        log.info(">>> [LOG] Username: {}", username);

        Optional<Customer> optional = customerRepository.findByUser_Username(username);
        if (optional.isEmpty()) {
            log.warn(">>> Không tìm thấy customer với username: {}", username);
            return List.of();
        }

        String phoneNumber = optional.get().getPhoneNumber();
        log.info(">>> Số điện thoại của user: {}", phoneNumber);

        List<Appointment> appointments = appointmentRepository.findByPhoneNumber_PhoneNumber(phoneNumber);
        log.info(">>> Tổng lịch hẹn: {}", appointments.size());

        return appointments.stream()
                .map(a -> new AppointmentResponse(
                        a.getId(),
                        a.getStatus(),
                        "",
                        a.getService() != null ? a.getService().getServiceName() : null,
                        a.getStaff() != null ? a.getStaff().getFullName() : null,
                        a.getStartTime(),
                        a.getNote()
                ))
                .collect(Collectors.toList());
    }



    @Override
    public boolean cancelAppointment(Integer id, String username) {
        Optional<Appointment> optional = appointmentRepository.findById(id);
        if (optional.isEmpty()) {
            log.warn(">>> Không tìm thấy lịch hẹn ID = {}", id);
            return false;
        }

        Appointment appointment = optional.get();

        // Sửa ở đây: dùng username để tìm Customer
        Customer customer = customerRepository.findByUser_Username(username).orElse(null);
        if (customer == null) {
            log.warn(">>> Không tìm thấy customer với username = {}", username);
            return false;
        }

        if (!appointment.getPhoneNumber().getPhoneNumber().equals(customer.getPhoneNumber())) {
            log.warn(">>> Lịch hẹn không thuộc về người dùng: {}, phone DB = {}, phone user = {}",
                    username,
                    appointment.getPhoneNumber().getPhoneNumber(),
                    customer.getPhoneNumber());
            return false;
        }

        log.info(">>> Đang hủy lịch hẹn ID = {}, của user = {}", id, username);
        appointment.setStatus("Đã hủy");
        appointmentRepository.save(appointment);
        return true;
    }



    @Override
    public List<AppointmentResponse> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();

        return appointments.stream()
                .map(a -> new AppointmentResponse(
                        a.getId(),
                        a.getStatus(),
                        "", // message
                        a.getService() != null ? a.getService().getServiceName() : null,
                        a.getStaff() != null ? a.getStaff().getFullName() : null,
                        a.getStartTime(),
                        a.getNote()
                ))
                .collect(Collectors.toList());
    }


}
