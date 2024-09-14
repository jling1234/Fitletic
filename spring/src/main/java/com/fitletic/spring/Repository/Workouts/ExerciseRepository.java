package com.fitletic.spring.Repository.Workouts;

import com.fitletic.spring.Entity.Workouts.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ExerciseRepository extends MongoRepository<Exercise, String> {
}
