package com.barbershop.domain;

import com.barbershop.enums.ServiceType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Services")
public class ServiceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id", nullable = false)
    private Integer serviceId;

    @Size(max = 50)
    @NotNull
    @Column(name = "service_name", nullable = false, length = 50)
    private String serviceName;

    @NotNull
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Lob
    @Column(name = "description")
    private String description;

    @Size(max = 255)
    @Column(name = "image_url")
    private String imageUrl;

    @ColumnDefault("1")
    @Column(name = "is_active")
    private Boolean isActive=true;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "created_at")
    private Timestamp createdAt;

    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @NotNull
    @ColumnDefault("'Single'")
    @Lob
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private ServiceType type;

    @OneToMany(mappedBy = "service")
    private Set<Appointment> appointments = new LinkedHashSet<>();

    @OneToMany(mappedBy = "combo")
    private Set<ComboItem> comboItems = new LinkedHashSet<>();

    @OneToMany(mappedBy = "service")
    private Set<ComboItem> comboAsServiceItems = new LinkedHashSet<>();

    @OneToMany(mappedBy = "service")
    private Set<ServiceUsageDetail1> serviceUsageDetails = new LinkedHashSet<>();

}