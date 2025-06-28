package com.barbershop.api;

import com.barbershop.exception.ErrorCode.StaffErrorCode;
import com.barbershop.exception.BarberException;
import com.barbershop.exception.ErrorMessage;
import com.barbershop.model.request.StaffRequest;
import com.barbershop.model.response.StaffResponse;
import com.barbershop.service.StaffService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StaffApi {

    private final StaffService staffService;

    // CREATE - Thêm nhân viên mới
    @PostMapping
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createStaff(@Valid @RequestBody StaffRequest request) {
        try {
            staffService.save(request);
            ErrorMessage successMessage = new ErrorMessage();
            successMessage.setErrorCode(StaffErrorCode.CREATE_SUCCESS);
            successMessage.setErrorMessage("Thêm nhân viên thành công.");
            return ResponseEntity.ok(successMessage);

        } catch (BarberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new BarberException(StaffErrorCode.CREATE_FAILURE);
        }
    }

    // GET ALL - Lấy danh sách tất cả nhân viên
    @GetMapping
    public ResponseEntity<List<StaffResponse>> getAllStaffs() {
        try {
            return ResponseEntity.ok(staffService.findAll());
        } catch (Exception ex) {
            throw new BarberException(StaffErrorCode.GET_FAILURE);
        }
    }

    // GET ONE - Lấy thông tin nhân viên theo ID
    @GetMapping("/{id}")
    public ResponseEntity<StaffResponse> getStaffById(@PathVariable Integer id) {
        return ResponseEntity.ok(staffService.findById(id));
    }

    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ErrorMessage> updateStaff(@PathVariable Integer id, @Valid @RequestBody StaffRequest request) {
        try {
            staffService.update(id, request);
            ErrorMessage successMessage = new ErrorMessage();
            successMessage.setErrorCode(StaffErrorCode.UPDATE_SUCCESS);
            successMessage.setErrorMessage("Cập nhật nhân viên thành công.");
            return ResponseEntity.ok(successMessage);
        } catch (BarberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new BarberException(StaffErrorCode.UPDATE_FAILURE);
        }
    }


    // DELETE - Xóa nhân viên theo ID
    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ErrorMessage> deleteStaff(@PathVariable Integer id) {
        try {
            staffService.deleteById(id);
            ErrorMessage successMessage = new ErrorMessage();
            successMessage.setErrorCode(StaffErrorCode.DELETE_SUCCESS);
            successMessage.setErrorMessage("Xóa nhân viên thành công.");
            return ResponseEntity.ok(successMessage);
        } catch (BarberException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new BarberException(StaffErrorCode.DELETE_FAILURE);
        }
    }
}