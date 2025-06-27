package com.barbershop.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentRequest {
    private String phoneNumber;
    private String fullName;

    private Integer serviceId;
    private Integer staffId;
    private Timestamp startTime;
    private Timestamp endTime;
    private String notes;
}
