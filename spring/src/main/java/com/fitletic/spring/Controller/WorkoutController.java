package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workout;
import com.fitletic.spring.Repository.WorkoutRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class WorkoutController {

    private WorkoutRepository workoutRepository;
    @PostMapping("/routine")
    public ResponseEntity addRoutine(@RequestBody Workout workout) {
       try{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //User currentUser = (User) authentication.getPrincipal();
        workoutRepository.save(workout);
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
       catch (Exception e){
           return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e.getMessage());
       }
    }

    @GetMapping ("/findroutine")
    public Optional<List<Workout>> findByUsername() {
       try {
           Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
           User currentUser = (User) authentication.getPrincipal();
           String username=currentUser.getUsername();
           return workoutRepository.findByUsername(username);
       }
       catch(Exception e){
           return Optional.empty();
       }
    }

  @PostMapping("/editroutine")
    public ResponseEntity editRoutine(@RequestBody Workout newworkout) {
      workoutRepository.save(newworkout);
      return ResponseEntity.ok(HttpStatus.CREATED);

  }
  @PostMapping("/deleteroutine")
  public ResponseEntity deleteRoutine(@RequestBody Workout workout) {
        workoutRepository.delete(workout);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
