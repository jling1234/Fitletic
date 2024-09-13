package com.fitletic.spring.Repository.Workouts;

import com.fitletic.spring.Entity.Workouts.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface WorkoutRepository extends MongoRepository<Workout, String> {
  public List<Workout> findAllByUserId(String id);


}
