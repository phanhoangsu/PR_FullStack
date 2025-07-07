package com.barbershop.repository;

import com.barbershop.domain.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {

    // ✅ Lấy theo số điện thoại từ đối tượng Customer
    List<Bill> findAllByPhoneNumber_PhoneNumber(String phoneNumber);
}
