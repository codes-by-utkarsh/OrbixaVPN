package com.orbixa.vpn.services;

import com.orbixa.vpn.models.Subscription;
import com.orbixa.vpn.repositories.SubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;

@Service
public class SubscriptionService {
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    public Subscription getSubscription(String userId) {
        Optional<Subscription> sub = subscriptionRepository.findByUserId(userId);
        if (sub.isPresent()) {
            return sub.get();
        }

        // Auto-create a free subscription for the user if none exists
        Subscription freeSub = new Subscription();
        freeSub.setUserId(userId);
        freeSub.setPlan("FREE");
        freeSub.setBandwidthLimit(5L * 1024 * 1024 * 1024); // 5 GB
        freeSub.setStartDate(Instant.now());
        freeSub.setExpiryDate(Instant.now().plus(30, ChronoUnit.DAYS));
        return subscriptionRepository.save(freeSub);
    }
}
