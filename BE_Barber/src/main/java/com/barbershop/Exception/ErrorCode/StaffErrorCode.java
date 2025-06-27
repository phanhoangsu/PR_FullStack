package com.barbershop.exception.ErrorCode;

/**
 * Mã lỗi riêng cho các thao tác liên quan đến Staff (nhân viên)
 */
public interface StaffErrorCode {

    // ======== THÀNH CÔNG ========
    String CREATE_SUCCESS       = "BS-ST-01";
    String UPDATE_SUCCESS       = "BS-ST-02";
    String DELETE_SUCCESS       = "BS-ST-03";
    String GET_SUCCESS          = "BS-ST-04";
    String OPERATION_SUCCESS    = "BS-ST-05";

    // ======== THẤT BẠI ========
    String CREATE_FAILURE       = "BS-ST-11";
    String UPDATE_FAILURE       = "BS-ST-12";
    String DELETE_FAILURE       = "BS-ST-13";
    String GET_FAILURE          = "BS-ST-14";

    // ======== VALIDATE DỮ LIỆU ========
    String INVALID_DATA         = "BS-ST-21";
    String MISSING_REQUIRED     = "BS-ST-22";
    String DUPLICATE_EMAIL      = "BS-ST-23";
    String DUPLICATE_PHONE      = "BS-ST-24";

    // ======== KHÔNG TÌM THẤY ========
    String STAFF_NOT_FOUND      = "BS-ST-31";
    String DATA_NOT_FOUND       = "BS-ST-32";

    // ======== PHÂN QUYỀN / XÁC THỰC ========
    String ACCESS_DENIED        = "BS-ST-41";
    String INVALID_ROLE         = "BS-ST-42";
}

