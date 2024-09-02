package com.fitletic.spring.Controller;

import com.fitletic.spring.Repository.ExerciseRepository;
import com.fitletic.spring.entity.ExerciseEntity;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@AllArgsConstructor

public class ExerciseController {
    //return list of workouts that the user types in
    //return workouts with type

private ExerciseRepository exerciseRepository;

 @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @GetMapping("/exercise")
    public List<ExerciseEntity> findAllWorkouts() {
        return exerciseRepository.findAll();
    }

}
