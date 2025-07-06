package com.barbershop.service;

import com.barbershop.model.request.BillCreateRequest;
import com.barbershop.model.response.BillResponse;

public interface BillService {
    BillResponse getBillId(Integer id);
    BillResponse createBill(BillCreateRequest request);
}
