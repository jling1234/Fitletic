package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workouts.Workout;
import com.fitletic.spring.Service.UserService;
import com.fitletic.spring.Service.WorkoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RequestMapping("/workout")
@RestController
public class WorkoutController {
    //return list of workouts that the user types in
    //return workouts with type

 private final WorkoutService workoutService;
 private final UserService userService;


    public WorkoutController(UserService userService, WorkoutService workoutService) {
     this.userService = userService;
     this.workoutService=workoutService;

    }

    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/save")
    public ResponseEntity<Workout> saveWorkout(@RequestBody Workout workout) {
        User user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(workoutService.createWorkout(workout,user));
    }
    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @GetMapping("/getWorkouts")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Workout>> getWorkouts() {
        User user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(workoutService.getAllWorkouts(user));
    }
    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @PostMapping("/delete")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteWorkout(@RequestParam String workoutId) {
        //User user = userService.getAuthenticatedUser();
        workoutService.deleteWorkout(workoutId);
        workoutService.deleteLoggedWorkout(workoutId);
        return ResponseEntity.ok().build();
    }
    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @GetMapping("/get/{workoutId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Optional<Workout>> getWorkout(@PathVariable String workoutId) {
        return ResponseEntity.ok(workoutService.getWorkout(workoutId));
    }

}

