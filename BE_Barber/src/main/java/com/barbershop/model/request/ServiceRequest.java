package com.barbershop.model.request;


import com.barbershop.enums.ServiceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequest {
    private String serviceName;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private ServiceType type;

}
