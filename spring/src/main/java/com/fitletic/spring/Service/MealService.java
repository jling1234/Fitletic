package com.fitletic.spring.Service;

import com.fitletic.spring.Entity.Meals.Ingredient;
import com.fitletic.spring.Entity.Meals.Meal;
import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Repository.Meals.IngredientRepository;
import com.fitletic.spring.Repository.Meals.MealRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MealService {
    private final IngredientRepository ingredientRepository;
    private final MealRepository mealRepository;

    public MealService(IngredientRepository ingredientRepository, MealRepository mealRepository) {
        this.ingredientRepository = ingredientRepository;
        this.mealRepository = mealRepository;
    }

    public List<Ingredient> allIngredients() {
        return new ArrayList<>(ingredientRepository.findAll());
    }

    public Optional<Ingredient> oneIngredient(String id) {
        return ingredientRepository.findById(id);
    }

    public List<Ingredient> matchingIngredients(String description) {
        return new ArrayList<>(ingredientRepository.findByDescriptionStartingWithIgnoreCaseOrderByDescriptionAsc(description));
    }

    public Meal newMeal(User user, Meal meal) {
        meal.setUserId(user.getId());
        return mealRepository.save(meal);
    }

    public List<Meal> allMeals(User user) {
        return new ArrayList<>(mealRepository.findAllByUserId(user.getId()));
    }

    public Optional<Meal> oneMeal(User user, String id) {
        return mealRepository.findByIdAndUserId(id, user.getId());
    }

    public Meal replaceMeal(User user, String id, Meal newMeal) {
        Optional<Meal> optionalMeal = oneMeal(user, id);

        Meal savedMeal;
        if (optionalMeal.isPresent()) {
            Meal meal = optionalMeal.get();
            meal.setName(newMeal.getName());
            meal.setIngredients(newMeal.getIngredients());
            meal.setServings(newMeal.getServings());
            savedMeal = mealRepository.save(meal);
        } else {
            savedMeal = newMeal(user, newMeal);
        }

        return savedMeal;
    }

    public void deleteMeal(User user, String id) {
        mealRepository.deleteByIdAndUserId(id, user.getId());
    }
}
