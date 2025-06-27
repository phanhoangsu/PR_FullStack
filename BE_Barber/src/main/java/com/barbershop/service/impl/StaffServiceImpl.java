//package com.barbershop.service.impl;
//
//import com.barbershop.domain.Role;
//import com.barbershop.exception.BarberException;
//import com.barbershop.domain.Staff;
//import com.barbershop.model.request.StaffRequest;
//import com.barbershop.model.response.StaffResponse;
//import com.barbershop.repository.RoleRepository;
//import com.barbershop.repository.StaffRepository;
//import com.barbershop.service.StaffService;
//import lombok.RequiredArgsConstructor;
//import org.modelmapper.ModelMapper;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//@RequiredArgsConstructor
//public class StaffServiceImpl implements StaffService {
//    private final StaffRepository staffRepository;
//    private final ModelMapper modelMapper;
//    private  final RoleRepository roleRepository;
//
//    @Override
//    public StaffResponse save(StaffRequest request) {
//        Staff staff = modelMapper.map(request, Staff.class);
//        // Gán role mặc định cứng là ROLE_STAFF
//        Role role = roleRepository.findByRoleName("ROLE_STAFF")
//                .orElseThrow(() -> new RuntimeException("Vai trò mặc định không tồn tại: ROLE_STAFF"));
//        staff.setRole(role);
//        staffRepository.save(staff);
//        return modelMapper.map(staff, StaffResponse.class);
//    }
//
//    @Override
//    public List<StaffResponse> findAll() {
//        return staffRepository.findAll().stream().map(x -> modelMapper.map(x, StaffResponse.class)).collect(Collectors.toList());
//    }
//
//    @Override
//    public StaffResponse findById(Integer id) {
//        Staff staff = staffRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy nhân viên ID: " + id));
//        return modelMapper.map(staff, StaffResponse.class);
//    }
//
//    @Override
//    public StaffResponse update(Integer id, StaffRequest request) {
//        Staff staff = staffRepository.findById(id).orElseThrow(() -> new BarberException("Không tìm thấy nhân viên để cập nhật"));
//       modelMapper.map(request, staff);
//
////       Role role=roleRepository.findByRoleName(request.getRole())
////                       .orElseThrow(()->new RuntimeException("Vai trò không hợp lệ : " +request.getRole()));
////       staff.setRole(role);
//
//        // Không cho cập nhật vai trò -> giữ ROLE_STAFF
//        Role role = roleRepository.findByRoleName("ROLE_STAFF")
//                .orElseThrow(() -> new RuntimeException("Vai trò mặc định không tồn tại: ROLE_STAFF"));
//        staff.setRole(role);
//
//       staffRepository.save(staff);
//        return modelMapper.map(staff, StaffResponse.class);
//    }
//
//    @Override
//    public void deleteById(Integer id) {
//        if (!staffRepository.existsById(id)) {
//            throw new BarberException("Không tìm thấy nhân viên để xóa");
//        }
//        staffRepository.deleteById(id);
//    }
//}
package com.barbershop.service.impl;

import com.barbershop.domain.Role;
import com.barbershop.domain.Staff;
import com.barbershop.exception.BarberException;
import com.barbershop.exception.ErrorCode.StaffErrorCode;
import com.barbershop.model.request.StaffRequest;
import com.barbershop.model.response.StaffResponse;
import com.barbershop.repository.RoleRepository;
import com.barbershop.repository.StaffRepository;
import com.barbershop.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional

public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;

    @Override
    public StaffResponse save(StaffRequest request) {
        try {
            Staff staff = modelMapper.map(request, Staff.class);

            Role role = roleRepository.findByRoleName("ROLE_STAFF")
                    .orElseThrow(() -> new BarberException(StaffErrorCode.INVALID_ROLE));

            staff.setRole(role);
            staffRepository.save(staff);

            return modelMapper.map(staff, StaffResponse.class);
        } catch (Exception ex) {
            throw new BarberException(StaffErrorCode.CREATE_FAILURE);
        }
    }

    @Override
    public List<StaffResponse> findAll() {
        try {
            return staffRepository.findAll().stream()
                    .map(staff -> modelMapper.map(staff, StaffResponse.class))
                    .collect(Collectors.toList());
        } catch (Exception ex) {
            throw new BarberException(StaffErrorCode.GET_FAILURE);
        }
    }

    @Override
    public StaffResponse findById(Integer id) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new BarberException(StaffErrorCode.STAFF_NOT_FOUND));
        return modelMapper.map(staff, StaffResponse.class);
    }

    @Override
    public StaffResponse update(Integer id, StaffRequest request) {
        try {
            Staff staff = staffRepository.findById(id)
                    .orElseThrow(() -> new BarberException(StaffErrorCode.STAFF_NOT_FOUND));

            modelMapper.map(request, staff);

            Role role = roleRepository.findByRoleName("ROLE_STAFF")
                    .orElseThrow(() -> new BarberException(StaffErrorCode.INVALID_ROLE));
            staff.setRole(role);

            staffRepository.save(staff);
            return modelMapper.map(staff, StaffResponse.class);
        } catch (Exception ex) {
            throw new BarberException(StaffErrorCode.UPDATE_FAILURE);
        }
    }

    @Override
    public void deleteById(Integer id) {
        if (!staffRepository.existsById(id)) {
            throw new BarberException(StaffErrorCode.STAFF_NOT_FOUND);
        }

        try {
            staffRepository.deleteById(id);
        } catch (Exception ex) {
            throw new BarberException(StaffErrorCode.DELETE_FAILURE);
        }
    }
}
