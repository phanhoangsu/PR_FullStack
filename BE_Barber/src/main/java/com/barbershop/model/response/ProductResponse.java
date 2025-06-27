package com.barbershop.model.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Integer productId;
    private String title;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String imageUrl;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
