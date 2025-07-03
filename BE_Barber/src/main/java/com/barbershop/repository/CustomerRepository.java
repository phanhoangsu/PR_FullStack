package com.barbershop.repository;

import com.barbershop.domain.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,String> {
    boolean existsByEmail(String email);
    Optional <Customer> findByEmail(String email);
    Page<Customer> findByPhoneNumberContaining(String phoneNumber, Pageable pageable);

    Optional<Customer> findByUserId(Integer userId);

    Optional<Customer> findByPhoneNumber(String phoneNumber);

    Optional<Customer> findByUser_Username(String username);

}
