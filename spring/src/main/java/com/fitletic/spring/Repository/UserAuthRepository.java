package com.fitletic.spring.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fitletic.spring.Entity.UserAuthentication;

import java.util.Optional;

@Repository
public interface UserAuthRepository extends MongoRepository<UserAuthentication,String> {
    Optional<UserAuthentication> findByUsername(String username);
}