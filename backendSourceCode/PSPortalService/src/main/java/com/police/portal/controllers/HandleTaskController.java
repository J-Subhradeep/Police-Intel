package com.police.portal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.police.portal.dtos.JobDto;
import com.police.portal.dtos.TaskDto;
import com.police.portal.dtos.TaskUpdateDto;
import com.police.portal.payload.ApiResponse;
import com.police.portal.services.HandleTaskServiceImpl;

@RestController
@RequestMapping("/police-admin/task")
public class HandleTaskController {

	@Autowired
	private HandleTaskServiceImpl taskServiceImpl;
	
//	private HandleTaskServiceImpl jobServiceImpl;
	
	@PostMapping("/add-task")
	ResponseEntity<ApiResponse> addTask(@RequestBody TaskDto task){
		return taskServiceImpl.addTask(task);
	}

	@PostMapping("/add-job")
	ResponseEntity<ApiResponse> addJob(@RequestBody JobDto job){
		return taskServiceImpl.addJob(job);
	}
	
	@PostMapping("/add-task-update")
	ResponseEntity<ApiResponse> addTaskUpdate(@RequestBody TaskUpdateDto taskUpdate){
		return taskServiceImpl.addTaskUpdate(taskUpdate);
	}
}
