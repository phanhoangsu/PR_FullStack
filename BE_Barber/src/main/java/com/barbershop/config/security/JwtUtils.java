package com.barbershop.config.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Date;
import java.util.List;


@Component
public class JwtUtils {
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${green.jwt.expiration}")
    private Long expiration;

    @Value("${green.jwt.secretKey}")
    private String secretKey;

    public Long getExpiration() {
        return expiration;
    }

    public String generateToken(String username, List<String> roles) {
        List<String> rolesWithPrefix = roles.stream()
                .map(r -> r.startsWith("ROLE_") ? r : "ROLE_" + r)
                .toList();


        String token = Jwts.builder()
                .setSubject(username)       // chủ thể usename
                .claim("roles", roles)    // gán thêm thông tin roles
                .setIssuedAt(new Date())    // thời điểm phát hành token
                .setExpiration(new Date(new Date().getTime() + expiration)) //hạn sử dụng
                .signWith(getSigningKey())  // ký token bằng khóa đã mã hóa
                .compact();                 // tạo ra chuỗi token
        return token;
    }

    SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(hashKey(secretKey).getBytes());
    }

    // lấy username
    public String getUsername(String token) {
        Claims claims = Jwts.parserBuilder()  // khởi tạo parser để phân tích token
                .setSigningKey(getSigningKey()) // cung cấp khóa bí mật đã mã hóa để xác thực token
                .build()
                .parseClaimsJws(token)          // giải mã và xác minh token cả chữ kí và cấu trúc
                .getBody();                     // lấy phần payload chưa claim trong đó có subject, roles...
        return claims.getSubject();             // trả về giá trị của sub trong JWT - chính là username
    }

    private String hashKey(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");        //Tạo bộ băm SHA-256
            byte[] hash = digest.digest(input.getBytes(StandardCharsets.UTF_8));        //Băm dữ liệu
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');                           // bổ sung số ) nếu thiếu
                hexString.append(hex);
            }
            return hexString.toString().substring(0, 32);                               // Cắt chỉ lấy 32 ký tự đầu
        } catch (Exception e) {
            LOGGER.error("Error while hashing JWT key: {}", e.getMessage());
            throw new RuntimeException("Couldn't generate JWT key signing key", e);
        }
    }

    // kiểm tra toke có hợp lệ không
    public Boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())  // key của bạn, kiểu Key hoặc byte[]
                    .build()
                    .parseClaimsJws(authToken);     // parse và verify token
            return true;
        } catch (io.jsonwebtoken.security.SecurityException e) {
            LOGGER.error("Chữ ký JWT không hợp lệ: {}", e.getMessage());
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            LOGGER.error("Token JWT không đúng định dạng: {}", e.getMessage());
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            LOGGER.error("Token JWT đã hết hạn: {}", e.getMessage());
        } catch (io.jsonwebtoken.UnsupportedJwtException e) {
            LOGGER.error("Token JWT không được hỗ trợ: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            LOGGER.error("Chuỗi Claims JWT rỗng: {}", e.getMessage());
        }
        return false;
    }

    // Sinh token reset password
    public String generateResetPasswordToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .claim("type", "RESET_PASSWORD")               // đánh dấu loại token
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000))    // 15 phút
                .signWith(getSigningKey())
                .compact();
    }

    // Kiểm tra token reset password hợp lệ
    public boolean validateResetToken(String token) {
        try {
            Claims claims=Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // checks loại token và hạn sử dụng
            return claims.getExpiration().after(new Date()) &&
                    "RESET_PASSWORD".equals(claims.get("type", String.class));

        }catch (Exception e) {
            LOGGER.error("Token reset không hợp lê: {}", e.getMessage());
            return false;
        }
    }
    // lấy username từ token
    public String getUsernameFromResetToken(String token) {
        Claims claims=Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}



