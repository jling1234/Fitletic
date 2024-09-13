package com.fitletic.spring.Repository.Workouts;

import com.fitletic.spring.Entity.Workouts.UserExercise;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface UserExerciseRepository extends MongoRepository<UserExercise, String> {
    List<UserExercise> findUserExerciseByWorkoutId(String workout_id);
}
