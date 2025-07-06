package com.barbershop.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillItemCreateRequest {
    private Integer serviceId;
    private Integer productId;
    private Integer staffId;
    private Integer quantity;
    private BigDecimal unitPrice;
    private String note;
}