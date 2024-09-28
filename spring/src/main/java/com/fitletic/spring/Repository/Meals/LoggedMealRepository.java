package com.fitletic.spring.Repository.Meals;

import com.fitletic.spring.Entity.Meals.LoggedMeal;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;
import java.util.List;

public interface LoggedMealRepository extends MongoRepository<LoggedMeal, String> {
    List<LoggedMeal> findAllByMealId(String mealId);

    void deleteAllByMealId(String mealId);
}
