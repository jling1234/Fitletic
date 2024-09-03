package com.fitletic.spring.Repository;

import com.fitletic.spring.Entity.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
     Optional<List<Workout>> findByUsername(String username);
}
