package com.fitletic.spring.Repository;

import com.fitletic.spring.Entity.ExerciseEntity;
import com.fitletic.spring.Entity.UserAuthentication;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepository extends MongoRepository<ExerciseEntity,String> {
    List<ExerciseEntity> findAllBy(String username);
}
