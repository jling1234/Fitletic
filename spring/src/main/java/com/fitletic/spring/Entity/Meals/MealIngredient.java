package com.fitletic.spring.Entity.Meals;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MealIngredient {
    private String ingredientId;
    private double count;
}
