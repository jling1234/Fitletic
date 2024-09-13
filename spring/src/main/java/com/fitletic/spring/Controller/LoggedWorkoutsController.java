package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.Workouts.LoggedWorkout;
import com.fitletic.spring.Repository.Workouts.LoggedWorkoutRepository;
import com.fitletic.spring.Service.UserService;
import com.fitletic.spring.Service.WorkoutService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    public List<LoggedWorkout> getLoggedWorkout(@RequestParam LocalDate date) {
        return loggedWorkoutRepository.findByDate(date);
    }
}
