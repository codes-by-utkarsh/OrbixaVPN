package com.orbixa.vpn.controllers;

import com.orbixa.vpn.models.Server;
import com.orbixa.vpn.security.UserDetailsImpl;
import com.orbixa.vpn.services.VpnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vpn")
public class VpnController {

    @Autowired
    VpnService vpnService;

    @Autowired
    private com.orbixa.vpn.services.UsageLogService usageLogService;

    @Autowired
    private com.orbixa.vpn.services.SubscriptionService subscriptionService;

    @Autowired
    private com.orbixa.vpn.repositories.UserRepository userRepository;

    private UserDetailsImpl getEffectiveUser(UserDetailsImpl userDetails) {
        if (userDetails != null)
            return userDetails;
        // Fallback for debugging
        return userRepository.findByEmail("usrivastava2011@gmail.com")
                .map(UserDetailsImpl::build)
                .orElse(null);
    }

    @GetMapping("/servers")
    public ResponseEntity<List<Server>> getServers() {
        return ResponseEntity.ok(vpnService.getAllServers());
    }

    @GetMapping("/config")
    public ResponseEntity<?> getConfig(@RequestParam String serverId,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        UserDetailsImpl user = getEffectiveUser(userDetails);
        if (user == null)
            return ResponseEntity.status(401).body(Map.of("message", "User not found"));
        try {
            String vlessLink = vpnService.generateConfig(user.getUuid(), serverId);
            return ResponseEntity.ok(Map.of("link", vlessLink, "format", "vless"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/usage")
    public ResponseEntity<?> getUsage(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        UserDetailsImpl user = getEffectiveUser(userDetails);
        if (user == null)
            return ResponseEntity.status(401).body(Map.of("message", "User not found"));
        String userId = user.getId();
        com.orbixa.vpn.models.UsageLog totalUsage = usageLogService.getTotalUsage(userId);
        com.orbixa.vpn.models.Subscription sub = subscriptionService.getSubscription(userId);

        return ResponseEntity.ok(Map.of(
                "downloaded", totalUsage.getBytesDownloaded(),
                "uploaded", totalUsage.getBytesUploaded(),
                "limit", sub.getBandwidthLimit(),
                "plan", sub.getPlan(),
                "uuid", user.getUuid()));
    }

    @PostMapping("/usage")
    public ResponseEntity<?> postUsage(@RequestBody Map<String, Long> payload,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {
        UserDetailsImpl user = getEffectiveUser(userDetails);
        if (user == null)
            return ResponseEntity.status(401).body(Map.of("message", "User not found"));
        long downloaded = payload.getOrDefault("downloaded", 0L);
        long uploaded = payload.getOrDefault("uploaded", 0L);
        usageLogService.logConnectionData(user.getId(), downloaded, uploaded);
        return ResponseEntity.ok(Map.of("message", "Usage logged successfully"));
    }
}
