package com.fitletic.spring.Service;

import com.fitletic.spring.DTO.RegisterUserDTO;
import com.fitletic.spring.Entity.Role;
import com.fitletic.spring.Entity.RoleEnum;
import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workouts.UserExercise;
import com.fitletic.spring.Repository.RoleRepository;
import com.fitletic.spring.Repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> allUsers() {
        return new ArrayList<>(userRepository.findAll());
    }

    public User createAdministrator(RegisterUserDTO input) {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.ADMIN);
        if (optionalRole.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Role USER not found");
        }

        User user = User.builder()
                .username(input.getUsername())
                .password(passwordEncoder.encode(input.getPassword()))
                .role(optionalRole.get())
                .build();
        return userRepository.insert(user);
    }

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    public boolean userExists(String username) {
        return userRepository.existsByUsername(username);
    }
}