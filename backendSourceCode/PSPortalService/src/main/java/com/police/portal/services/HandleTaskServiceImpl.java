package com.police.portal.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.police.portal.dtos.JobDto;
import com.police.portal.dtos.TaskDto;
import com.police.portal.dtos.TaskUpdateDto;
import com.police.portal.external.services.TaskService;
import com.police.portal.payload.ApiResponse;

@Service
public class HandleTaskServiceImpl {
	
	@Autowired
	private TaskService taskService;
	
	public ResponseEntity<ApiResponse> addJob(JobDto job){
		ResponseEntity<ApiResponse> response = taskService.addJob(job);
		return response;
	}
	
	public ResponseEntity<ApiResponse> addTask(TaskDto task){
		return taskService.addTask(task);
	}
	
	public ResponseEntity<ApiResponse> addTaskUpdate(TaskUpdateDto taskUpdate){
		return taskService.addTaskUpdate(taskUpdate);
	}

}
