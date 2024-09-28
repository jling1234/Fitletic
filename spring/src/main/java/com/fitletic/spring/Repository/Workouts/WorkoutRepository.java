package com.fitletic.spring.Repository.Workouts;

import com.fitletic.spring.Entity.Workouts.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface WorkoutRepository extends MongoRepository<Workout, String> {
 List<Workout> findAllByUserId(String id);
 Optional<Workout> findById(String id);
}
