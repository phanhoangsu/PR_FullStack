package com.barbershop.model.request;


import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRequest {

    private String phoneNumber;

    private String passwordHash;
    private String fullName;

    private String email;

}