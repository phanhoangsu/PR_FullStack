package com.barbershop.service;


import com.barbershop.model.request.StaffRequest;
import com.barbershop.model.response.StaffResponse;

import java.util.List;

public interface StaffService {
    StaffResponse save(StaffRequest request);
    List<StaffResponse> findAll();
    StaffResponse findById(Integer id);
    StaffResponse update(Integer id, StaffRequest request);
    void deleteById(Integer id);
}
