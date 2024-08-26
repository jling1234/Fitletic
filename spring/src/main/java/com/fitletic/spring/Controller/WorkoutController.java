package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.Workout;
import com.fitletic.spring.Repository.WorkoutRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class WorkoutController {

    private Workout workout;
    private WorkoutRepository workoutRepository;
    @PostMapping("/routine")
    public ResponseEntity addRoutine(@RequestBody Workout workout) {

        workoutRepository.save(workout);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @GetMapping ("/routinefind")
    public Optional<List<Workout>> findByUsername(String username) {
       try {
           return workoutRepository.findByUsername(username);
       }
       catch(Exception e){
           return Optional.empty();
       }
    }

 /*   @PostMapping("/editroutine")
    public ResponseEntity editRoutine(String username, String routine) {
        Optional<Workout> routineOptional=workoutRepository.f
    }*/
}
