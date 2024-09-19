package com.fitletic.spring.Entity.Workouts;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoggedWorkoutResponse {
    @Id
    private String id;
    private String workoutId;
    private int calories;
    private LocalDateTime date;
}
