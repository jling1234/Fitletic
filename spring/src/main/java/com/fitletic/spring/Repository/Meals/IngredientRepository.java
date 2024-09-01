package com.fitletic.spring.Repository.Meals;

import com.fitletic.spring.Entity.Meals.Ingredient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngredientRepository extends MongoRepository<Ingredient, String> {
    List<Ingredient> findByDescriptionStartingWithIgnoreCaseOrderByDescriptionAsc(String description);
}
