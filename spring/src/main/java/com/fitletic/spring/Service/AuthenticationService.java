package com.fitletic.spring.Service;


import com.fitletic.spring.DTO.LoginUserDTO;
import com.fitletic.spring.DTO.RegisterUserDTO;
import com.fitletic.spring.Entity.Role;
import com.fitletic.spring.Entity.RoleEnum;
import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Repository.RoleRepository;
import com.fitletic.spring.Repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    public User signup(RegisterUserDTO input) {
        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.USER);
        if (optionalRole.isEmpty())
        {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Role USER not found");
        }

        User user = User.builder()
                .username(input.getUsername())
                .password(passwordEncoder.encode(input.getPassword()))
                .role(optionalRole.get())
                .build();
        return userRepository.insert(user);
    }

    public User authenticate(LoginUserDTO input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );

        return userRepository.findByUsername(input.getUsername())
                .orElseThrow();
    }
}