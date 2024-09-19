package com.fitletic.spring.Entity.Workouts;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Document("LoggedWorkouts")
public class LoggedWorkout {
    @Id
    private String id;
    @Indexed
    private LocalDateTime date;
    private String workoutId;
    private String userId;
}
