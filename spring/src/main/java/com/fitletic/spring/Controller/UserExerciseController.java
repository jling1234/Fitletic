package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workouts.Exercise;
import com.fitletic.spring.Entity.Workouts.UserExercise;
import com.fitletic.spring.Entity.Workouts.Workout;
import com.fitletic.spring.Repository.Workouts.WorkoutRepository;
import com.fitletic.spring.Service.ExerciseService;
import com.fitletic.spring.Service.UserExerciseService;
import com.fitletic.spring.Service.UserService;
import com.fitletic.spring.Service.WorkoutService;
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
    private final WorkoutService workoutService;
    private final ExerciseService exerciseService;
    private final WorkoutRepository workoutRepository;

    public UserExerciseController(UserExerciseService userExerciseService, WorkoutService workoutService, ExerciseService exerciseService, UserService userService, WorkoutRepository workoutRepository) {
        this.userExerciseService = userExerciseService;
        this.workoutService = workoutService;
        this.exerciseService = exerciseService;
        this.userService = userService;
        this.workoutRepository = workoutRepository;
    }

    @CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/save")
    public ResponseEntity<UserExercise> saveUserExercise(@RequestBody UserExercise userExercise) {
        User user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(userExerciseService.createUserExercise(userExercise, user));
    }

    @CrossOrigin(origins = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
    @PostMapping("/getCalories")
    public ResponseEntity<Integer> getCalories(@RequestBody Workout workout)
    {

        List<UserExercise> userExercises=userExerciseService.getUserExercises(workout.getId());
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

}
