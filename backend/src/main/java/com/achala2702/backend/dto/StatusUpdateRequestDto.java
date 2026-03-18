package com.achala2702.backend.dto;

import com.achala2702.backend.enums.TaskStatus;
import jakarta.validation.constraints.NotNull;

public record StatusUpdateRequestDto(
        @NotNull(message = "task status is required!")
        TaskStatus status
) {
}
