package com.achala2702.backend.repository;

import com.achala2702.backend.model.TaskModel;
import com.achala2702.backend.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<TaskModel, Long> {
    List<TaskModel> findAllByUserOrderByCreatedAtDesc(UserModel user);
}
