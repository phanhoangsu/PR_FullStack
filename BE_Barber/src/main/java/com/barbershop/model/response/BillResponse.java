package com.barbershop.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillResponse {
    private Integer id;
    private String phoneNumber;
    private Integer appointmentId;
    private Integer createdBy;
    private BigDecimal totalAmount;
    private BigDecimal finalTotal;
    private String paymentMethod;
    private Timestamp billDate;
    private String status;
    private String note;
    private List<BillItemResponse> items;
}
