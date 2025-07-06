package com.barbershop.api;

import com.barbershop.exception.ErrorCode.CustomerErrorCode;
import com.barbershop.model.request.CustomerRequest;
import com.barbershop.model.response.CustomerResponse;
import com.barbershop.service.CustomerSevice;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CustomerApi {

    private final CustomerSevice customerSevice;

    // Tạo mới khách hàng
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<CustomerResponse> createCustomer(@Valid @RequestBody CustomerRequest request) {
        CustomerResponse response = customerSevice.save(request);
        return buildResponse(response);
    }

    //     Lấy danh sách tất cả khách hàng
    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
        List<CustomerResponse> responseList = customerSevice.getAllCustomers();
        return ResponseEntity.ok(responseList);
    }

    // Lấy thông tin khách hàng theo số điện thoại
    @GetMapping("/{phoneNumber}")
    public ResponseEntity<CustomerResponse> getCustomerByPhone(@PathVariable String phoneNumber) {
        CustomerResponse response = customerSevice.getById(phoneNumber);
        return buildResponse(response);
    }

    // Cập nhật thông tin khách hàng
    @PutMapping("/{phoneNumber}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<CustomerResponse> updateCustomer(@PathVariable String phoneNumber, @Valid @RequestBody CustomerRequest request) {
        CustomerResponse response = customerSevice.update(phoneNumber, request);
        return buildResponse(response);
    }

    // Xóa khách hàng
    @DeleteMapping("/{phoneNumber}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<CustomerResponse> deleteCustomer(@PathVariable String phoneNumber) {
        CustomerResponse response = customerSevice.delete(phoneNumber);
        return buildResponse(response);
    }

    // Hàm hỗ trợ xây dựng phản hồi
    private ResponseEntity<CustomerResponse> buildResponse(CustomerResponse response) {
        String errorCode = response.getErrorCode();
        if (errorCode.equals(CustomerErrorCode.OPERATION_SUCCESS)
                || errorCode.equals(CustomerErrorCode.CREATE_SUCCESS)
                || errorCode.equals(CustomerErrorCode.UPDATE_SUCCESS)
                || errorCode.equals(CustomerErrorCode.DELETE_SUCCESS)
                || errorCode.equals(CustomerErrorCode.GET_SUCCESS)) {
            return ResponseEntity.ok(response);
        } else if (errorCode.equals(CustomerErrorCode.CUSTOMER_NOT_FOUND) ||
                errorCode.equals(CustomerErrorCode.DUPLICATE_EMAIL) ||
                errorCode.equals(CustomerErrorCode.DUPLICATE_PHONE) ||
                errorCode.equals(CustomerErrorCode.INVALID_DATA)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // phân trang và tìm theo phoneNuber
    @GetMapping("search")
    public ResponseEntity<Page<CustomerResponse>> searchCustomer
    (@RequestParam(defaultValue = "") String phoneNumber,
     @RequestParam(defaultValue = "0") int page,
     @RequestParam(defaultValue = "10") int size

    ) {
        Page<CustomerResponse> result = customerSevice.searchCustomers(phoneNumber, page, size);
        return ResponseEntity.ok(result);
    }
}