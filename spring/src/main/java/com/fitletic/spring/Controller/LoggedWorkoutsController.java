package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.Workouts.LoggedWorkout;
import com.fitletic.spring.Repository.Workouts.LoggedWorkoutRepository;


import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("/logged")
@RestController
public class LoggedWorkoutsController {

    private final LoggedWorkoutRepository loggedWorkoutRepository;
    public LoggedWorkoutsController(LoggedWorkoutRepository loggedWorkoutRepository) {

        this.loggedWorkoutRepository = loggedWorkoutRepository;
    }
    @CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
    @PostMapping("/save")
    public LoggedWorkout save(@RequestBody LoggedWorkout loggedWorkout) {
        return loggedWorkoutRepository.save(loggedWorkout);
    }


    @CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
    @GetMapping("/get")
    public List<LoggedWorkout> getLoggedWorkout(@RequestParam LocalDateTime date) {
        return loggedWorkoutRepository.findByDate(date);
    }
    @CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
    @PostMapping("/delete")
    public void delete(@RequestParam String workoutId) {
        loggedWorkoutRepository.deleteByWorkoutId(workoutId);
    }
}
