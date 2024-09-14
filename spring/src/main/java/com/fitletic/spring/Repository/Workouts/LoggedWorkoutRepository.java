package com.fitletic.spring.Repository.Workouts;

import com.fitletic.spring.Entity.Workouts.LoggedWorkout;
import org.springframework.data.mongodb.repository.MongoRepository;


import java.time.LocalDateTime;
import java.util.List;

public interface LoggedWorkoutRepository extends MongoRepository<LoggedWorkout, String> {
  List<LoggedWorkout> findByDate(LocalDateTime date);
  void deleteByWorkoutId(String workout_id);
}
