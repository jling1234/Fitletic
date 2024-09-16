package com.fitletic.spring.Controller;

import com.fitletic.spring.Repository.WorkoutRepository;
import com.fitletic.spring.Entity.WorkoutEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

public class WorkoutController {
    //return list of workouts that the user types in
    //return workouts with type

private WorkoutRepository workoutRepository;

    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @GetMapping("/workout")
    public List<WorkoutEntity> getWorkout(String input) {
        return workoutRepository.findAllByTitleContainsIgnoreCase(input);
    }

}
