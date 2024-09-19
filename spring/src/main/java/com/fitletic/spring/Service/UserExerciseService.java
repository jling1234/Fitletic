package com.fitletic.spring.Service;

import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workouts.Exercise;
import com.fitletic.spring.Entity.Workouts.UserExercise;
import com.fitletic.spring.Repository.Workouts.UserExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserExerciseService {
    private final UserExerciseRepository userExerciseRepository;
    private final ExerciseService exerciseService;

    public UserExerciseService(UserExerciseRepository userExerciseRepository,ExerciseService exerciseService) {
        this.userExerciseRepository = userExerciseRepository;

        this.exerciseService = exerciseService;

    }

    public UserExercise createUserExercise(UserExercise userExercise) {
        return userExerciseRepository.save(userExercise);
    }

    public List<UserExercise> getUserExercises(String workout_id) {
        return userExerciseRepository.findUserExerciseByWorkoutId(workout_id);
    }

    public void deleteAllUserExercises(String workout_id) {
        userExerciseRepository.deleteAllByWorkoutId(workout_id);
    }

    public int getCalories(String workoutId) {

        List<UserExercise> userExercises = getUserExercises(workoutId);
        List<String> exercise_id = new ArrayList<>();
        List<Integer> time = new ArrayList<>();
        for (UserExercise exercise : userExercises) {
            exercise_id.add(exercise.getExerciseId());
            time.add(exercise.getTime());
        }

        List<Exercise> exercises = exerciseService.findAllById(exercise_id);
        List<String> type = exerciseService.findAllTypes(exercises);

        return exerciseService.getTotalCalories(type, time);
    }
}