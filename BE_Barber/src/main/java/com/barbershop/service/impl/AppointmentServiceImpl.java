package com.barbershop.service.impl;

import com.barbershop.domain.*;
import com.barbershop.model.request.AppointmentRequest;
import com.barbershop.model.response.AppointmentResponse;
import com.barbershop.repository.*;
import com.barbershop.service.AppointmentService;
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


    @Override
    public AppointmentResponse createAppointment(AppointmentRequest request, String username) {
       // lấy user từ tên đang nhập
        UserEntity user=userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));


        // Kiểm tra khách hàng theo số điện thoại
        Customer customer = customerRepository.findByPhoneNumber(request.getPhoneNumber())
                .orElseGet(() -> {
                    // Nếu chưa có thì tạo mới
                    Customer newCustomer = new Customer();
                    newCustomer.setPhoneNumber(request.getPhoneNumber());
                    newCustomer.setFullName(request.getFullName());
                    newCustomer.setUser(user); // gán user
                    return customerRepository.save(newCustomer);
                });


        // tìm service và Staff
        ServiceEntity service=serviceRepository.findById(request.getServiceId())
                .orElseThrow(()->new RuntimeException("Dịch vụ không tồn tại"));

        Staff staff=staffRepository.findById(request.getStaffId())
                .orElseThrow(()->new RuntimeException("Nhân viên không tồn tại"));

        // kiểm tra nhân viên đã có lịch chưa
        boolean isBusy = appointmentRepository.existsByStaffAndStartTime(staff, request.getStartTime()); // phải có dấu ","

        if(isBusy){
            throw new RuntimeException("Nhân viên đang bận thời gian này: " + request.getStartTime());
        }

        // tạo lịch hẹn mới
        Appointment appointment=new Appointment();
        appointment.setPhoneNumber(customer);
        appointment.setService(service);
        appointment.setStaff(staff);
        appointment.setStartTime(request.getStartTime());
        appointment.setEndTime(request.getEndTime());
        appointment.setNote(request.getNotes());
        appointment.setStatus("Đã đặt");

        Appointment saved=appointmentRepository.save(appointment);
        return new AppointmentResponse(saved.getId(),saved.getStatus(),"Đã đặt lịch thành công");
    }
}
