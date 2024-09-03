package com.fitletic.spring.Repository;

import com.fitletic.spring.Entity.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ExerciseRepository extends MongoRepository<Exercise, String> {
    List<Exercise> findByTitle(String title);
}
