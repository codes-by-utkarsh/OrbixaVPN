package com.orbixa.vpn.repositories;

import com.orbixa.vpn.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    @Query("{ 'email' : { $regex: '^?0$', $options: 'i' } }")
    Optional<User> findByEmail(String email);

    @Query(value = "{ 'email' : { $regex: '^?0$', $options: 'i' } }", exists = true)
    boolean existsByEmail(String email);
}
