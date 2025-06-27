package com.barbershop.exception.ErrorCode;

public interface CustomerErrorCode {

    // Hệ thống
    String SYSTEM_ERROR = "BS-00-00";
    String ACCESS_DENIED = "BS-03-01";

    // CRUD thành công
    String CREATE_SUCCESS = "BS-00-01";
    String UPDATE_SUCCESS = "BS-00-02";
    String DELETE_SUCCESS = "BS-00-03";
    String GET_SUCCESS    = "BS-00-04";
    String OPERATION_SUCCESS = "BS-00-05"; // <-- Thêm dòng này

    // CRUD thất bại
    String CREATE_FAILURE = "BS-02-01";
    String UPDATE_FAILURE = "BS-02-02";
    String DELETE_FAILURE = "BS-02-03";
    String GET_FAILURE    = "BS-02-04";

    // Validate
    String INVALID_DATA     = "BS-01-01";
    String MISSING_REQUIRED = "BS-01-04";

    // Trùng lặp dữ liệu
    String DUPLICATE_EMAIL = "BS-01-02";
    String DUPLICATE_PHONE = "BS-01-06";

    // Không tìm thấy
    String CUSTOMER_NOT_FOUND = "BS-01-03";
    String DATA_NOT_FOUND     = "BS-01-05";
}
