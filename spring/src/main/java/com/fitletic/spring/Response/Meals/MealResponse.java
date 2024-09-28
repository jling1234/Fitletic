package com.fitletic.spring.Response.Meals;

import com.fitletic.spring.Entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MealResponse {
    private String id;
    private String userId;
    private String name;
    private MealIngredientResponse[] ingredients;
    private double servings;
}
