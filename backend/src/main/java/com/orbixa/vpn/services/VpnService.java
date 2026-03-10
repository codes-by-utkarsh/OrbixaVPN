package com.orbixa.vpn.services;

import com.orbixa.vpn.models.Server;
import com.orbixa.vpn.repositories.ServerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VpnService {
    @Autowired
    ServerRepository serverRepository;

    public List<Server> getAllServers() {
        return serverRepository.findAll();
    }

    public String generateConfig(String userUuid, String serverId) {
        Server server = serverRepository.findById(serverId)
                .orElseThrow(() -> new RuntimeException("Server not found"));

        return String.format("vless://%s@%s:%d?type=ws&security=tls&path=/orbixa#%s",
                userUuid, server.getDomain(), server.getPort(), server.getName());
    }
}
