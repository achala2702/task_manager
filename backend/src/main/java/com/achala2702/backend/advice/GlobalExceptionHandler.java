package com.achala2702.backend.advice;

import com.achala2702.backend.dto.ErrorResponseDto;
import com.achala2702.backend.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    //handle access denied exception
    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ErrorResponseDto> handleAccessDeniedException(AccessDeniedException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponseDto.builder()
                        .status(HttpStatus.UNAUTHORIZED)
                        .timeStamp(LocalDateTime.now())
                        .errors(e.getMessage())
                        .build());
    }

    //handle invalid input exception
    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<ErrorResponseDto> handleInvalidInputException(InvalidInputException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponseDto.builder()
                        .status(HttpStatus.BAD_REQUEST)
                        .timeStamp(LocalDateTime.now())
                        .errors(e.getMessage())
                        .build());
    }

    //handle user-not-found exception
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleUserNotFoundException(UserNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorResponseDto.builder()
                        .status(HttpStatus.NOT_FOUND)
                        .timeStamp(LocalDateTime.now())
                        .errors(e.getMessage())
                        .build());
    }

    //handle user-already-exists exception
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDto> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ErrorResponseDto.builder()
                        .status(HttpStatus.CONFLICT)
                        .timeStamp(LocalDateTime.now())
                        .errors(e.getMessage())
                        .build());
    }

    //exception handler for task not found exception
    @ExceptionHandler(TaskNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleTaskNotFoundException(TaskNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ErrorResponseDto.builder()
                        .status(HttpStatus.NOT_FOUND)
                        .errors(e.getMessage())
                        .timeStamp(LocalDateTime.now())
                        .build());
    }

    //exception handler for all the unhandled exceptions
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponseDto> handleUnhandledException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ErrorResponseDto.builder()
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .timeStamp(LocalDateTime.now())
                        .errors(e.getMessage())
                        .build());
    }
}
