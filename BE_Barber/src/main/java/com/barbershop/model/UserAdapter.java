package com.barbershop.model;

import com.barbershop.domain.Role;
import com.barbershop.domain.UserEntity;
import com.barbershop.domain.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserAdapter implements UserDetails {
    private final UserEntity user;

    public UserAdapter(UserEntity userEntity) {
        this.user = userEntity;
    }

    // lấy quyền để Spring phân quyền
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        List<GrantedAuthority> authorities = new ArrayList<>();
//        if(user.getRoles()!=null) {
//            for (UserRole ur : user.getRoles()) {
//                Role role = ur.getRole();
//                String roleName = role.getRoleName();
//                System.out.println("User has role: " + roleName);
//                authorities.add(new SimpleGrantedAuthority(roleName));
//            }
//        }else {
//            System.out.println("User has NO roles");
//        }
//        return authorities;
//    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (user.getRoles() != null) {
            for (UserRole ur : user.getRoles()) {
                Role role = ur.getRole();
                String roleName = role.getRoleName();

                // ✅ Đảm bảo thêm prefix ROLE_
                if (!roleName.startsWith("ROLE_")) {
                    roleName = "ROLE_" + roleName;
                }

                System.out.println("User has role: " + roleName);
                authorities.add(new SimpleGrantedAuthority(roleName));
            }
        } else {
            System.out.println("User has NO roles");
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

}
