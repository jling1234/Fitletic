package com.fitletic.spring.Controller;

import com.fitletic.spring.Repository.UserAuthRepository;

import com.fitletic.spring.Service.UserDetailsAuthService;
import com.fitletic.spring.entity.UserAuthentication;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor

public class UserController {
    private final UserAuthRepository userRepository;
    private final UserDetailsAuthService userDetailsAuthService;


    private final PasswordEncoder passwordEncoder;

    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody UserAuthentication user) {
        try {
            if (userRepository.findByUsername(user.getUsername()).isPresent())
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken. Please try again");
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @PostMapping("/signin")
    public ResponseEntity loginUser(@RequestBody UserAuthentication user) {
        try {
            //userDetailsAuthService.loadUserByUsername(String.valueOf(user));
            //String password= String.valueOf(userRepository.findByUsername(user.getPassword()));
            Optional<UserAuthentication> userrepo= userRepository.findByUsername(user.getUsername());
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                if (passwordEncoder.matches(user.getPassword(), userrepo.get().getPassword()))
                    return ResponseEntity.status(HttpStatus.OK).body("Username logged in");

            }
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid username or password");

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

}
