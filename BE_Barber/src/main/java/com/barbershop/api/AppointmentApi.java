package com.barbershop.api;

import com.barbershop.model.request.AppointmentRequest;
import com.barbershop.model.response.AppointmentResponse;
import com.barbershop.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer/appointments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AppointmentApi {

    private final AppointmentService appointmentService;

    @PostMapping
//    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> bookAppointment(
            @RequestBody AppointmentRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails != null ? userDetails.getUsername() : null;
        AppointmentResponse response = appointmentService.createAppointment(request, username);
        return ResponseEntity.ok(response);
    }
}
