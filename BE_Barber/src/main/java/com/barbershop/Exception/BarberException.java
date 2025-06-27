package com.barbershop.exception;

import lombok.Getter;

@Getter
public class BarberException extends RuntimeException {
    private final ErrorMessage errorMessage;

    public BarberException(String errorCode) {
        super(errorCode);
        this.errorMessage = ErrorMessageLoader.getErrorMessage(errorCode);
    }

    public BarberException(String errorCode, String customMessage) {
        super(errorCode);
        ErrorMessage message = new ErrorMessage();
        message.setErrorCode(errorCode);
        message.setErrorMessage(customMessage);
        this.errorMessage = message;
    }

}
