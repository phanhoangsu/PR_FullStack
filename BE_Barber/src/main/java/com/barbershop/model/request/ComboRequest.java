package com.barbershop.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComboRequest {
    private String name;
    private String description;
    private List<Item> items;

    @Data
    public static class Item {
        private Integer id;
        private Integer serviceId;
        private Integer productId;
        private Integer quantity;
        private BigDecimal price;
        private String description;
    }
}
