package com.barbershop.model.response;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class CustomerResponse {
    private String phoneNumber;
    private String email;
    private String fullName;
    private Timestamp createdAt;
    private List<String> roles;

    private String errorCode;
    private String errorMessage;

}
