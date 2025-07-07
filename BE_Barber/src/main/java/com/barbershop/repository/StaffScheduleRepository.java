package com.barbershop.repository;

import com.barbershop.domain.StaffSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface StaffScheduleRepository extends JpaRepository<StaffSchedule, Integer> {
    List<StaffSchedule> findByStaffId(Integer id);

    // Truy vấn tối ưu để check lịch trùng
    @Query("SELECT s FROM StaffSchedule s WHERE s.staff.id = :staffId AND " +
            "(s.startTime < :endTime AND s.endTime > :startTime)")
    List<StaffSchedule> findConflictingSchedules(@Param("staffId") Integer staffId,
                                                 @Param("startTime") Timestamp startTime,
                                                 @Param("endTime") Timestamp endTime);


}