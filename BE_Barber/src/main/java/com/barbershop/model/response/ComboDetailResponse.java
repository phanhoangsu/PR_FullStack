package com.barbershop.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComboDetailResponse {
    private Integer comboId;
    private String comboName;
    private List<ComboItemResponse> items;
    private BigDecimal totalPrice;


}
