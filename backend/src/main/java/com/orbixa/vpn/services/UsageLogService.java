package com.orbixa.vpn.services;

import com.orbixa.vpn.models.UsageLog;
import com.orbixa.vpn.repositories.UsageLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class UsageLogService {
    @Autowired
    private UsageLogRepository usageLogRepository;

    public void logConnectionData(String userId, long bytesDownloaded, long bytesUploaded) {
        UsageLog log = new UsageLog();
        log.setUserId(userId);
        log.setBytesDownloaded(bytesDownloaded);
        log.setBytesUploaded(bytesUploaded);
        log.setTimestamp(Instant.now());
        usageLogRepository.save(log);
    }

    public UsageLog getTotalUsage(String userId) {
        List<UsageLog> logs = usageLogRepository.findByUserId(userId);
        long totalDownloaded = logs.stream().mapToLong(UsageLog::getBytesDownloaded).sum();
        long totalUploaded = logs.stream().mapToLong(UsageLog::getBytesUploaded).sum();

        UsageLog total = new UsageLog();
        total.setUserId(userId);
        total.setBytesDownloaded(totalDownloaded);
        total.setBytesUploaded(totalUploaded);
        return total;
    }
}
