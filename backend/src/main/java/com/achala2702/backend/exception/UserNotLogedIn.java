package com.achala2702.backend.exception;

public class UserNotLogedIn extends RuntimeException {
    public UserNotLogedIn(String message) {
        super(message);
    }
}
