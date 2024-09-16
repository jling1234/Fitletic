package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workouts.Exercise;
import com.fitletic.spring.Entity.Workouts.UserExercise;

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
    private final UserService userService;
    private final UserExerciseService userExerciseService;
    private final ExerciseService exerciseService;


    public UserExerciseController(UserExerciseService userExerciseService, ExerciseService exerciseService, UserService userService) {
        this.userExerciseService = userExerciseService;
        this.exerciseService = exerciseService;
        this.userService = userService;
    }

    @CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/save")
    public ResponseEntity<UserExercise> saveUserExercise(@RequestBody UserExercise userExercise) {
        User user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(userExerciseService.createUserExercise(userExercise, user));
    }

    @CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
    @GetMapping("/getCalories")
    public ResponseEntity<Integer> getCalories(@RequestBody String workoutId)
    {

        List<UserExercise> userExercises=userExerciseService.getUserExercises(workoutId);
        List<String> exercise_id=new ArrayList<>();
        List<Integer> time=new ArrayList<>();
        for(UserExercise exercise: userExercises){
            exercise_id.add(exercise.getExerciseId());
            time.add(exercise.getTime());
        }
        List<Exercise> exercises=exerciseService.findAllById(exercise_id);
        List<String> type=exerciseService.findAllTypes(exercises);

        int calories=exerciseService.getTotalCalories(type,time);
        return ResponseEntity.ok(calories);
    }

    @CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
    @PostMapping("/delete")
    public ResponseEntity<?> deleteAllUserExercises(@RequestParam String workoutId) {
        userExerciseService.deleteAllUserExercises(workoutId);
        return ResponseEntity.ok().build();
    }

}
