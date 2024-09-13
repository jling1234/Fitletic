package com.fitletic.spring.Controller;


import com.fitletic.spring.Entity.Workouts.Exercise;
import com.fitletic.spring.Repository.Workouts.ExerciseRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor

public class ExerciseController

{
    //return list of workouts that the user types in
    //return workouts with type

    private ExerciseRepository exerciseRepository;

    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @GetMapping("/exercise")
    public List<Exercise> findAllExercises() {
        return exerciseRepository.findAll();
    }
}
