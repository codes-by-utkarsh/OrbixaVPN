package com.orbixa.vpn.services;

import com.orbixa.vpn.models.Server;
import com.orbixa.vpn.repositories.ServerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VpnService {
    @Autowired
    SshService sshService;

    @Autowired
    ServerRepository serverRepository;

    public List<Server> getAllServers() {
        return serverRepository.findAll();
    }

    public String generateConfig(String userUuid, String serverId) {
        Server server = serverRepository.findById(serverId)
                .orElseThrow(() -> new RuntimeException("Server not found"));

        // Automate user sync: SSH into node and add UUID if not already there
        String command = String.format("sudo /usr/local/bin/add_user.sh %s", userUuid);
        // Run in a new thread or asynchronously to not block the request
        new Thread(() -> {
            sshService.executeCommand(server.getDomain(), command);
        }).start();

        return String.format("vless://%s@%s:%d?type=ws&security=tls&path=/orbixa#%s",
                userUuid, server.getDomain(), server.getPort(), server.getName());
    }
}
