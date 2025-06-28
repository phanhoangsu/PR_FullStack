package com.barbershop.service.impl;

import com.barbershop.service.EmailService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendEmail(String to, String subject, String body) {
        System.out.println("📧 Đang gửi email tới: " + to);
        try {
            MimeMessage message = mailSender.createMimeMessage();

            message.setSubject(subject);
            MimeMessageHelper helper;
            helper = new MimeMessageHelper(message, true);
            helper.setFrom("suhoang0971@gmail.com");
            helper.setTo(to);
            helper.setText(body, true);
            mailSender.send(message);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }



}