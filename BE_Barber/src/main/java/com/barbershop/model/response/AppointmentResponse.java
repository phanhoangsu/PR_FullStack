package com.barbershop.model.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {
    private Integer appointmentId;
    private String status;
    private String message;

    private String serviceName;
    private String staffName;
    private Timestamp startTime;
    private String note;
}
