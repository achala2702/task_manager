package com.achala2702.backend.util;

import com.achala2702.backend.dto.TaskRequestDto;
import com.achala2702.backend.dto.TaskResponseDto;
import com.achala2702.backend.model.TaskModel;
import com.achala2702.backend.model.UserModel;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public TaskModel maptoTaskModel(TaskRequestDto createTaskRequest, UserModel userModel) {
        return TaskModel.builder()
                .title(createTaskRequest.title())
                .description(createTaskRequest.description())
                .user(userModel)
                .build();
    }

    public TaskResponseDto maptoTaskDto(TaskModel task) {
        return TaskResponseDto.builder()
                .taskId(task.getTaskId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .createdAt(task.getCreatedAt())
                .build();
    }
}
