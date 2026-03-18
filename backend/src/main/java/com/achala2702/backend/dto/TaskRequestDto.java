package com.achala2702.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record TaskRequestDto(
        @NotBlank(message = "Title cannot be empty")
        String title,
        String description
) {
}
