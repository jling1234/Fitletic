package com.fitletic.spring.Response.Meals;

import com.fitletic.spring.Entity.Meals.LoggedMeal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoggedMealResponse {
    private String id;
    private MealResponse meal;
    private long loggedAtEpochSecond;
}
