package com.task.manage.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.task.manage.dtos.TaskDto;
import com.task.manage.entities.Task;
import com.task.manage.payloads.ApiResponse;
import com.task.manage.services.TaskService;

import lombok.AllArgsConstructor;

@RequestMapping("/task/manage")
@RestController
@AllArgsConstructor
public class TaskController {
	private TaskService taskService; 
	
	@PostMapping("/add-task")
	public ResponseEntity<ApiResponse> createTask(@RequestBody TaskDto taskDto) {
		ApiResponse response = taskService.addNewTask(taskDto);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/get-task")
	public TaskDto getTaskById(@RequestParam long id) {
		TaskDto task = taskService.getTaskById(id);
		return task;
	}
	
	@GetMapping("/get-tasks-by-assigned-by")
	public Optional<List<Task>> getTasksByAssignedById(@RequestParam long id) {
		Optional<List<Task>> tasks = taskService.getTasksByAssignedById(id);
		return tasks;
	}
	
	@GetMapping("/get-tasks-by-assigned-to")
	public Optional<List<Task>> getTasksByAssignedToId(@RequestParam long id) {
		Optional<List<Task>> tasks = taskService.getTasksByAssignedToId(id);
		return tasks;
	}
	
	@GetMapping("/get")
	public String temp() {
		return "Test Successful";
	}
	
	
}
