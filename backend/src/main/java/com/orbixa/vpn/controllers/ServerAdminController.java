package com.orbixa.vpn.controllers;

import com.orbixa.vpn.models.Server;
import com.orbixa.vpn.models.User;
import com.orbixa.vpn.repositories.ServerRepository;
import com.orbixa.vpn.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class ServerAdminController {

    @Autowired
    ServerRepository serverRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/servers")
    public ResponseEntity<List<Server>> getAllServers() {
        return ResponseEntity.ok(serverRepository.findAll());
    }

    @PostMapping("/server/add")
    public ResponseEntity<?> addServer(@RequestBody Server server) {
        if (server.getStatus() == null) {
            server.setStatus("online");
        }
        serverRepository.save(server);
        return ResponseEntity.ok(Map.of("message", "Server added successfully", "serverId", server.getId()));
    }

    @PostMapping("/server/remove")
    public ResponseEntity<?> removeServer(@RequestBody Map<String, String> payload) {
        String id = payload.get("id");
        if (id != null) {
            serverRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Server removed"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "Server ID missing"));
    }

    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        List<Map<String, Object>> userDtos = userRepository.findAll().stream().map(user -> {
            Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", user.getId());
            map.put("email", user.getEmail());
            map.put("active", user.isActive());
            map.put("plan", user.getSubscriptionStatus());
            return map;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(userDtos);
    }
}
