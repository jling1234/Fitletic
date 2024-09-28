package com.fitletic.spring.Entity.Meals;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Document("LoggedMeals")
public class LoggedMeal {
    @Id
    private String id;
    private String mealId;
    private long loggedAtEpochSecond;
}
