package com.barbershop.repository;

import com.barbershop.domain.ComboItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComboItemRepository extends JpaRepository<ComboItem, Integer> {
    List<ComboItem> findByCombo_ServiceId(Integer comboId);

//    void deleteAllByCombo_ServiceId(Integer comboServiceId);
}