package com.barbershop.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "AppointmentHistory")
public class AppointmentHistory1 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;

    @NotNull
    @Lob
    @Column(name = "old_status", nullable = false)
    private String oldStatus;

    @NotNull
    @Lob
    @Column(name = "new_status", nullable = false)
    private String newStatus;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "changed_at")
    private Instant changedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "changed_by")
    private UserEntity changedBy;

}