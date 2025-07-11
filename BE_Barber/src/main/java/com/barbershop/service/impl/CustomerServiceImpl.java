package com.barbershop.service.impl;

import com.barbershop.exception.BarberException;
import com.barbershop.exception.ErrorCode.CustomerErrorCode;
import com.barbershop.exception.ErrorMessageLoader;
import com.barbershop.domain.*;
import com.barbershop.model.request.CustomerRequest;
import com.barbershop.model.response.CustomerResponse;
import com.barbershop.repository.CustomerRepository;
import com.barbershop.repository.RoleRepository;
import com.barbershop.repository.UserRepository;
import com.barbershop.service.CustomerSevice;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerSevice {

    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final Logger logger = LoggerFactory.getLogger(CustomerServiceImpl.class);


    @Transactional
    @Override
    public CustomerResponse save(CustomerRequest request) {
        CustomerResponse response = new CustomerResponse();
        try {
            // 1. Kiểm tra trùng phone (là @Id)
            if (customerRepository.existsById(request.getPhoneNumber())) {
                throw new BarberException(CustomerErrorCode.DUPLICATE_PHONE);
            }

            // 2. Kiểm tra trùng email
            if (customerRepository.existsByEmail(request.getEmail())) {
                throw new BarberException(CustomerErrorCode.DUPLICATE_EMAIL);
            }

            // 3. Kiểm tra nếu user đã tồn tại
            Optional<UserEntity> existingUserOpt = userRepository.findByUsername(request.getPhoneNumber());
            if (existingUserOpt.isPresent()) {
                UserEntity existingUser = existingUserOpt.get();

                // Nếu user đã có Customer liên kết thì lỗi
                if (customerRepository.findByUserId(existingUser.getId()).isPresent()) {
                    throw new BarberException("Người dùng đã có thông tin khách hàng");
                }

                // Ngược lại — user chưa có customer, thì có thể dùng lại user này
            }

            // 4. Tạo mới UserEntity nếu chưa có
            UserEntity newUser = existingUserOpt.orElseGet(() -> {
                UserEntity user = new UserEntity();
                user.setUsername(request.getPhoneNumber());
                user.setPasswordHash(passwordEncoder.encode(request.getPasswordHash()));

                // Gán vai trò
                Role userRole = roleRepository.findByRoleName("ROLE_CUSTOMER")
                        .orElseThrow(() -> new BarberException(CustomerErrorCode.SYSTEM_ERROR));
                UserRole userRoleLink = new UserRole();
                userRoleLink.setUser(user);
                userRoleLink.setRole(userRole);
                userRoleLink.setId(new UserRoleId(null, userRole.getId()));
                user.getRoles().add(userRoleLink);

                return userRepository.save(user);
            });

            // 5. Tạo mới Customer
            Customer customer = modelMapper.map(request, Customer.class);
            customer.setUser(newUser);
            customer.setCreatedAt(new Timestamp(System.currentTimeMillis()));

            Customer saved = customerRepository.save(customer);

            // 6. Tạo phản hồi
            response = modelMapper.map(saved, CustomerResponse.class);
            List<String> roles = newUser.getRoles().stream()
                    .map(link -> link.getRole().getRoleName())
                    .collect(Collectors.toList());
            response.setRoles(roles);
            response.setErrorCode(CustomerErrorCode.CREATE_SUCCESS);
            response.setErrorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.CREATE_SUCCESS));
        } catch (BarberException e) {
            response.setErrorCode(e.getErrorMessage().getErrorCode());
            response.setErrorMessage(ErrorMessageLoader.getProperty(e.getErrorMessage().getErrorCode()));
        } catch (Exception e) {
            response.setErrorCode(CustomerErrorCode.CREATE_FAILURE);
            response.setErrorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.CREATE_FAILURE));
        }
        return response;
    }



    @Override
    public List<CustomerResponse> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();

        return customers.stream()
                .map(customer -> {
                    CustomerResponse response = modelMapper.map(customer, CustomerResponse.class);

                    // Kiểm tra tránh null pointer
                    if (customer.getUser() != null && customer.getUser().getRoles() != null) {
                        List<String> roles = customer.getUser().getRoles().stream()
                                .map(link -> link.getRole().getRoleName())
                                .collect(Collectors.toList());
                        response.setRoles(roles);
                    }

                    response.setErrorCode(CustomerErrorCode.GET_SUCCESS);
                    response.setErrorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.GET_SUCCESS));

                    return response;
                })
                .collect(Collectors.toList());
    }

    @Override
    public CustomerResponse getById(String phoneNumber) {
        CustomerResponse response = new CustomerResponse();
        try {
            Customer customer = customerRepository.findById(phoneNumber)
                    .orElseThrow(() -> new BarberException(CustomerErrorCode.CUSTOMER_NOT_FOUND));

            response = modelMapper.map(customer, CustomerResponse.class);
            List<String> roles = customer.getUser().getRoles().stream()
                    .map(link -> link.getRole().getRoleName())
                    .collect(Collectors.toList());
            response.setRoles(roles);
            response.setErrorCode(CustomerErrorCode.GET_SUCCESS);
            response.setErrorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.GET_SUCCESS));
        } catch (BarberException e) {
            response.setErrorCode(e.getErrorMessage().getErrorCode());
            response.setErrorMessage(ErrorMessageLoader.getProperty(e.getErrorMessage().getErrorCode()));
        } catch (Exception e) {
            response.setErrorCode(CustomerErrorCode.GET_FAILURE);
            response.setErrorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.GET_FAILURE));
        }
        return response;
    }

    @Override
    public CustomerResponse update(String phoneNumber, CustomerRequest request) {
        CustomerResponse response = new CustomerResponse();
        try {
            Customer existing = customerRepository.findById(phoneNumber)
                    .orElseThrow(() -> new BarberException(CustomerErrorCode.CUSTOMER_NOT_FOUND));

            // Cập nhật thông tin (KHÔNG thay đổi số điện thoại)
            if (request.getFullName() != null && !request.getFullName().isEmpty()) {
                existing.setFullName(request.getFullName());
            }

            if (request.getEmail() != null && !request.getEmail().isEmpty()) {
                customerRepository.findByEmail(request.getEmail()).ifPresent(duplicate -> {
                    if (!duplicate.getPhoneNumber().equals(phoneNumber)) {
                        throw new BarberException(CustomerErrorCode.DUPLICATE_EMAIL);
                    }
                });
                existing.setEmail(request.getEmail());

            }
            customerRepository.save(existing);

            response = modelMapper.map(existing, CustomerResponse.class);
            List<String> roles = existing.getUser().getRoles().stream()
                    .map(link -> link.getRole().getRoleName())
                    .collect(Collectors.toList());
            response.setRoles(roles);
            response.setErrorCode(CustomerErrorCode.UPDATE_SUCCESS);
            response.setErrorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.UPDATE_SUCCESS));
        } catch (BarberException e) {
            response.setErrorCode(e.getErrorMessage().getErrorCode());
            response.setErrorMessage(ErrorMessageLoader.getProperty(e.getErrorMessage().getErrorCode()));
        } catch (Exception e) {
            response.setErrorCode(CustomerErrorCode.UPDATE_FAILURE);
            response.setErrorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.UPDATE_FAILURE));
        }
        return response;
    }

    @Override
    public CustomerResponse delete(String phoneNumber) {
        CustomerResponse response = new CustomerResponse();
        try {
            Customer existing = customerRepository.findById(phoneNumber)
                    .orElseThrow(() -> new BarberException(CustomerErrorCode.CUSTOMER_NOT_FOUND));
            customerRepository.deleteById(phoneNumber);
            response = modelMapper.map(existing, CustomerResponse.class);
            List<String> roles = existing.getUser().getRoles().stream()
                    .map(link -> link.getRole().getRoleName())
                    .collect(Collectors.toList());
            response.setRoles(roles);
            response.setErrorCode(CustomerErrorCode.DELETE_SUCCESS);
            response.setErrorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.DELETE_SUCCESS));
        } catch (BarberException e) {
            response.setErrorCode(e.getErrorMessage().getErrorCode());
            response.setErrorMessage(ErrorMessageLoader.getProperty(e.getErrorMessage().getErrorCode()));
        } catch (Exception e) {
            response.setErrorCode(CustomerErrorCode.DELETE_FAILURE);
            response.setErrorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.DELETE_FAILURE));
        }
        return response;
    }

    @Override
    public Page<CustomerResponse> searchCustomers(String phoneNumber, int page, int size) {
        Pageable pageable=PageRequest.of(page, size);
        Page<Customer> customerPage=customerRepository.findByPhoneNumberContaining(phoneNumber, pageable);

        return customerPage.map(customer -> {
            CustomerResponse response = modelMapper.map(customer, CustomerResponse.class);

            if(customer.getUser() !=null && customer.getUser().getRoles() !=null){
                List<String> roles=customer.getUser().getRoles().stream()
                        .map(link->link.getRole().getRoleName())
                        .collect(Collectors.toList());
                response.setRoles(roles);
            }
            response.setErrorCode(CustomerErrorCode.GET_SUCCESS);
            response.setErrorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.GET_SUCCESS));
            return response;
        });
    }

}