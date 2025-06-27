package com.barbershop.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.util.Objects;

@Getter
@Setter
@Embeddable
public class ComboServiceDetailId implements java.io.Serializable {
    private static final long serialVersionUID = 1702076353986648551L;
    @NotNull
    @Column(name = "combo_id", nullable = false)
    private Integer comboId;

    @NotNull
    @Column(name = "service_id", nullable = false)
    private Integer serviceId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ComboServiceDetailId entity = (ComboServiceDetailId) o;
        return Objects.equals(this.comboId, entity.comboId) &&
                Objects.equals(this.serviceId, entity.serviceId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(comboId, serviceId);
    }

}