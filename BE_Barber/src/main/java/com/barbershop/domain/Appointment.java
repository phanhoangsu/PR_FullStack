package com.barbershop.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Timestamp;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "phone_number", nullable = false)
    private com.barbershop.domain.Customer phoneNumber;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "service_id", nullable = false)
    private ServiceEntity service;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staff_id")
    private com.barbershop.domain.Staff staff;

    @Column(name = "start_time", nullable = false)
    private Timestamp startTime;

    @Column(name = "end_time", nullable = false)
    private Timestamp endTime;

    @ColumnDefault("'Đã đặt'")
    @Lob
    @Column(name = "status")
    private String status;

    @Lob
    @Column(name = "note")
    private String note;

    @Column(name = "reminder_sent_at")
    private Timestamp reminderSentAt;

    @OneToMany(mappedBy = "appointment")
    private Set<AppointmentHistory1> appointmentHistories = new LinkedHashSet<>();

    @OneToMany(mappedBy = "appointment")
    private Set<com.barbershop.domain.ServiceUsageDetail1> serviceUsageDetails = new LinkedHashSet<>();

}