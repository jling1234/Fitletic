package com.fitletic.spring.Service;

import com.fitletic.spring.Entity.UserAuthentication;
import com.fitletic.spring.Repository.UserAuthRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserAuthRepository userRepository;

    public UserService(UserAuthRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserAuthentication> allUsers() {
        return new ArrayList<>(userRepository.findAll());
    }
}