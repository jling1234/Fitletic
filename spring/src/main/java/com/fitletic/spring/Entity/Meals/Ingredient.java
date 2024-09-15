package com.fitletic.spring.Entity.Meals;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document("Ingredients")
public class Ingredient {
    @Id
    private String id;
    private String description;
    private FoodCategory foodCategory;
    private Nutrient[] nutrients;
}
