package com.barbershop.exception.ErrorCode;


public interface ProductErrorCode {

    // ======== PRODUCT: THÀNH CÔNG ========
    String CREATE_SUCCESS = "BS-PD-01";
    String UPDATE_SUCCESS = "BS-PD-02";
    String DELETE_SUCCESS = "BS-PD-03";
    String GET_LIST_SUCCESS = "BS-PD-04";

    // ======== PRODUCT: THẤT BẠI ========
    String CREATE_FAILED = "BS-PD-11";
    String UPDATE_FAILED = "BS-PD-12";
    String DELETE_FAILED = "BS-PD-13";
    String GET_LIST_FAILED = "BS-PD-14";

    // ======== PRODUCT: VALIDATE ========
    String INVALID_DATA = "BS-PD-21";
    String MISSING_REQUIRED_FIELD = "BS-PD-22";
    String DUPLICATE_NAME = "BS-PD-23";
    String OUT_OF_STOCK = "BS-PD-24";

    // ======== PRODUCT: KHÔNG TÌM THẤY ========
    String NOT_FOUND = "BS-PD-31";

    // ======== PRODUCT: PHÂN QUYỀN ========
    String UNAUTHORIZED_ACTION = "BS-PD-41";
}
