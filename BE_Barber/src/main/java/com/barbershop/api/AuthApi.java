package com.barbershop.api;

import com.barbershop.config.security.JwtUtils;
import com.barbershop.domain.*;
import com.barbershop.exception.BarberException;
import com.barbershop.model.UserAdapter;
import com.barbershop.model.request.RegisterRequest;
import com.barbershop.model.request.ResetPasswordRequest;
import com.barbershop.model.request.TokenRequest;
import com.barbershop.model.response.CustomerResponse;
import com.barbershop.model.response.TokenResponse;
import com.barbershop.repository.CustomerRepository;
import com.barbershop.repository.RoleRepository;
import com.barbershop.repository.UserRepository;
import com.barbershop.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthApi {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private CustomerRepository customerRepository;

    private Logger logger = LoggerFactory.getLogger(AuthApi.class);

    @Autowired
    private EmailService emailService;

    @PostMapping("/token")
    public ResponseEntity<?> getToken(@RequestBody TokenRequest request) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPasswordHashed()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserAdapter userAdapter = (UserAdapter) authentication.getPrincipal();
            List<String> roles = userAdapter.getAuthorities().stream()
                    .map(auth -> auth.getAuthority())
                    .toList();

            String token = jwtUtils.generateToken(userAdapter.getUsername(), roles);
            TokenResponse tokenResponse = new TokenResponse();
            tokenResponse.setToken(token);
            tokenResponse.setExpired(new Date().getTime() + jwtUtils.getExpiration());
            return new ResponseEntity<>(tokenResponse, HttpStatus.OK);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai tên đăng nhập hoặc mật khẩu");

        } catch (Exception e) {
            logger.error("getToken error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi hệ thống khi đăng ký");
        }
    }

//    // lấy thông tin người dùng
//    @GetMapping("/profile")
//    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserAdapter userDetails) {
//        if (userDetails == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
//        }
//
//        String username = userDetails.getUsername();
//        List<String> roles = userDetails.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .collect(Collectors.toList());
//        System.out.println("💡 ROLES in profile API: " + roles);
//        return ResponseEntity.ok(new ProfileResponse(username, roles));
//    }
//
//    // DTO trả về client, Java 16+ record
//    record ProfileResponse(String username, List<String> roles) {
//    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserAdapter userDetails) {
        if (userDetails == null) {
            System.out.println("❌ Không có userDetails (chưa đăng nhập)");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        UserEntity user = userDetails.getUser(); // 👉 lỗi ở đây nếu userDetails.getUser() chưa có method
        if (user == null) {
            System.out.println("❌ userDetails.getUser() trả về null");
        } else {
            System.out.println("✅ UserEntity ID: " + user.getId());
            System.out.println("✅ Username: " + user.getUsername());
        }

        Customer customer = user.getCustomer(); // 👉 kiểm tra xem có bị null không
        if (customer == null) {
            System.out.println("❌ Customer của user bị null");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User has no customer info");
        } else {
            System.out.println("✅ Customer found: " + customer.getFullName());
        }

        CustomerResponse response = new CustomerResponse();
        response.setPhoneNumber(customer.getPhoneNumber());
        response.setEmail(customer.getEmail());
        response.setFullName(customer.getFullName());
        response.setCreatedAt(customer.getCreatedAt());

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        response.setRoles(roles);

        System.out.println("✅ Roles: " + roles);

        return ResponseEntity.ok(response);
    }




    // đăng kí toàn khoản
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            // kiểm tra username đã tồn tại
            if (userRepository.existsByUsername(request.getUsername())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username đã tồn tại");
            }
            // kiểm tra email
            if (customerRepository.existsByEmail(request.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email được đăng kí");
            }
            // kiểm tra phoneNumber trùng
            if (customerRepository.existsById(request.getPhoneNumber())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Số điện thoại đã được sử dụng");
            }

            // tạo user
            UserEntity userEntity = new UserEntity();
            userEntity.setUsername(request.getUsername());
            userEntity.setPasswordHash(passwordEncoder.encode(request.getPasswordHashed()));
            userRepository.save(userEntity);

            // gán Role ROLE_CUSTOMER
            Role role = roleRepository.findByRoleName("ROLE_CUSTOMER")
                    .orElseThrow(() -> new BarberException("ROLE_CUSTOMER không tồn tại"));
            UserRole userRole = new UserRole();
            userRole.setUser(userEntity);
            userRole.setRole(role);
            userRole.setId(new UserRoleId(null, role.getId()));
            userEntity.getRoles().add(userRole);
            userRepository.save(userEntity);

            // tạo customer (email liên kết user)
            Customer customer = new Customer();
            customer.setPhoneNumber(request.getPhoneNumber());
            customer.setFullName("Khách hàng mới");
            customer.setEmail(request.getEmail());
            customer.setUser(userEntity);

            customerRepository.save(customer);

            return ResponseEntity.status(HttpStatus.CREATED).body("Đăng kí thành công");

        } catch (Exception e) {
            logger.error("Đăng kí lỗi: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đăng kí thât bại");
        }
    }


    // gửi mail chưa link reset
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        Optional<Customer> optionalCustomer = customerRepository.findByEmail(email);
        if (optionalCustomer.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy khách hàng với email: " + email);
        }

        // Lấy user từ customer
        UserEntity user = optionalCustomer.get().getUser();
        if (user == null) {
            return ResponseEntity.badRequest().body("Không tìm thấy người dùng tương ứng với email này");
        }

        String token = jwtUtils.generateResetPasswordToken(user.getUsername());
        // In log để kiểm tra token
        System.out.println("Token reset tạo ra: " + token);

        String link = "http://localhost:5173/auth/reset-password?token=" + token;

        emailService.sendEmail(email, "Khôi phục mật khẩu",
                "Vui lòng click vào liên kết sau để đặt lại mật khẩu (có hiệu lực trong 15 phút):\n <a href=\"" + link + "\">Click</a>");
        return ResponseEntity.ok("Link đặt lại mật khẩu đã gửi đến email.");
    }

    // kiểm tra token có hợp lệ không (gọi khi FE mở form)
    @GetMapping("/check-reset-token")
    public ResponseEntity<?> checkResetToken(@RequestParam String token) {
        boolean valid = jwtUtils.validateToken(token);
        if (!valid) {
            return ResponseEntity.badRequest().body("Token hợp lệ hoặc đã hết hạn");
        }
        return ResponseEntity.ok("Token hợp lệ");
    }

    // Đặt lại mật khẩu gửi token + mật khẩu mới
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword
    (@RequestParam String token,
     @RequestBody ResetPasswordRequest request) {
        if (!jwtUtils.validateToken(token)) {
            return ResponseEntity.badRequest().body("Token không hợp lệ hoặc đã hết hạn");
        }
        String username = jwtUtils.getUsernameFromResetToken(token);
        Optional<UserEntity> optional = userRepository.findByUsername(username);
        if (optional.isEmpty()) {
            return ResponseEntity.badRequest().body("Người dùng không tồn tại");
        }

        UserEntity user = optional.get();
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        System.out.println("Hash mới: " + passwordEncoder.encode(request.getNewPassword()));

        return ResponseEntity.ok("Mật khẩu đã được đặt lại thành công.");
    }
}
