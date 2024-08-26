package com.fitletic.spring.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document("Workout")
public class Workout {
    @Id
    private int id;
    @Indexed
    private String username;
    private String routine;
    private List<String> exercises;
}
