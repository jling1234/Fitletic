package com.fitletic.spring.Repository;

import com.fitletic.spring.Entity.WorkoutEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutRepository extends MongoRepository<WorkoutEntity,Integer> {
    List<WorkoutEntity> findAllByTitleContainsIgnoreCase(String input);
}
