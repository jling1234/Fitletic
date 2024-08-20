package com.fitletic.spring.Service;


import com.fitletic.spring.DTO.LoginUserDTO;
import com.fitletic.spring.DTO.RegisterUserDTO;
import com.fitletic.spring.Entity.UserAuthentication;
import com.fitletic.spring.Repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsAuthService {
    private final UserAuthRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public UserDetailsAuthService(
            UserAuthRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserAuthentication signup(RegisterUserDTO input) {
        UserAuthentication user = UserAuthentication.builder()
                .username(input.getUsername())
                .password(passwordEncoder.encode(input.getPassword()))
                .build();
        return userRepository.insert(user);
    }

    public UserAuthentication authenticate(LoginUserDTO input) {
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