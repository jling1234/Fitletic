package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workouts.Exercise;
import com.fitletic.spring.Entity.Workouts.UserExercise;

import com.fitletic.spring.Entity.Workouts.UserExerciseResponse;
import com.fitletic.spring.Service.ExerciseService;
import com.fitletic.spring.Service.UserExerciseService;
import com.fitletic.spring.Service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/userExercise")
@RestController
public class UserExerciseController {

    private final UserExerciseService userExerciseService;
    private final UserService userService;



    public UserExerciseController(UserExerciseService userExerciseService,UserService userService) {

   

        this.userExerciseService = userExerciseService;
        this.userService = userService;
    }

    @CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
            RequestMethod.DELETE }, allowedHeaders = "*")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/save")
    public ResponseEntity<UserExercise> saveUserExercise(@RequestBody UserExercise userExercise) {
        return ResponseEntity.ok(userExerciseService.createUserExercise(userExercise));
    }

    @CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT,
            RequestMethod.DELETE }, allowedHeaders = "*")
    @PostMapping("/delete")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteAllUserExercises(@RequestParam String workoutId) {
        userExerciseService.deleteAllUserExercises(workoutId);
        return ResponseEntity.ok().build();
    }


    @CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/get/{workoutId}")
    public ResponseEntity<List<UserExerciseResponse>> getUserExercises(@PathVariable String workoutId) {
        return ResponseEntity.ok(userExerciseService.getUserExerciseResponse(workoutId));
    }

}
