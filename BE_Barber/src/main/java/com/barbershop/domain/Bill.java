package com.barbershop.domain;

import jakarta.persistence.*;
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
@Table(name = "Bills")
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bill_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "phone_number", nullable = false)
    private com.barbershop.domain.Customer phoneNumber;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Lob
    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Column(name = "bill_date", nullable = false)
    private Timestamp billDate;

    @Column(name = "payment_date")
    private Timestamp paymentDate;

    @ColumnDefault("'Chưa thanh toán'")
    @Lob
    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "bill")
    private Set<com.barbershop.domain.ServiceUsageDetail1> serviceUsageDetails = new LinkedHashSet<>();

}