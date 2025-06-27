//
//package com.barbershop.api;
//
//import com.barbershop.model.request.StaffRequest;
//import com.barbershop.model.response.StaffResponse;
//import com.barbershop.service.StaffService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/staff")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
//public class StaffApi {
//    private final StaffService staffService;
//
//    @PostMapping
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<Map<String, String>> createCustomer(@Valid @RequestBody StaffRequest request) {
//        staffService.save(request);
//        Map<String, String> map = new HashMap<>();
//        map.put("message","Staff created successfully");
//        return ResponseEntity.ok(map);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<StaffResponse>> getAllStaff() {
//        List<StaffResponse> responses=staffService.findAll();
//        return ResponseEntity.ok(responses);
//    }
//    @GetMapping("/{id}")
//    public ResponseEntity<StaffResponse> getStaffById(@PathVariable Integer id) {
//        StaffResponse response=staffService.findById(id);
//        return ResponseEntity.ok(response);
//    }
//
//    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<Map<String, String>> updateCustomer(@PathVariable Integer id, @Valid @RequestBody StaffRequest request ) {
//        staffService.update(id, request);
//        Map<String, String> map = new HashMap<>();
//        map.put("message","Staff updated successfully");
//        return ResponseEntity.ok(map);
//    }
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<Map<String, String>> deleteCustomer(@PathVariable Integer id) {
//        staffService.deleteById(id);
//        Map<String, String> map = new HashMap<>();
//        map.put("message","Staff deleted successfully");
//        return ResponseEntity.ok(map);
//    }
//
//}
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
import org.springframework.security.access.prepost.PreAuthorize;
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

    //    // UPDATE - Cập nhật thông tin nhân viên
//    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<StaffResponse> updateStaff(@PathVariable Integer id, @Valid @RequestBody StaffRequest request) {
//        try {
//            return ResponseEntity.ok(staffService.update(id, request));
//        } catch (BarberException ex) {
//            throw ex;
//        } catch (Exception ex) {
//            throw new BarberException(StaffErrorCode.UPDATE_FAILURE);
//        }
//    }
// UPDATE - Cập nhật thông tin nhân viên
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

//    // DELETE - Xóa nhân viên theo ID
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<String> deleteStaff(@PathVariable Integer id) {
//        try {
//            staffService.deleteById(id);
//            return ResponseEntity.ok("Xóa nhân viên thành công.");
//        } catch (BarberException ex) {
//            throw ex;
//        } catch (Exception ex) {
//            throw new BarberException(StaffErrorCode.DELETE_FAILURE);
//        }
//    }
//}

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