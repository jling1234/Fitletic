package com.fitletic.spring.Entity.Workouts;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Document("Workouts")
public class Workout {
    @Id
    private String id;
    @Indexed
    private String userId;
    private String workoutName;
}
