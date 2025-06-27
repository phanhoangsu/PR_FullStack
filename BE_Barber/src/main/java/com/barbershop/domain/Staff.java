package com.barbershop.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_id", nullable = false)
    private Integer id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    // Quan hệ N-1 với bảng Roles thông qua khóa ngoại role_id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    private Role role;

    @Lob
    @Column(name = "gender")
    private String gender;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @ColumnDefault("1")
    @Column(name = "is_available")
    private Boolean isAvailable;

    @OneToMany(mappedBy = "staff")
    private Set<Appointment> appointments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "staff")
    private Set<ServiceUsageDetail1> serviceUsageDetails = new LinkedHashSet<>();

    @OneToMany(mappedBy = "staff")
    private Set<com.barbershop.domain.StaffSchedule> staffSchedules = new LinkedHashSet<>();

}