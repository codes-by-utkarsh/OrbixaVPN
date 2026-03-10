package com.orbixa.vpn.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "connections")
public class Connection {
    @Id
    private String id;
    private String userId;
    private String serverId;
    private Instant connectedAt;
    private Instant disconnectedAt;
    private String assignedIp;

    // Getters and Setters...
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getServerId() {
        return serverId;
    }

    public void setServerId(String serverId) {
        this.serverId = serverId;
    }

    public Instant getConnectedAt() {
        return connectedAt;
    }

    public void setConnectedAt(Instant connectedAt) {
        this.connectedAt = connectedAt;
    }

    public Instant getDisconnectedAt() {
        return disconnectedAt;
    }

    public void setDisconnectedAt(Instant disconnectedAt) {
        this.disconnectedAt = disconnectedAt;
    }

    public String getAssignedIp() {
        return assignedIp;
    }

    public void setAssignedIp(String assignedIp) {
        this.assignedIp = assignedIp;
    }
}
