package com.barbershop.api;

import com.barbershop.model.request.StaffScheduleRequest;
import com.barbershop.model.response.StaffScheduleResponse;
import com.barbershop.service.StaffScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/staff-schedules")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StaffScheduleApi {

    private final StaffScheduleService staffScheduleService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create(@Valid @RequestBody StaffScheduleRequest request) {
        staffScheduleService.save(request);
        return ResponseEntity.ok(Collections.singletonMap("message", "Created Successfully"));
    }

    @GetMapping
    public ResponseEntity<List<StaffScheduleResponse>> getAll() {
        return ResponseEntity.ok(staffScheduleService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StaffScheduleResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(staffScheduleService.findById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(
            @PathVariable Integer id,
            @RequestBody StaffScheduleRequest request) {
        staffScheduleService.update(id, request);
        return ResponseEntity.ok(Collections.singletonMap("message", "Update Successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        staffScheduleService.deleteById(id);
        return ResponseEntity.ok(Collections.singletonMap("message", "Deleted Successfully"));
    }
}
