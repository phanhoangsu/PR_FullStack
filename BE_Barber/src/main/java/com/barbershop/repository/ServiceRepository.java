package com.barbershop.repository;

import com.barbershop.domain.ServiceEntity;
import com.barbershop.enums.ServiceType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;


@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Integer> {
    List<ServiceEntity> findByTypeAndIsActiveTrue   (ServiceType type);

    boolean existsByServiceName(@Size(max = 50) @NotNull String serviceName);

    Collection<Object> findByIsActiveTrue();

    List<ServiceEntity> findByType( ServiceType type);
}
