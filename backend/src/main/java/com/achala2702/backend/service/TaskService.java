package com.achala2702.backend.service;

import com.achala2702.backend.dto.StatusUpdateRequestDto;
import com.achala2702.backend.dto.TaskRequestDto;
import com.achala2702.backend.dto.TaskResponseDto;
import com.achala2702.backend.exception.TaskNotFoundException;
import com.achala2702.backend.model.TaskModel;
import com.achala2702.backend.repository.TaskRepository;
import com.achala2702.backend.util.TaskMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public String createTask(TaskRequestDto createTaskRequest) {

        TaskModel task = taskMapper.maptoTaskModel(createTaskRequest);
        taskRepository.save(task);

        return "task created successfully!";
    }

    public String updateTask(Long taskId, TaskRequestDto taskRequest) {

        TaskModel task = taskRepository.findById(taskId).orElseThrow(()-> new TaskNotFoundException("Task not found with ID: " + taskId));

        task.setTitle(taskRequest.title());
        task.setDescription(taskRequest.description());

        taskRepository.save(task);

        return "task updated successfully!";
    }

    public void updateTaskStatus(Long taskId, StatusUpdateRequestDto statusDto) {

        TaskModel task = taskRepository.findById(taskId).orElseThrow(()-> new TaskNotFoundException("Task not found with ID: " + taskId));

        task.setStatus(statusDto.status());
        taskRepository.save(task);
    }

    public List<TaskResponseDto> getAllTasks() {
        return taskRepository.findAll()
                .stream().map(taskMapper::maptoTaskDto).toList();
    }

    public TaskResponseDto getTaskById(Long taskId) {

        TaskModel task = taskRepository.findById(taskId).orElseThrow(()-> new TaskNotFoundException("Task not found with ID: " + taskId));

        return taskMapper.maptoTaskDto(task);
    }

    public String deleteTask(Long taskId) {

        TaskModel task = taskRepository.findById(taskId).orElseThrow(()-> new TaskNotFoundException("Task not found with ID: " + taskId));

        taskRepository.delete(task);

        return "Task deleted successfully!";
    }
}
