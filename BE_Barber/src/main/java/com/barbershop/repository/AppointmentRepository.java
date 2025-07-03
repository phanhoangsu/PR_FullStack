package com.barbershop.repository;

import com.barbershop.domain.Appointment;
import com.barbershop.domain.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    boolean existsByStaffAndStartTime(Staff staff, Timestamp startTime);
    List<Appointment> findByPhoneNumber_PhoneNumber(String phoneNumberPhoneNumber);
}
