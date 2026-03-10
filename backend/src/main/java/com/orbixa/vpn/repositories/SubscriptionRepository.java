package com.orbixa.vpn.repositories;

import com.orbixa.vpn.models.Subscription;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface SubscriptionRepository extends MongoRepository<Subscription, String> {
    Optional<Subscription> findByUserId(String userId);
}
