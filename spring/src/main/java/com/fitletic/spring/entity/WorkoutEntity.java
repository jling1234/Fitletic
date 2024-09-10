package com.fitletic.spring.Entity;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@Data
@Document("Workouts")
public class WorkoutEntity {
    @Id
     private String id;
    @Indexed
     private String routineName;
     private String exerciseName;
     private String exerciseType;
     private String time;
     private String calorieCount;

}
