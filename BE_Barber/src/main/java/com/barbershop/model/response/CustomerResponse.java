package com.barbershop.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class CustomerResponse {
    private String phoneNumber;
    private String email;
    private String fullName;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp createdAt;
    private List<String> roles;

    private String errorCode;
    private String errorMessage;

}
