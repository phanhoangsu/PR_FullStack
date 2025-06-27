package com.barbershop.repository;

import com.barbershop.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    boolean existsByTitle(String title);
   List<Product> findAllByIsActiveTrue();  // <-- Hàm này lọc sản phẩm đang hoạt động

}
