package com.barbershop.config.security;

import com.barbershop.model.UserAdapter;
import com.barbershop.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtFilter.class);

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtils jwtUtils;

    @Override       // đây là hàm chính của filter sẽ được gọi khi mỗi lần request gửi đến
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            // lấy token từ header
            String token=parseJwtToken(request);
            if(token!=null && jwtUtils.validateToken(token)){

                //trích suất username từ token || dùng jwtUtils để lấy subject chính là username
                String username=jwtUtils.getUsername(token);

                // load thông tin người dùng (UserAdapter)
                UserAdapter userDetails=(UserAdapter) userService.loadUserByUsername(username);

                // trích suất roles từ token
                Claims claims= Jwts.parser()
                        .setSigningKey(jwtUtils.getSigningKey())
                        .parseClaimsJws(token)
                        .getBody();

                // chuyển roles thành SimpleGrantedAuthority
                List<String> roles=claims.get("roles", List.class);
                List<SimpleGrantedAuthority> authorities=roles
                        .stream()
                        .map(SimpleGrantedAuthority::new)
                       .toList();

                // tạo đối tượng xác thực
                UsernamePasswordAuthenticationToken authentication=new UsernamePasswordAuthenticationToken(userDetails,null,authorities);
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // cập nhật vào Spring Security Context
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

        }catch (Exception e) {
            LOGGER.error("JwtTokenFilter doFilterInternal with exception {} ",e);
        }
        filterChain.doFilter(request, response);
    }

    // lấy token từ Header
    private String parseJwtToken(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if(headerAuth !=null && !headerAuth.isEmpty() && headerAuth.startsWith("Bearer ")) {
            return  headerAuth.substring(7, headerAuth.length());
        }
        return null;
    }
}
