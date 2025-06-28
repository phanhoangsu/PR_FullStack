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
