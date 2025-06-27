package com.barbershop.service;


import com.barbershop.model.request.ServiceRequest;
import com.barbershop.model.response.ServiceResponse;

import java.util.List;

public interface ServiceService {
    ServiceResponse create(ServiceRequest request);
    ServiceResponse update(Integer id, ServiceRequest request);
    void delete(Integer id);
    List<ServiceResponse> getAll();
    ServiceResponse getById(Integer id);
}
