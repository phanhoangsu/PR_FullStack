package com.barbershop.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        Map<String,Object> map=new HashMap<>();
        map.put("status",HttpServletResponse.SC_UNAUTHORIZED);
        map.put("message","Unauthorized");
        map.put("error",authException.getMessage());
        map.put("path",request.getRequestURI());

        ObjectMapper objectMapper=new ObjectMapper();
        objectMapper.writeValue(response.getOutputStream(),map);
    }
}
