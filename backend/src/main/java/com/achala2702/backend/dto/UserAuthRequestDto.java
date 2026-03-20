package com.achala2702.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record UserAuthRequestDto(
        @NotBlank(message = "username is required!")
        String username,
        @NotBlank(message = "password is required!")
        String password
) {
}
