package com.achala2702.backend.repository;

import com.achala2702.backend.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthRepository extends JpaRepository<UserModel, Long> {

    boolean existsByUsername(String username);

    Optional<UserModel> findByUsername(String username);
}
