package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.Meals.Ingredient;
import com.fitletic.spring.Entity.Meals.Meal;
import com.fitletic.spring.Entity.User;
import com.fitletic.spring.Service.MealService;
import com.fitletic.spring.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/meals")
@RestController
public class MealController {
    private final MealService mealService;
    private final UserService userService;

    public MealController(MealService mealService, UserService userService) {
        this.mealService = mealService;
        this.userService = userService;
    }

    @GetMapping("/ingredients")
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        return ResponseEntity.ok(mealService.allIngredients());
    }

    @GetMapping("/ingredients/search/{description}")
    public ResponseEntity<List<Ingredient>> getMatchingIngredients(@PathVariable String description) {
        return ResponseEntity.ok(mealService.matchingIngredients(description));
    }

    @GetMapping("/ingredients/{id}")
    public ResponseEntity<Ingredient> getOneIngredient(@PathVariable String id) {
        return ResponseEntity.ok(mealService.oneIngredient(id).orElseThrow());
    }

    @PostMapping("")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Meal> createMeal(@RequestBody Meal meal) {
        User user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(mealService.newMeal(user, meal));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Meal>> getAllMeals() {
        User user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(mealService.allMeals(user));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Meal> getOneMeal(@PathVariable String id) {
        User user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(mealService.oneMeal(user, id).orElseThrow());
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Meal> replaceMeal(@PathVariable String id, @RequestBody Meal newMeal) {
        User user = userService.getAuthenticatedUser();
        return ResponseEntity.ok(mealService.replaceMeal(user, id, newMeal));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteMeal(@PathVariable String id) {
        User user = userService.getAuthenticatedUser();
        mealService.deleteMeal(user, id);
        return ResponseEntity.ok().build();
    }
}
