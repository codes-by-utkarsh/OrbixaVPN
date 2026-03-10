package com.orbixa.vpn.repositories;

import com.orbixa.vpn.models.UsageLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface UsageLogRepository extends MongoRepository<UsageLog, String> {
    List<UsageLog> findByUserId(String userId);
}
