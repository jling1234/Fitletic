package com.fitletic.spring.Repository;

import com.fitletic.spring.Entity.Role;
import com.fitletic.spring.Entity.RoleEnum;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(RoleEnum name);
}