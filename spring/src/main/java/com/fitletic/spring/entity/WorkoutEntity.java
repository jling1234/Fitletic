package com.fitletic.spring.entity;
import lombok.Data;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document("Workout")
public class WorkoutEntity {
    @Id
    private int id;
    @Indexed
    private String title;
    private String type;
}
