package com.barbershop.model.request;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String passwordHashed;
    private String email;
}
