    package com.barbershop.model.response;

    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.math.BigDecimal;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class ComboItemResponse {
        private Integer id;
        private Integer serviceId;
        private Integer productId;
        private String serviceName;
        private BigDecimal price;
        private Integer quantity;
        private String description;
        private String imageUrl;

    }
