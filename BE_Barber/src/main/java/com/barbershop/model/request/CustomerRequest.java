package com.barbershop.model.request;


import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRequest {
    @NotBlank(message = "Số điện thoại bắt buộc phải nhập!")
    @Pattern(regexp = "^(0\\d{8,12}|\\+\\d{9,13})$", message = "Số điện thoại phải bắt đầu bằng 0 hoặc + và có độ dài hợp lệ từ 9 đến 13 số")
    private String phoneNumber;

    @NotBlank(message="Mật khẩu bắt buộc phải nhập!")
    @Size(min = 6,message = "mật khẩu phải trên 6 ký tự")
    private String passwordHash;
    @NotBlank(message = "Họ tên là bắt buộc nhập!")
    private String fullName;

    @Email(message = "Định dạng email không hợp lệ phải có ký tự @")
    private String email;

}