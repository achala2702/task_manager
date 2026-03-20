package com.achala2702.backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String jwtSecret;
    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        if(jwtSecret == null || jwtSecret.isBlank()) {
            throw new RuntimeException("JWT Secret is Empty..!");
        }
        secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateJwt(String username) {
        Date currentDate = new Date();
        Date expirationDate = new Date(currentDate.getTime() + 2 * 60 * 60 *1000);
        return Jwts.builder()
                .subject(username)
                .issuedAt(currentDate)
                .expiration(expirationDate)
                .signWith(secretKey)
                .compact();
    }

    public Claims validateJwt(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public Optional<String> getCurrentUserUsername() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return Optional.ofNullable(auth).map(Authentication::getName);
    }

}
