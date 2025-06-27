package com.barbershop.exception;


import com.barbershop.exception.ErrorCode.CustomerErrorCode;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import org.springframework.security.access.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CustomExceptionHandler {

    // xử lí ngoại lệ
    @ExceptionHandler(BarberException.class)
    public ResponseEntity<ErrorMessage> handleBarberException(BarberException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getErrorMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessage>handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        for (FieldError error : e.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        ErrorMessage errorMessage = ErrorMessage.builder()
                .errorCode(CustomerErrorCode.INVALID_DATA)
                .errorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.INVALID_DATA))
                .dataError(errors)
                .build();
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorMessage);
    }


    // xử lí tất cả các ngoại lệ khác
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> handleAllException(Exception ex) {
        ErrorMessage errorMessage= ErrorMessage.builder()
                .errorCode(CustomerErrorCode.SYSTEM_ERROR)
                .errorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.SYSTEM_ERROR))
                .dataError(ex.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMessage);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorMessage> handleAccessDeniedException(AccessDeniedException ex) {
        ErrorMessage errorMessage = ErrorMessage.builder()
                .errorCode(CustomerErrorCode.ACCESS_DENIED)
                .errorMessage(ErrorMessageLoader.getProperty(CustomerErrorCode.ACCESS_DENIED))
                .dataError("Bạn không có quyền truy cập tài nguyên này.")
                .build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorMessage);
    }

}
