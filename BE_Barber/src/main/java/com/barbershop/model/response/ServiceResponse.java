package com.barbershop.model.response;

import com.barbershop.enums.ServiceType;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceResponse {
    private Integer serviceId;
    private String serviceName;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private ServiceType type;

    @JsonProperty("isActive")
    private boolean isActive;
    private Timestamp createdAt;
    private Timestamp updatedAt;

}
