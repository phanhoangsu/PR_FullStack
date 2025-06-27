package com.barbershop.exception.ErrorCode;


public interface ComboErrorCode {

    // ======== COMBO: THÀNH CÔNG ========
    String CREATE_SUCCESS = "BS-CB-01";
    String UPDATE_SUCCESS = "BS-CB-02";
    String DELETE_SUCCESS = "BS-CB-03";
    String GET_LIST_SUCCESS = "BS-CB-04";

    // ======== COMBO: THẤT BẠI ========
    String CREATE_FAILED = "BS-CB-11";
    String UPDATE_FAILED = "BS-CB-12";
    String DELETE_FAILED = "BS-CB-13";
    String GET_LIST_FAILED = "BS-CB-14";

    // ======== COMBO: VALIDATE ========
    String INVALID_DATA = "BS-CB-21";
    String CONTAINS_DISABLED_ITEM = "BS-CB-22";
    String CONTAINS_OUT_OF_STOCK_ITEM = "BS-CB-23";
    String DUPLICATE_COMBO_ITEM = "BS-CB-24";
    String INVALID_UPDATE_BASE_ITEM = "BS-CB-25";

    // ======== COMBO: KHÔNG TÌM THẤY ========
    String NOT_FOUND = "BS-CB-31";
    String ITEM_NOT_FOUND = "BS-CB-32";

    // ======== COMBO: PHÂN QUYỀN ========
    String UNAUTHORIZED_ACTION = "BS-CB-41";
}
