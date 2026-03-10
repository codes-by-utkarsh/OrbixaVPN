package com.orbixa.vpn.repositories;

import com.orbixa.vpn.models.Server;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ServerRepository extends MongoRepository<Server, String> {
}
