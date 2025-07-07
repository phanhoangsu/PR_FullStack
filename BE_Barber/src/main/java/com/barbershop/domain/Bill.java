package com.barbershop.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;
import java.sql.Timestamp;
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

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "phone_number", nullable = false)
    private Customer phoneNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "created_by")
    private UserEntity createdBy;

    @NotNull
    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

//    @ColumnDefault("`total_amount`")
//    @Column(name = "final_total", precision = 10, scale = 2)
//    private BigDecimal finalTotal;

    @Column(name = "final_total", insertable = false, updatable = false)
    private BigDecimal finalTotal;


    @NotNull
    @Lob
    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @NotNull
    @ColumnDefault("CURRENT_TIMESTAMP")
    @Column(name = "bill_date", nullable = false)
    private Timestamp billDate;

    @ColumnDefault("'Chưa thanh toán'")
    @Lob
    @Column(name = "status")
    private String status;

    @Lob
    @Column(name = "note")
    private String note;

    @OneToMany(mappedBy = "bill")
    private Set<BillItem> billItems = new LinkedHashSet<>();

}