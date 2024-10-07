package com.fitletic.spring.Service;

import com.fitletic.spring.Entity.Meals.Ingredient;
import com.fitletic.spring.Entity.Meals.LoggedMeal;
import com.fitletic.spring.Entity.Meals.Meal;
import com.fitletic.spring.Entity.Meals.MealIngredient;
import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Repository.Meals.IngredientRepository;
import com.fitletic.spring.Repository.Meals.LoggedMealRepository;
import com.fitletic.spring.Repository.Meals.MealRepository;
import com.fitletic.spring.Response.Meals.LoggedMealResponse;
import com.fitletic.spring.Response.Meals.MealIngredientResponse;
import com.fitletic.spring.Response.Meals.MealResponse;
import org.apache.juli.logging.Log;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class MealService {
    private final IngredientRepository ingredientRepository;
    private final MealRepository mealRepository;
    private final LoggedMealRepository loggedMealRepository;

    public MealService(IngredientRepository ingredientRepository, MealRepository mealRepository, LoggedMealRepository loggedMealRepository) {
        this.ingredientRepository = ingredientRepository;
        this.mealRepository = mealRepository;
        this.loggedMealRepository = loggedMealRepository;
    }

    public MealIngredientResponse fromMealIngredient(MealIngredient mealIngredient) {
        return new MealIngredientResponse(
                ingredientRepository.findById(mealIngredient.getIngredientId()).orElseThrow(),
                mealIngredient.getCount()
        );
    }

    public MealResponse fromMeal(Meal meal) {
        MealIngredientResponse[] mealIngredientResponses = new MealIngredientResponse[meal.getIngredients().length];
        for (int i = 0; i < meal.getIngredients().length; i++) {
            mealIngredientResponses[i] = fromMealIngredient(meal.getIngredients()[i]);
        }
        return new MealResponse(meal.getId(), meal.getUserId(), meal.getName(), mealIngredientResponses, meal.getServings());
    }

    public LoggedMealResponse fromLoggedMeal(LoggedMeal loggedMeal) {
        return new LoggedMealResponse(loggedMeal.getId(), fromMeal(mealRepository.findById(loggedMeal.getMealId()).orElseThrow()), loggedMeal.getLoggedAtEpochSecond());
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
        loggedMealRepository.deleteAllByMealId(id);
    }

    public LoggedMealResponse logMeal(User user, String mealId) {
        Meal meal = mealRepository.findById(mealId).orElseThrow();
        if (!user.getId().equals(meal.getUserId())) {
            throw new AccessDeniedException("Meal with id '" + meal.getId() + "' does not belong to user " + user.getUsername());
        }

        LoggedMeal loggedMeal = new LoggedMeal();
        loggedMeal.setMealId(meal.getId());
        loggedMeal.setLoggedAtEpochSecond(Instant.now().getEpochSecond());

        return fromLoggedMeal(loggedMealRepository.save(loggedMeal));
    }

    public List<LoggedMealResponse> allLoggedMeals(User user) {
        List<LoggedMeal> loggedMeals = new ArrayList<>();

        for (Meal meal : mealRepository.findAllByUserId(user.getId())) {
            loggedMeals.addAll(loggedMealRepository.findAllByMealId(meal.getId()));
        }

        List<LoggedMealResponse> responses = new ArrayList<>();
        for (LoggedMeal loggedMeal : loggedMeals) {
            responses.add(fromLoggedMeal(loggedMeal));
        }

        responses.sort(Collections.reverseOrder());
        return responses;
    }

    public List<LoggedMealResponse> allLoggedMeals(User user, long fromEpochSecond, long untilEpochSecond) {
        List<LoggedMealResponse> loggedMeals = allLoggedMeals(user);

        List<LoggedMealResponse> filteredResponses = new ArrayList<>();
        for (LoggedMealResponse loggedMeal : loggedMeals) {
            if (loggedMeal.getLoggedAtEpochSecond() >= fromEpochSecond && loggedMeal.getLoggedAtEpochSecond() <= untilEpochSecond) {
                filteredResponses.add(loggedMeal);
            }
        }

        return filteredResponses;
    }

    public LoggedMealResponse oneLoggedMeal(User user, String id) {
        LoggedMeal loggedMeal = loggedMealRepository.findById(id).orElseThrow();
        Meal meal = mealRepository.findById(loggedMeal.getMealId()).orElseThrow();
        if (!user.getId().equals(meal.getUserId())) {
            throw new AccessDeniedException("Meal with id '" + meal.getId() + "' does not belong to user " + user.getUsername());
        }

        return fromLoggedMeal(loggedMeal);
    }

    public void deleteLoggedMeal(User user, String id) {
        LoggedMeal loggedMeal = loggedMealRepository.findById(id).orElseThrow();
        Meal meal = mealRepository.findById(loggedMeal.getMealId()).orElseThrow();
        if (!user.getId().equals(meal.getUserId())) {
            throw new AccessDeniedException("Meal with id '" + meal.getId() + "' does not belong to user " + user.getUsername());
        }

        loggedMealRepository.deleteById(id);
    }
}
