package com.fitletic.spring.Entity.Meals;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Document("Meals")
public class Meal {
    @Id
    private String id;
    private String userId;
    private String name;
    private MealIngredient[] ingredients;
    private double servings;
}
