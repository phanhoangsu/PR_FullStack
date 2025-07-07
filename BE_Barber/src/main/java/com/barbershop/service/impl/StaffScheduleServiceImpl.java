package com.barbershop.service.impl;


import com.barbershop.domain.Appointment;
import com.barbershop.exception.BarberException;
import com.barbershop.domain.Staff;
import com.barbershop.domain.StaffSchedule;
import com.barbershop.model.request.StaffScheduleRequest;
import com.barbershop.model.response.StaffScheduleResponse;
import com.barbershop.repository.AppointmentRepository;
import com.barbershop.repository.StaffRepository;
import com.barbershop.repository.StaffScheduleRepository;
import com.barbershop.service.StaffScheduleService;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TimeZone;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
@Transactional

public class StaffScheduleServiceImpl implements StaffScheduleService {

    private final StaffScheduleRepository staffScheduleRepository;
    private final StaffRepository staffRepository;
    private final ModelMapper modelMapper;
    private final AppointmentRepository appointmentRepository;
    private final Logger logger = LoggerFactory.getLogger(StaffScheduleServiceImpl.class);


    @Override
    public StaffScheduleResponse save(StaffScheduleRequest request) {
        Staff staff = staffRepository.findById(request.getStaff()).orElseThrow(() -> new BarberException("Không tìm thấy nhân viên với ID " + request.getStaff()));

        // kiểm tra trùng lịch
        checkConflick(request.getStaff(), request.getStartTime(), request.getEndTime(), null);

        StaffSchedule staffSchedule = modelMapper.map(request, StaffSchedule.class);
        staffSchedule.setStaff(staff);
        StaffSchedule saved = staffScheduleRepository.save(staffSchedule);
        return modelMapper.map(saved, StaffScheduleResponse.class);
    }

//    @Override
//    public List<StaffScheduleResponse> findAll() {
////        return staffScheduleRepository.findAll().stream().map(sc -> modelMapper.map(sc, StaffScheduleResponse.class)).collect(Collectors.toList());
//        return staffScheduleRepository.findAll().stream()
//                .map(this::toResponse)
//                .collect(Collectors.toList());
//    }

@Override
public List<StaffScheduleResponse> findAll() {
    logger.info("📥 Bắt đầu lấy danh sách lịch làm việc của tất cả nhân viên");
    try {
        List<StaffSchedule> schedules = staffScheduleRepository.findAll();
        List<StaffScheduleResponse> result = schedules.stream()
                .map(this::toResponseWithAppointments)
                .collect(Collectors.toList());

        logger.info("✅ Lấy danh sách lịch làm việc thành công, tổng số lịch: {}", result.size());
        return result;
    } catch (Exception e) {
        logger.error("❌ Lỗi khi lấy danh sách lịch làm việc: ", e);
        return List.of();
    }
}




    private StaffScheduleResponse toResponseWithAppointments(StaffSchedule schedule) {
        StaffScheduleResponse res = new StaffScheduleResponse();
        res.setId(schedule.getId());
        res.setStartTime(schedule.getStartTime());
        res.setEndTime(schedule.getEndTime());

        if (schedule.getStaff() != null) {
            res.setStaffId(schedule.getStaff().getId());
            res.setStaffName(schedule.getStaff().getFullName());
            res.setStaffAvatar(schedule.getStaff().getAvatarUrl());

            try {
                // ✅ Lấy toàn bộ lịch hẹn của nhân viên
                List<Appointment> appointments = appointmentRepository.findByStaff_Id(schedule.getStaff().getId());

                logger.info("📅 Nhân viên ID {} có {} lịch hẹn",
                        schedule.getStaff().getId(),
                        appointments.size());

                List<StaffScheduleResponse.AppointmentSimpleResponse> appointmentResponses = appointments.stream()
                        .map(a -> {
                            StaffScheduleResponse.AppointmentSimpleResponse appRes = new StaffScheduleResponse.AppointmentSimpleResponse();
                            appRes.setId(a.getId());
                            appRes.setStatus(a.getStatus());
                            appRes.setNote(a.getNote());
                            appRes.setStartTime(a.getStartTime());
                            return appRes;
                        })
                        .collect(Collectors.toList());

                res.setAppointments(appointmentResponses);
            } catch (Exception ex) {
                logger.error("❌ Lỗi khi lấy lịch hẹn của nhân viên ID {}: {}", schedule.getStaff().getId(), ex.getMessage());
                res.setAppointments(List.of());
            }
        } else {
            logger.warn("⚠️ Lịch làm việc không có nhân viên (scheduleId = {})", schedule.getId());
            res.setAppointments(List.of());
        }

        return res;
    }



    @Override
    public StaffScheduleResponse findById(Integer id) {
        StaffSchedule sc = staffScheduleRepository.findById(id).orElseThrow(() -> new BarberException("Schedule with id " + id + " not found"));
        return toResponse(sc);
    }

    @Override
    public StaffScheduleResponse update(Integer id, StaffScheduleRequest request) {
        StaffSchedule schedule = staffScheduleRepository.findById(id).orElseThrow(() -> new BarberException("Schedule with id " + id + " not found"));
        Staff staff = staffRepository.findById(request.getStaff()).orElseThrow(() -> new RuntimeException("Staff not found"));

        // kiểm tra trùng lịch khi update
        checkConflick(request.getStaff(), request.getStartTime(), request.getEndTime(), id);

        schedule.setStaff(staff);
        schedule.setStartTime(request.getStartTime());
        schedule.setEndTime(request.getEndTime());

        StaffSchedule updated = staffScheduleRepository.save(schedule);
        return toResponse(updated);
    }


    @Override
    public void deleteById(Integer id) {
        if (!staffScheduleRepository.existsById(id)) {
            throw new RuntimeException("Schedule not found");
        }
        staffScheduleRepository.deleteById(id);
    }

        private void checkConflick(Integer staffId, Timestamp newsStart, Timestamp newsEnd, Integer excludeId) {
            if (newsEnd.before(newsStart) || newsEnd.equals(newsStart)) {
                throw new BarberException("Thời gian kết thúc phải sau thời gian bắt đầu");
            }

            List<StaffSchedule> staffSchedules = staffScheduleRepository.findByStaffId(staffId);
            System.out.println("Checking schedules for staffId=" + staffId + ": " + staffSchedules);

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            sdf.setTimeZone(TimeZone.getTimeZone("UTC"));

            Optional<StaffSchedule> conflictingSchedule = staffSchedules.stream()
                    .filter(s -> excludeId == null || !s.getId().equals(excludeId))
                    .filter(s -> newsStart.before(s.getEndTime()) && newsEnd.after(s.getStartTime()))
                    .findFirst();

            if (conflictingSchedule.isPresent()) {
                StaffSchedule conflict = conflictingSchedule.get();
                System.out.println("Conflict found: " + conflict);
                System.out.println("Raw startTime: " + conflict.getStartTime().getTime() + "ms, endTime: " + conflict.getEndTime().getTime() + "ms");
                String startTimeStr = sdf.format(conflict.getStartTime());
                String endTimeStr = sdf.format(conflict.getEndTime());
                System.out.println("Formatted conflict time: from " + startTimeStr + " to " + endTimeStr);
                throw new BarberException("Lịch làm việc bị trùng với lịch hiện có từ " + startTimeStr + " đến " + endTimeStr);
            }
        }


    /**
     * Hàm chuyển đổi từ entity sang response đầy đủ thông tin nhân viên
     */
    private StaffScheduleResponse toResponse(StaffSchedule schedule) {
        StaffScheduleResponse res = new StaffScheduleResponse();
        res.setId(schedule.getId());
        res.setStartTime(schedule.getStartTime());
        res.setEndTime(schedule.getEndTime());

        if (schedule.getStaff() != null) {
            res.setStaffId(schedule.getStaff().getId());
            res.setStaffName(schedule.getStaff().getFullName());
            res.setStaffAvatar(schedule.getStaff().getAvatarUrl());
        }

        return res;
    }
}