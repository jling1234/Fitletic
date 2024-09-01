package com.fitletic.spring.Service;

import com.fitletic.spring.Entity.Meals.Ingredient;
import com.fitletic.spring.Repository.Meals.IngredientRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MealService {
    private final IngredientRepository ingredientRepository;

    public MealService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public List<Ingredient> allIngredients() {
        return new ArrayList<>(ingredientRepository.findAll());
    }

    public List<Ingredient> matchingIngredients(String description) {
        return new ArrayList<>(ingredientRepository.findByDescriptionStartingWithIgnoreCaseOrderByDescriptionAsc(description));
    }
}
