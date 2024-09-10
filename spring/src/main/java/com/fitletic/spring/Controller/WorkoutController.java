package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.WorkoutEntity;
import com.fitletic.spring.Repository.WorkoutRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class WorkoutController {
    private WorkoutRepository workoutRepository;


        @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
        @PostMapping("/workout")
        public ResponseEntity saveWorkout(@RequestBody WorkoutEntity routine){
            workoutRepository.save(routine);
            return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
