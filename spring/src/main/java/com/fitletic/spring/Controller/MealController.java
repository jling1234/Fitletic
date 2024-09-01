package com.fitletic.spring.Controller;

import com.fitletic.spring.Entity.Meals.Ingredient;
import com.fitletic.spring.Service.MealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/meals")
@RestController
public class MealController {
    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/ingredients")
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        return ResponseEntity.ok(mealService.allIngredients());
    }

    @GetMapping("/ingredients/{description}")
    public ResponseEntity<List<Ingredient>> getMatchingIngredients(@PathVariable String description) {
        return ResponseEntity.ok(mealService.matchingIngredients(description));
    }
}
