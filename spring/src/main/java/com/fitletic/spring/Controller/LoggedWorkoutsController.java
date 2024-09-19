package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.Workouts.LoggedWorkout;
import com.fitletic.spring.Entity.Workouts.LoggedWorkoutResponse;
import com.fitletic.spring.Repository.Workouts.LoggedWorkoutRepository;


import com.fitletic.spring.Service.LoggedWorkoutService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("/logged")
@RestController
public class LoggedWorkoutsController {

    private final LoggedWorkoutRepository loggedWorkoutRepository;
    private final LoggedWorkoutService loggedWorkoutService;

    public LoggedWorkoutsController(LoggedWorkoutRepository loggedWorkoutRepository,LoggedWorkoutService loggedWorkoutService) {
        this.loggedWorkoutRepository = loggedWorkoutRepository;
        this.loggedWorkoutService = loggedWorkoutService;
    }
    @CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
    @PostMapping("/save/{workoutId}")
    public LoggedWorkoutResponse save(@PathVariable String workoutId) {
        return (loggedWorkoutService.getLoggedWorkoutResponse(loggedWorkoutService.saveLoggedWorkout(workoutId)));
    }


    @CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
    @GetMapping("/get")
    public List<LoggedWorkoutResponse> getLoggedWorkouts() {
        return loggedWorkoutService.getLoggedWorkoutsResponsesList(loggedWorkoutService.getLoggedWorkoutsList());
    }

    @CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
    @PostMapping("/delete/{workoutId}")
    public void delete(@PathVariable String workoutId) {
        loggedWorkoutRepository.deleteByWorkoutId(workoutId);
    }
}

