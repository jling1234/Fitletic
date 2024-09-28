package com.fitletic.spring.Response.Meals;

import com.fitletic.spring.Entity.Meals.Ingredient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MealIngredientResponse {
    private Ingredient ingredient;
    private double count;
}
