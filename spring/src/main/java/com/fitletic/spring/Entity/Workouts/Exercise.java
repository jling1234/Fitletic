package com.fitletic.spring.Entity.Workouts;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Document("Exercises")
public class Exercise {
    @Id
    private String id;
    @Indexed
    private String title;
    private String type;
}
