package com.barbershop.service.impl;

import com.barbershop.domain.*;
import com.barbershop.model.request.AppointmentRequest;
import com.barbershop.model.response.AppointmentResponse;
import com.barbershop.repository.*;
import com.barbershop.service.AppointmentService;
import com.barbershop.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        if (emailToSend != null && !emailToSend.isEmpty()) {
            String subject = "Xác nhận đặt lịch thành công";
            String content = "<h3>Xin chào " + customer.getFullName() + ",</h3>"
                    + "<p>Bạn đã đặt lịch thành công dịch vụ <strong>" + service.getServiceName() + "</strong></p>"
                    + "<p>Thời gian: <strong>" + request.getStartTime() + "</strong></p>"
                    + "<p>Nhân viên: <strong>" + staff.getFullName() + "</strong></p>"
                    + "<br/><p>Trân trọng,<br/>Barbershop</p>";

            emailService.sendEmail(emailToSend, subject, content);
        }

        return new AppointmentResponse(saved.getId(), saved.getStatus(), "Đã đặt lịch thành công");
    }
}
