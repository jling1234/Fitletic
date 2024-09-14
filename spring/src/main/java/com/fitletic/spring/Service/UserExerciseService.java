package com.fitletic.spring.Service;

import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Entity.Workouts.UserExercise;
import com.fitletic.spring.Repository.Workouts.UserExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserExerciseService {
 private  final UserExerciseRepository userExerciseRepository;

 public UserExerciseService(UserExerciseRepository userExerciseRepository) {
     this.userExerciseRepository = userExerciseRepository;

 }
 public UserExercise createUserExercise(UserExercise userExercise, User user) {
     userExercise.setUserId(user.getId());
     return userExerciseRepository.save(userExercise);
 }

 public List<UserExercise> getUserExercises(String workout_id) {
    return userExerciseRepository.findUserExerciseByWorkoutId(workout_id);
 }
 public void deleteAllUserExercises(String workout_id) {
     userExerciseRepository.deleteAllByWorkoutId(workout_id);
 }
}
