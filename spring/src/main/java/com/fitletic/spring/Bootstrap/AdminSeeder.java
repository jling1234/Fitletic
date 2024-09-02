package com.fitletic.spring.Bootstrap;

import com.fitletic.spring.DTO.RegisterUserDTO;
import com.fitletic.spring.Entity.Role;
import com.fitletic.spring.Entity.RoleEnum;
import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Repository.RoleRepository;
import com.fitletic.spring.Repository.UserRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.Ordered;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Component
public class AdminSeeder implements ApplicationListener<ContextRefreshedEvent>, Ordered {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    public AdminSeeder(
            RoleRepository roleRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        this.createSuperAdministrator();
    }

    private void createSuperAdministrator() {
        RegisterUserDTO userDto = new RegisterUserDTO();
        userDto.setUsername("root");
        userDto.setPassword("root");

        Optional<User> optionalUser = userRepository.findByUsername(userDto.getUsername());
        if (optionalUser.isPresent()) {
            return;
        }

        Optional<Role> optionalRole = roleRepository.findByName(RoleEnum.SUPER_ADMIN);
        if (optionalRole.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Role USER not found");
        }

        User user = User.builder()
                .username(userDto.getUsername())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .role(optionalRole.get())
                .build();
        userRepository.insert(user);
    }

    @Override
    public int getOrder() {
        return 20;
    }
}
