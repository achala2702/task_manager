package com.achala2702.backend.util;

import com.achala2702.backend.dto.UserAuthRequestDto;
import com.achala2702.backend.model.UserModel;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthMapper {

    private final PasswordEncoder passwordEncoder;

    public UserModel maptoUserModel(UserAuthRequestDto userAuthRequestDto) {
        return UserModel.builder()
                .username(userAuthRequestDto.username())
                .password(passwordEncoder.encode(userAuthRequestDto.password()))
                .build();
    }
}
