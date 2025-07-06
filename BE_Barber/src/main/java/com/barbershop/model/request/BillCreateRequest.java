package com.barbershop.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillCreateRequest {
    private String phoneNumber;
    private Integer appointmentId;
    private Integer createdBy;
    private String paymentMethod;
    private String note;
    private List<BillItemCreateRequest> items;
}