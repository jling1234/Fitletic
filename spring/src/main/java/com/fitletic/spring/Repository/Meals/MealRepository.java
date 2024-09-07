package com.fitletic.spring.Repository.Meals;

import com.fitletic.spring.Entity.Meals.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MealRepository extends MongoRepository<Meal, String> {
    List<Meal> findAllByUserId(String id);

    Optional<Meal> findByIdAndUserId(String id, String userId);

    void deleteByIdAndUserId(String id, String userId);
}
