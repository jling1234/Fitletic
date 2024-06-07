package com.fitletic.spring.entity;

import lombok.Data;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document("Users")

public class UserAuthentication {
    @Id
    private  String id;
    @Indexed
    private  String username;
    private  String password;
    private  boolean active;

}
