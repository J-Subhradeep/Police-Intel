package com.task.manage.services;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.task.manage.dtos.TaskDto;
import com.task.manage.dtos.TaskUpdateDto;
import com.task.manage.entities.Task;
import com.task.manage.entities.TaskUpdate;
import com.task.manage.payloads.ApiResponse;
import com.task.manage.repositories.TaskRepository;
import com.task.manage.repositories.TaskUpdateRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class TaskUpdateService {
	private TaskRepository taskRepo;
	private TaskUpdateRepository taskUpdtaeRepo;
	
	public ApiResponse addNewTaskUpdate(TaskUpdateDto taskUpdateDto) {
		Optional<Task> task = taskRepo.findById(taskUpdateDto.getTaskId());
		if(task.isPresent()) {
			Task taskObject  = task.get();
			String deadlineString = taskObject.getDeadline();
			ZonedDateTime deadline  = ZonedDateTime.parse(deadlineString);
			ZonedDateTime currentTime = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
//			System.out.println(deadline);
//			System.out.println(currentTime);
//			System.out.println(deadline.isAfter(currentTime));
			if(task.get().getIsDone()) {
				throw new RuntimeException("Task is alredy done");
			} else if(deadline.isAfter(currentTime)) {
				TaskUpdate taskUpdate = new TaskUpdate();
				taskUpdate.setTitle(taskUpdateDto.getTitle());
				taskUpdate.setTaskId(taskUpdateDto.getTaskId());
				taskUpdate.setDescription(taskUpdateDto.getDescription());
				taskUpdate.setFile(taskUpdateDto.getFile());
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
				taskUpdate.setSubmitTime(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")).format(formatter)+"+05:30");
				
				Task updatedTask = task.get();
				updatedTask.setIsDone(true);
				taskRepo.save(updatedTask);
				
				TaskUpdate savedTaskUpdate = taskUpdtaeRepo.save(taskUpdate);
			
				
				String message = "";
				message = "Task update for task id: " + taskUpdateDto.getTaskId() + " saved with id: " + savedTaskUpdate.getId();
				Boolean success  = true;
				return new ApiResponse(message,success);
			}
			else {
				throw new RuntimeException("Deadline Missed !!!");
			}
		}else {
			throw new RuntimeException("Invalid Task");
		}
	}
	
	public Optional<TaskUpdateDto> getTaskUpdateByTaskId(long id) {
		Optional<TaskUpdate> taskUpdate = taskUpdtaeRepo.findByTaskId(id);
		if(taskUpdate.isPresent()) {
			TaskUpdateDto taskUpdateDto = new TaskUpdateDto();
			taskUpdateDto.setTitle(taskUpdate.get().getTitle());
			taskUpdateDto.setDescription(taskUpdate.get().getDescription());
			return Optional.of(taskUpdateDto);
		}
		else {
			throw new RuntimeException("Task is not done");
		}
	}
}
