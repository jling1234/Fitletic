package com.fitletic.spring.Controller;

import com.fitletic.spring.DTO.ChangePasswordDTO;
import com.fitletic.spring.DTO.LoginUserDTO;
import com.fitletic.spring.DTO.RegisterUserDTO;
import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Response.LoginResponse;
import com.fitletic.spring.Service.JwtService;
import com.fitletic.spring.Service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDTO registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDTO loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<User> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        User passwordChangedUser = authenticationService.changePassword(changePasswordDTO);
        return ResponseEntity.ok(passwordChangedUser);
    }
}