package com.barbershop.repository;

import com.barbershop.domain.UserRole;
import com.barbershop.domain.UserRoleId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UserRoleId> {
}
