package com.achala2702.backend.controller;

import com.achala2702.backend.dto.UserAuthRequestDto;
import com.achala2702.backend.dto.UserLoginResponseDto;
import com.achala2702.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@Valid @RequestBody UserAuthRequestDto userAuthRequestDto) {
        authService.register(userAuthRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponseDto> login(@Valid @RequestBody UserAuthRequestDto userAuthRequestDto, HttpServletResponse response) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.login(userAuthRequestDto, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response){
        authService.logout(request, response);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
