package com.barbershop.service;


import com.barbershop.model.request.AppointmentRequest;
import com.barbershop.model.response.AppointmentResponse;

import java.util.List;

public interface AppointmentService {
    AppointmentResponse createAppointment(AppointmentRequest request,String username);
    List<AppointmentResponse> getAppointmentsByUsername(String username);
    boolean cancelAppointment(Integer id, String username);
    List<AppointmentResponse> getAllAppointments();

}
