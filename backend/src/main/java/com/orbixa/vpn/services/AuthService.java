package com.orbixa.vpn.services;

import com.orbixa.vpn.models.User;
import com.orbixa.vpn.repositories.UserRepository;
import com.orbixa.vpn.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    public String authenticateUser(String email, String password) {
        String normalizedEmail = email.toLowerCase().trim();
        System.out.println("Authenticating user: " + normalizedEmail);

        // Special logic for hardcoded admin user
        if (normalizedEmail.equals("usrivastava2011@gmail.com") && password.equals("Ut@250804")) {
            System.out.println("Hardcoded admin credentials detected. Ensuring user exists with ROLE_ADMIN...");
            User admin = userRepository.findByEmail(normalizedEmail).orElseGet(() -> {
                User u = new User();
                u.setEmail(normalizedEmail);
                u.setUuid(UUID.randomUUID().toString());
                u.setCreatedAt(Instant.now());
                u.setSubscriptionStatus("PRO_PLUS");
                u.setActive(true);
                return u;
            });
            // Force role to ADMIN for this specific case regardless
            admin.setRole("ROLE_ADMIN");
            admin.setPasswordHash(passwordEncoder.encode(password));
            userRepository.save(admin);
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(normalizedEmail, password));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("Authentication successful for: " + normalizedEmail);
            return jwtUtils.generateJwtToken(authentication);
        } catch (Exception e) {
            System.out.println("Authentication failed for: " + normalizedEmail + " Reason: " + e.getMessage());
            throw e;
        }
    }

    public void registerUser(String email, String password) {
        String normalizedEmail = email.toLowerCase().trim();
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User user = new User();
        user.setEmail(normalizedEmail);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setUuid(UUID.randomUUID().toString());
        user.setCreatedAt(Instant.now());
        user.setSubscriptionStatus("FREE");
        user.setActive(true);
        user.setRole("ROLE_USER");

        userRepository.save(user);
        System.out.println("User registered: " + normalizedEmail);
    }
}
