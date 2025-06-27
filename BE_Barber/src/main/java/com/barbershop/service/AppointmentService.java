package com.barbershop.service;


import com.barbershop.model.request.AppointmentRequest;
import com.barbershop.model.response.AppointmentResponse;

public interface AppointmentService {
    AppointmentResponse createAppointment(AppointmentRequest request,String username);
}
