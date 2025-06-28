package com.barbershop.model.response;

import com.barbershop.enums.Gender;
import lombok.Data;

@Data
public class StaffResponse {
        private Integer id;
    private String fullName;
    private String role;
    private Gender gender;
    private String avatarUrl;
    private Boolean isAvailable;
}
