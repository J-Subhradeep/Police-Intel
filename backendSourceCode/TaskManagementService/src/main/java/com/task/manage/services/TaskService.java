package com.task.manage.services;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.task.manage.dtos.TaskDto;
import com.task.manage.entities.Task;
import com.task.manage.payloads.ApiResponse;
import com.task.manage.repositories.TaskRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class TaskService {
	private TaskRepository taskRepo;
	
	
	
	public ApiResponse addNewTask(TaskDto taskDto) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
		Task task = new Task();
		task.setTitle(taskDto.getTitle());
		task.setDescription(taskDto.getDescription());
		task.setAssignedById(taskDto.getAssignedById());
		task.setAssignedToId(taskDto.getAssignedToId());
		
		Integer deadlineDays = taskDto.getDeadline();
		task.setDeadline(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")).plusDays(deadlineDays).format(formatter)+"+05:30");
		
//		task.setDeadline(taskDto.getDeadline());
		task.setFile(taskDto.getFile());
		
		
		task.setAssignedTime(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")).format(formatter)+"+05:30");
		task.setIsDone(false);
		task.setPoliceStationId(taskDto.getPoliceStationId());
		Task savedTask = taskRepo.save(task);
		
		String message = "Task saved with id: " + savedTask.getId();
		Boolean success  = true;
		return new ApiResponse(message,success);
	}
	
	public Task getTaskById(long id) {
		Optional<Task> task = taskRepo.findById(id);
		if(task.isPresent()) {
			return task.get();
		} else {
			throw new RuntimeException("Invalid task");
		}
	}
	
	public Optional<List<Task>> getTasksByAssignedById(long id){
		Optional<List<Task>> tasks = taskRepo.findByAssignedById(id);
		return tasks;
	}
	
	public Optional<List<Task>> getTasksByAssignedToId(long id){
		Optional<List<Task>> tasks = taskRepo.findByAssignedToId(id);
		return tasks;
	}
}
