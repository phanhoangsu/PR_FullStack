package com.barbershop.exception;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import com.barbershop.exception.ErrorCode.CustomerErrorCode;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;

@Configuration
public class ErrorMessageLoader {

    private static final Properties propsExported = new Properties();
    private static final Map<String, String> errorMap = new HashMap<>();


@PostConstruct
public void init() {
    try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("message-vn.properties")) {
        if (inputStream == null) {
            throw new BarberException("Không tìm thấy file message-vn.properties");
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.trim().isEmpty() || line.trim().startsWith("#")) continue;

                int index = line.indexOf("=");
                if (index > 0) {
                    String key = line.substring(0, index).trim();
                    String value = line.substring(index + 1).trim();
                    propsExported.setProperty(key, value);
                }
            }
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
}

    public static ErrorMessage getErrorMessage(String errorCode) {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setErrorCode(CustomerErrorCode.SYSTEM_ERROR);
        errorMessage.setErrorMessage("Lỗi hệ thống");

        String message = propsExported.getProperty(errorCode);
        if (message != null) {
            errorMessage.setErrorCode(errorCode);
            errorMessage.setErrorMessage(message);
        }

        return errorMessage;
    }

    public static String getProperty(String key) {
     return propsExported.getProperty(key);
}
}


