package com.barbershop.service;

import com.barbershop.model.request.CustomerRequest;
import com.barbershop.model.response.CustomerResponse;
import org.springframework.data.domain.Page;

import java.awt.print.Pageable;
import java.util.List;

public interface CustomerSevice {
    CustomerResponse save(CustomerRequest customerRequest);
    List<CustomerResponse> getAllCustomers();
    CustomerResponse getById(String phoneNumber);
    CustomerResponse update(String phoneNumber, CustomerRequest customerRequest);
    CustomerResponse delete(String phoneNumber);

    Page<CustomerResponse> searchCustomers(String phoneNumber, int page, int size);

}
