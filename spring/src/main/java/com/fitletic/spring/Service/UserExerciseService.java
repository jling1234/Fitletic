package com.fitletic.spring.Service;

import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workouts.UserExercise;
import com.fitletic.spring.Repository.Workouts.ExerciseRepository;
import com.fitletic.spring.Repository.Workouts.UserExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserExerciseService {
 private  final UserExerciseRepository userExerciseRepository;
 //private final ExerciseRepository exerciseRepository;
 public UserExerciseService(UserExerciseRepository userExerciseRepository, ExerciseRepository exerciseRepository) {
     this.userExerciseRepository = userExerciseRepository;
    // this.exerciseRepository = exerciseRepository;
 }
 public UserExercise createUserExercise(UserExercise userExercise, User user) {
     userExercise.setUserId(user.getId());
   //  userExercise.setWorkoutId(workoutid);
     return userExerciseRepository.save(userExercise);
 }

 public List<UserExercise> getUserExercises(String workout_id) {
    return userExerciseRepository.findUserExerciseByWorkoutId(workout_id);
 }
}
