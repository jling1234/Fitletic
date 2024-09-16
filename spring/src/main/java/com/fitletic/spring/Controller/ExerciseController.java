package com.fitletic.spring.Controller;


import com.fitletic.spring.Entity.Workouts.Exercise;
import com.fitletic.spring.Repository.Workouts.ExerciseRepository;
import com.fitletic.spring.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController


public class ExerciseController

{
    //return list of workouts that the user types in
    //return workouts with type
    private final ExerciseRepository exerciseRepository;
    private final UserService userService;
public ExerciseController(ExerciseRepository exerciseRepository,UserService userService)
{
    this.exerciseRepository = exerciseRepository;
    this.userService=userService;
}



    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @GetMapping("/exercise")
    public List<Exercise> findAllExercises() {
       return exerciseRepository.findAll();
    }
}
