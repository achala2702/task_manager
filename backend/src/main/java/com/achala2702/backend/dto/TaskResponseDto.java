package com.achala2702.backend.dto;

import com.achala2702.backend.enums.TaskStatus;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record TaskResponseDto(
        Long taskId,
        String title,
        String Description,
        TaskStatus status,
        LocalDateTime createdAt
) {
}
