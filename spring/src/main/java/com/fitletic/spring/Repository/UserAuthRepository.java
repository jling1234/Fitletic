package com.fitletic.spring.Repository;

import com.fitletic.spring.entity.UserAuthentication;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAuthRepository extends MongoRepository<UserAuthentication,String> {
    Optional<UserAuthentication> findByUsername(String username);
}