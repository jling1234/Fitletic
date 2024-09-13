package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workouts.Workout;
import com.fitletic.spring.Service.UserService;
import com.fitletic.spring.Service.WorkoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/workout")
@RestController
public class WorkoutController {
// private final WorkoutRepository workoutRepository;
 private final WorkoutService workoutService;
 private final UserService userService;

 public WorkoutController(UserService userService, WorkoutService workoutService) {
     this.userService = userService;
     this.workoutService=workoutService;
 }
   /* @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @GetMapping("/workout")
    public Optional<List<Workout>> findUserWorkouts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        String username= currentUser.getUsername();
        return workoutRepository.findByUsername(username);
    }*/

    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/save")
    public ResponseEntity<Workout> saveWorkout(@RequestBody Workout workout) {
        User user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(workoutService.createWorkout(workout,user));
    }
    @CrossOrigin(origins = "*", methods ={RequestMethod.POST,RequestMethod.GET,RequestMethod.PUT,RequestMethod.DELETE}, allowedHeaders = "*")
    @PostMapping("/getWorkouts")
    public ResponseEntity<List<Workout>> getWorkouts() {
        User user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(workoutService.getAllWorkouts(user));
    }

}

