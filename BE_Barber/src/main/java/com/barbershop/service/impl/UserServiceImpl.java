package com.barbershop.service.impl;

import com.barbershop.domain.UserEntity;
import com.barbershop.model.UserAdapter;
import com.barbershop.repository.UserRepository;
import com.barbershop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl  implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user=userRepository.findByUsername(username)
                .orElseThrow(()->new UsernameNotFoundException("Không tìm thấy user với tên đăng nhập: " + username));
        UserDetails userDetails=new UserAdapter(user);
        return userDetails;
    }
}
