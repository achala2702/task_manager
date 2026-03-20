package com.achala2702.backend.service;

import com.achala2702.backend.dto.UserAuthRequestDto;
import com.achala2702.backend.dto.UserLoginResponseDto;
import com.achala2702.backend.exception.InvalidInputException;
import com.achala2702.backend.exception.UserAlreadyExistsException;
import com.achala2702.backend.exception.UserNotFoundException;
import com.achala2702.backend.model.UserModel;
import com.achala2702.backend.repository.AuthRepository;
import com.achala2702.backend.util.AuthMapper;
import com.achala2702.backend.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthRepository authRepository;
    private final AuthMapper authMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void register(UserAuthRequestDto userAuthRequestDto) {
        if(authRepository.existsByUsername(userAuthRequestDto.username())) {
            throw new UserAlreadyExistsException("Registration failed: username is already associated with an existing account!");
        }

        UserModel user = authMapper.maptoUserModel(userAuthRequestDto);
        authRepository.save(user);
    }

    public UserLoginResponseDto login(UserAuthRequestDto userAuthRequestDto, HttpServletResponse response) {
        UserModel dbUser = authRepository.findByUsername(userAuthRequestDto.username()).orElseThrow(()-> new UserNotFoundException("No account found with the provided username."));

        if(!passwordEncoder.matches(userAuthRequestDto.password(), dbUser.getPassword())){
            throw new InvalidInputException("Provided Password is Incorrect");
        }

        String token = jwtUtil.generateJwt(dbUser.getUsername());
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofHours(2))
                .sameSite("Lax")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return new UserLoginResponseDto(dbUser.getUsername());
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", null)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }
}
