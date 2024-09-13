package com.fitletic.spring.Repository.Workouts;

import com.fitletic.spring.Entity.Workouts.LoggedWorkout;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface LoggedWorkoutRepository extends MongoRepository<LoggedWorkout, String> {
  List<LoggedWorkout> findByDate(LocalDate date);
}
