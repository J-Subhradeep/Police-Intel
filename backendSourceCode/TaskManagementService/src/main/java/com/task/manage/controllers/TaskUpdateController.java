package com.task.manage.controllers;

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
import com.task.manage.dtos.TaskUpdateDto;
import com.task.manage.entities.Task;
import com.task.manage.payloads.ApiResponse;
import com.task.manage.services.TaskService;
import com.task.manage.services.TaskUpdateService;

import lombok.AllArgsConstructor;

@RequestMapping("/task/manage/task-update")
@RestController
@AllArgsConstructor
public class TaskUpdateController {
	private TaskService taskService; 
	private TaskUpdateService taskUpdateService;
	
	@PostMapping("/add-update")
	public ResponseEntity<ApiResponse> createTaskUpdate(@RequestBody TaskUpdateDto taskUpdateDto) {
		ApiResponse response = taskUpdateService.addNewTaskUpdate(taskUpdateDto);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/get-update")
	public Optional<TaskUpdateDto> getTaskUpdateByTaskId(@RequestParam long id) {
		Optional<TaskUpdateDto> task = taskUpdateService.getTaskUpdateByTaskId(id);
		return task;
	}

//	@GetMapping("/get")
//	public String temp() {
//		return "Test Successful";
//	}
}
