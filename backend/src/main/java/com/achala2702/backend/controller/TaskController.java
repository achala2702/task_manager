package com.achala2702.backend.controller;

import com.achala2702.backend.dto.StatusUpdateRequestDto;
import com.achala2702.backend.dto.TaskRequestDto;
import com.achala2702.backend.dto.TaskResponseDto;
import com.achala2702.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<String> createTask(@Valid @RequestBody TaskRequestDto taskRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(taskRequest));
    }

    @PatchMapping("/{taskId}")
    public ResponseEntity<String> updateTask(@PathVariable Long taskId, @Valid @RequestBody TaskRequestDto taskRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(taskService.updateTask(taskId, taskRequest));
    }

    @PatchMapping("/{taskId}/status")
    public ResponseEntity<Void> updateTaskStatus(@PathVariable Long taskId, @Valid @RequestBody StatusUpdateRequestDto status) {
        taskService.updateTaskStatus(taskId, status);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDto>> getAllTasks() {
        return ResponseEntity.status(HttpStatus.OK).body(taskService.getAllTasks());
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskResponseDto> getTaskById(@PathVariable Long taskId) {
        return ResponseEntity.status(HttpStatus.OK).body(taskService.getTaskById(taskId));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Long taskId) {
        return ResponseEntity.status(HttpStatus.OK).body( taskService.deleteTask(taskId));
    }
}
