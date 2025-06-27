package com.barbershop.repository;

import com.barbershop.domain.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<UserEntity, Integer> {
    // Kiểm tra username đã tồn tại (để tránh trùng khi đăng ký)
    boolean existsByUsername(String username);

    // Lấy user theo username (dùng khi đăng nhập hoặc load user)
    Optional<UserEntity> findByUsername(String username);
}
