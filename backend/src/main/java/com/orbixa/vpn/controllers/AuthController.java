package com.orbixa.vpn.controllers;

import com.orbixa.vpn.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> creds) {
        try {
            authService.registerUser(creds.get("email"), creds.get("password"));
            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        try {
            String jwt = authService.authenticateUser(creds.get("email"), creds.get("password"));
            return ResponseEntity.ok(Map.of("message", "Login successful", "token", jwt));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(Map.of("message", "Login failed: " + e.getMessage()));
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> profile(org.springframework.security.core.Authentication authentication) {
        com.orbixa.vpn.security.UserDetailsImpl userDetails = (com.orbixa.vpn.security.UserDetailsImpl) authentication
                .getPrincipal();
        return ResponseEntity.ok(Map.of(
                "email", userDetails.getUsername(),
                "uuid", userDetails.getUuid(),
                "id", userDetails.getId()));
    }
}
