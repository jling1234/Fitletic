package com.fitletic.spring.Repository;

import com.fitletic.spring.entity.UserAuthentication;
import com.fitletic.spring.entity.WorkoutEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkoutRepository extends MongoRepository<WorkoutEntity,Integer> {
    List<WorkoutEntity> findAllByTitleContainsIgnoreCase(String input);
}
