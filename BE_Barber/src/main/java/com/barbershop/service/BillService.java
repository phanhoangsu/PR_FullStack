package com.barbershop.service;

import com.barbershop.model.request.BillCreateRequest;
import com.barbershop.model.response.BillResponse;

import java.util.List;

public interface BillService {
    BillResponse getBillId(Integer id);
    BillResponse createBill(BillCreateRequest request);


    // ✅ NEW
    List<BillResponse> getBillsByPhone(String phone);
}
