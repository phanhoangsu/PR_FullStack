package com.barbershop.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Customers")
public class Customer {
    @Id
    @Column(name = "phone_number", nullable = false, length = 15)
    private String phoneNumber;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "email", length = 100)
    private String email;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private Timestamp createdAt;


    @OneToMany(mappedBy = "phoneNumber")
    private Set<Appointment> appointments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "phoneNumber")
    private Set<Bill> bills = new LinkedHashSet<>();

    @OneToMany(mappedBy = "phoneNumber")
    private Set<com.barbershop.domain.ServiceUsageDetail1> serviceUsageDetails = new LinkedHashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserEntity user;
}