package com.orbixa.vpn.security;

import com.orbixa.vpn.models.User;
import com.orbixa.vpn.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        String normalizedEmail = email.toLowerCase().trim();
        System.out.println("Processing UserDetailsService for: " + normalizedEmail);
        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> {
                    System.out.println("User not found in database: " + normalizedEmail);
                    return new UsernameNotFoundException("User Not Found with email: " + normalizedEmail);
                });

        System.out.println("User found. ID: " + user.getId() + ", Email: " + user.getEmail() + ", Hash: "
                + user.getPasswordHash());
        return UserDetailsImpl.build(user);
    }
}
