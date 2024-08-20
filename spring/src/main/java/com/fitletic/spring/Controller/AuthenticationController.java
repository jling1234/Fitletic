package com.fitletic.spring.Controller;

import com.fitletic.spring.DTO.LoginUserDTO;
import com.fitletic.spring.DTO.RegisterUserDTO;
import com.fitletic.spring.Entity.UserAuthentication;
import com.fitletic.spring.Response.LoginResponse;
import com.fitletic.spring.Service.JwtService;
import com.fitletic.spring.Service.UserDetailsAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final UserDetailsAuthService authenticationService;

    public AuthenticationController(JwtService jwtService, UserDetailsAuthService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserAuthentication> register(@RequestBody RegisterUserDTO registerUserDto) {
        UserAuthentication registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDTO loginUserDto) {
        UserAuthentication authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}