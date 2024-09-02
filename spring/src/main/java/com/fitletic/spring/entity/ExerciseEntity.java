package com.fitletic.spring.entity;
import lombok.Data;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document("Exercises")
public class ExerciseEntity {
    @Id
    private String id;
    @Indexed
    private String Title;
    private String Type;
}
