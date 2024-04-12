package com.police.portal.external.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.police.portal.dtos.JobDto;
import com.police.portal.dtos.TaskDto;
import com.police.portal.dtos.TaskUpdateDto;
import com.police.portal.payload.ApiResponse;

@FeignClient(name = "TASK-MANAGEMENT-SERVICE")
public interface TaskService {
	
	@PostMapping("/task/manage/add-task")
	ResponseEntity<ApiResponse> addTask(@RequestBody TaskDto taskDto);
	
	@PostMapping("/task/manage/job/add-job")
	ResponseEntity<ApiResponse> addJob(@RequestBody JobDto job);
	
	@PostMapping("/task/manage/task-update/add-update")
	ResponseEntity<ApiResponse> addTaskUpdate(@RequestBody TaskUpdateDto taskUpdate);
}