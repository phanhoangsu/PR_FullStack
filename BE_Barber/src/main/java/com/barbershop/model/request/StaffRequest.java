package com.barbershop.model.request;

import com.barbershop.enums.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StaffRequest {

    @NotBlank(message = "Họ tên không được để trống")
    @Size(max =100,message = "Họ tên không vượt quá 100 ký tự")
    private String fullName;

    @NotNull(message = "Giới tính không được để trống")
    private Gender gender;

    private String avatarUrl;

    private Boolean isAvailable=true;
}
