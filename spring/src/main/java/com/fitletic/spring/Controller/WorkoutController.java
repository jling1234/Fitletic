package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.Exercise;
import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workout;
import com.fitletic.spring.Repository.WorkoutRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor

public class WorkoutController {
 private WorkoutRepository workoutRepository;

    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @GetMapping("/workout")
    public Optional<List<Workout>> findUserWorkouts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        String username= currentUser.getUsername();
        return workoutRepository.findByUsername(username);
    }

    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @PostMapping("/saveworkout")
    public ResponseEntity<Workout> saveWorkout(@RequestBody Workout workout) {
        workoutRepository.save(workout);
        return ResponseEntity.status(HttpStatus.CREATED).body(workout);
    }
}

