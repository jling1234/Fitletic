package com.fitletic.spring.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document("Exercises")
public class Exercise {
    @Id
    private String id;
    @Indexed
    private String title;
    private String desc;
}
