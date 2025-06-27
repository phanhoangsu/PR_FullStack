//package com.barbershop.service.impl;
//
//import com.barbershop.config.security.JwtUtils;
//import com.barbershop.domain.*;
//import com.barbershop.exception.BarberException;
//import com.barbershop.exception.ErrorCode.CustomerErrorCode;
//import com.barbershop.repository.CustomerRepository;
//import com.barbershop.repository.RoleRepository;
//import com.barbershop.repository.UserRepository;
//import com.barbershop.repository.UserRoleRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class AuthServiceImpl implements AuthService {
//    private final UserRepository userRepository;
//    private final CustomerRepository customerRepository;
//    private final PasswordEncoder passwordEncoder;
//    private final RoleRepository roleRepository;
//    private final UserRoleRepository userRoleRepository;
//    private final JwtUtils jwtUtils;
//
////    @Override
////    public RegisterResponse register(RegisterRequest request) {
////
////        if (customerRepository.existsByEmail(request.getEmail())) {
////            throw new BarberException(CustomerErrorCode.DUPLICATE_EMAIL);
////        }
////        if(customerRepository.existsByPhoneNumber(request.getPhoneNumber())) {
////            throw new BarberException(CustomerErrorCode.DUPLICATE_PHONE);
////        }
////
////        // tạo user
////        UserEntity user = new UserEntity();
////        user.setUsername(request.getUsername());
////        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
////        UserEntity savedUser = userRepository.save(user);
////
////        // gán quyền Role
////        Role customerRole = roleRepository.findByRoleName("ROLE_CUSTOMER")
////                .orElseThrow(()->new RuntimeException("Vai trò ROLE_CUSTOMER chưa được tạo"));
////        UserRole userRole = new UserRole();
////        userRole.setUser(savedUser);
////        userRole.setRole(customerRole);
////        userRole.setId(new UserRoleId(savedUser.getId(),customerRole.getId()));
////
////        userRoleRepository.save(userRole);
////
////        // tạp customer
////        Customer customer = new Customer();
////        customer.setPhoneNumber(request.getPhoneNumber());
////        customer.setFullName(request.getFullName());
////        customer.setEmail(request.getEmail());
////        customer.setUser(savedUser);
////        customer.setCreatedAt(new Timestamp(System.currentTimeMillis()));
////
////        customerRepository.save(customer);
////
////        // trả về kết quả
////
////        RegisterResponse response = new RegisterResponse();
////        response.setMessage(CustomerErrorCode.CREATE_SUCCESS);
////        response.setUsername(request.getUsername());
////        return response;
////    }
//
//    public void requestResetPassword(String email) {
//        Customer customer = customerRepository.findByEmail(email)
//                .orElseThrow(() -> new BarberException(CustomerErrorCode.DUPLICATE_EMAIL));
//
//        String username=customer.getUser().getUsername();
//        String token=jwtUtils.generateResetPasswordToken(username);
//
//        String resetUrl="http://localhost:3000/reset-password?token=" + token;
//
//        System.out.println("💌 Gửi email reset: " + resetUrl);
//    }
//}
