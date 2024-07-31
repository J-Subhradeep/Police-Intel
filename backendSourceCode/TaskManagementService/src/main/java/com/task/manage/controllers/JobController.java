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

import com.task.manage.dtos.JobDto;
import com.task.manage.dtos.TaskDto;
import com.task.manage.entities.Job;
import com.task.manage.entities.Task;
import com.task.manage.payloads.ApiResponse;
import com.task.manage.services.JobService;
import com.task.manage.services.TaskService;

import lombok.AllArgsConstructor;

@RequestMapping("/task/manage/job")
@RestController
@AllArgsConstructor
public class JobController {
	private JobService jobService;
	
	@PostMapping("/add-job")
	public ResponseEntity<ApiResponse> createJob(@RequestBody JobDto jobDto) {
		ApiResponse response = jobService.addNewJob(jobDto);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/get-job")
	public JobDto getJobById(@RequestParam long id) {
		JobDto job = jobService.getJobById(id);
		return job;
	}
	
	@GetMapping("/get-jobs-by-done-by")
	public Optional<List<Job>> getJobsByDoneById(@RequestParam long id) {
		Optional<List<Job>> jobs = jobService.getJobsByDoneById(id);
		return jobs;
	}
	
	@GetMapping("/get-jobs-by-submitted-by")
	public Optional<List<Job>> getJobsBySubmittedById(@RequestParam long id) {
		Optional<List<Job>> jobs = jobService.getJobsBySubmittedById(id);
		return jobs;
	}
	
	@GetMapping("/get")
	public String temp() {
		return "Test Successful";
	}
	
	
}
