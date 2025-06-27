package com.barbershop.service;

import com.barbershop.model.request.StaffScheduleRequest;
import com.barbershop.model.response.StaffScheduleResponse;

import java.util.List;

public interface StaffScheduleService {
    StaffScheduleResponse save(StaffScheduleRequest request);
    List<StaffScheduleResponse> findAll();
    StaffScheduleResponse findById(Integer id);
    StaffScheduleResponse update(Integer id,StaffScheduleRequest request);
    void deleteById(Integer id);
}
