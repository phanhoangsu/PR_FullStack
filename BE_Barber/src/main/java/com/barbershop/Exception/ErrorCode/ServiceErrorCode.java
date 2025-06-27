package com.barbershop.exception.ErrorCode;


public interface ServiceErrorCode {

    // ======== SERVICE: THÀNH CÔNG ========
    String CREATE_SUCCESS = "BS-SV-01";
    String UPDATE_SUCCESS = "BS-SV-02";
    String DELETE_SUCCESS = "BS-SV-03";
    String GET_LIST_SUCCESS = "BS-SV-04";

    // ======== SERVICE: THẤT BẠI ========
    String CREATE_FAILED = "BS-SV-11";
    String UPDATE_FAILED = "BS-SV-12";
    String DELETE_FAILED = "BS-SV-13";
    String GET_LIST_FAILED = "BS-SV-14";

    // ======== SERVICE: VALIDATE DỮ LIỆU ========
    String INVALID_DATA = "BS-SV-21";
    String MISSING_REQUIRED_FIELD = "BS-SV-22";
    String DUPLICATE_SERVICE_NAME = "BS-SV-23";
    String INVALID_TYPE = "BS-SV-24";

    // ======== SERVICE: KHÔNG TÌM THẤY ========
    String NOT_FOUND = "BS-SV-31";

    // ======== SERVICE: PHÂN QUYỀN ========
    String UNAUTHORIZED_ACTION = "BS-SV-41";
}
