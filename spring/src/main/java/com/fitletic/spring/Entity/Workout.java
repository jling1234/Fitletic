package com.fitletic.spring.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Workouts")
public class Workout {
    @Id
    private String id;
    @Indexed
    private String username;
    private String routine;
    private int calories;
    private List<String> exercises;

}
