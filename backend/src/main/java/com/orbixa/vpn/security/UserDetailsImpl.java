package com.orbixa.vpn.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.orbixa.vpn.models.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class UserDetailsImpl implements UserDetails {
    private String id;
    private String email;
    private String uuid;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(String id, String email, String uuid, String password,
            Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.uuid = uuid;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(User user) {
        String role = user.getRole();
        if (role == null || role.isEmpty()) {
            role = "ROLE_USER";
        }
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));

        return new UserDetailsImpl(
                user.getId(),
                user.getEmail(),
                user.getUuid(),
                user.getPasswordHash(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public String getId() {
        return id;
    }

    public String getUuid() {
        return uuid;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
