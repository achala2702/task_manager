package com.achala2702.backend.service;

import com.achala2702.backend.dto.StatusUpdateRequestDto;
import com.achala2702.backend.dto.TaskRequestDto;
import com.achala2702.backend.dto.TaskResponseDto;
import com.achala2702.backend.exception.AccessDeniedException;
import com.achala2702.backend.exception.TaskNotFoundException;
import com.achala2702.backend.exception.UserNotFoundException;
import com.achala2702.backend.exception.UserNotLogedIn;
import com.achala2702.backend.model.TaskModel;
import com.achala2702.backend.model.UserModel;
import com.achala2702.backend.repository.AuthRepository;
import com.achala2702.backend.repository.TaskRepository;
import com.achala2702.backend.util.JwtUtil;
import com.achala2702.backend.util.TaskMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final JwtUtil jwtUtil;
    private final AuthRepository authRepository;

    public TaskResponseDto createTask(TaskRequestDto createTaskRequest) {

        UserModel user = getUserIdFromToken();

        TaskModel task = taskMapper.maptoTaskModel(createTaskRequest, user);
        TaskModel savedTask = taskRepository.save(task);

        return taskMapper.maptoTaskDto(savedTask);
    }

    public TaskResponseDto updateTask(Long taskId, TaskRequestDto taskRequest) {

        TaskModel task = taskRepository.findById(taskId).orElseThrow(()-> new TaskNotFoundException("Task not found with ID: " + taskId));
        UserModel user = getUserIdFromToken();

        if(!Objects.equals(task.getUser().getUserId(), user.getUserId())) {
            throw new AccessDeniedException("You do not have access to perform this operation!");
        }

        task.setTitle(taskRequest.title());
        task.setDescription(taskRequest.description());

        TaskModel updatedTask = taskRepository.save(task);

        return taskMapper.maptoTaskDto(updatedTask);
    }

    public void updateTaskStatus(Long taskId, StatusUpdateRequestDto statusDto) {

        TaskModel task = taskRepository.findById(taskId).orElseThrow(()-> new TaskNotFoundException("Task not found with ID: " + taskId));
        UserModel user = getUserIdFromToken();

        if(!Objects.equals(task.getUser().getUserId(), user.getUserId())) {
            throw new AccessDeniedException("You do not have access to perform this operation!");
        }

        task.setStatus(statusDto.status());
        taskRepository.save(task);
    }

    public List<TaskResponseDto> getAllTasks() {
        UserModel user = getUserIdFromToken();

        return taskRepository.findAllByUserOrderByCreatedAtDesc(user)
                .stream().map(taskMapper::maptoTaskDto).toList();
    }

    public TaskResponseDto getTaskById(Long taskId) {

        TaskModel task = taskRepository.findById(taskId).orElseThrow(()-> new TaskNotFoundException("Task not found with ID: " + taskId));
        UserModel user = getUserIdFromToken();

        if(!Objects.equals(task.getUser().getUserId(), user.getUserId())) {
            throw new AccessDeniedException("You do not have access to perform this operation!");
        }

        return taskMapper.maptoTaskDto(task);
    }

    public void deleteTask(Long taskId) {

        TaskModel task = taskRepository.findById(taskId).orElseThrow(()-> new TaskNotFoundException("Task not found with ID: " + taskId));
        UserModel user = getUserIdFromToken();

        if(!Objects.equals(task.getUser().getUserId(), user.getUserId())) {
            throw new AccessDeniedException("You do not have access to perform this operation!");
        }

        taskRepository.delete(task);
    }

    private UserModel getUserIdFromToken() {
        String username = jwtUtil.getCurrentUserUsername().orElseThrow(()-> new UserNotLogedIn("please login!"));
        return authRepository.findByUsername(username).orElseThrow(()-> new UserNotFoundException("No account found with the provided username."));
    }
}
