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

        @GetMapping
        @PreAuthorize("hasRole('ROLE_CUSTOMER')or hasRole('ROLE_ADMIN')")
        public ResponseEntity<?> getMyAppointments(@AuthenticationPrincipal UserDetails userDetails) {
            String username = userDetails.getUsername();
            return ResponseEntity.ok(appointmentService.getAppointmentsByUsername(username));
        }

        @PutMapping("/{id}/cancel")
        @PreAuthorize("hasRole('ROLE_CUSTOMER') or hasRole('ROLE_ADMIN')")
        public ResponseEntity<?> cancelAppointment(@PathVariable Integer id,
                                                   @AuthenticationPrincipal UserDetails userDetails) {
            String username = userDetails.getUsername();
            boolean success = appointmentService.cancelAppointment(id, username);
            return success
                    ? ResponseEntity.ok("Đã hủy lịch hẹn.")
                    : ResponseEntity.badRequest().body("Không thể hủy lịch hẹn.");
        }

        // Dành cho admin hoặc nhân viên
        @GetMapping("/all")
        @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_STAFF')")
        public ResponseEntity<?> getAllAppointments() {
            return ResponseEntity.ok(appointmentService.getAllAppointments());
        }


        @DeleteMapping("/{id}")
        @PreAuthorize(" hasRole('ROLE_ADMIN')")
        public ResponseEntity<?> deleteAppointment(@PathVariable Integer id,
                                                   @AuthenticationPrincipal UserDetails userDetails) {
            String username = userDetails.getUsername();
            boolean deleted = appointmentService.deleteAppointment(id, username);
            return deleted
                    ? ResponseEntity.ok("Đã xóa lịch hẹn.")
                    : ResponseEntity.badRequest().body("Không thể xóa lịch hẹn.");
        }

    }
