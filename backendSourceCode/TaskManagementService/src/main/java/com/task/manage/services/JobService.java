package com.task.manage.services;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.task.manage.dtos.JobDto;
import com.task.manage.dtos.TaskDto;
import com.task.manage.entities.Job;
import com.task.manage.entities.Task;
import com.task.manage.payloads.ApiResponse;
import com.task.manage.repositories.JobRepository;
import com.task.manage.repositories.TaskRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class JobService {
	private TaskRepository taskRepo;
	private JobRepository jobRepo;
	
	public ApiResponse addNewJob(JobDto jobDto) {
		Job job = new Job();
		job.setTitle(jobDto.getTitle());
		job.setDescription(jobDto.getDescription());
		job.setDoneId(jobDto.getDoneId());
		job.setSubmittedById(jobDto.getSubmittedById());
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
		job.setSubmitTime(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")).format(formatter)+"+05:30");
		job.setFile(jobDto.getFile());
		job.setPoliceStationId(jobDto.getPoliceStationId());
		System.out.println(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")).format(formatter));
		Job savedJob= jobRepo.save(job);
		
		String message = "Job saved with id: " + job.getId();
		Boolean success  = true;
		return new ApiResponse(message,success);
	}
	
	public JobDto getJobById(long id) {
		Optional<Job> job = jobRepo.findById(id);
		if(job.isPresent()) {
			JobDto jobDto = new JobDto();
			jobDto.setTitle(job.get().getTitle());
			jobDto.setDescription(job.get().getDescription());
			jobDto.setDoneId(job.get().getDoneId());
			jobDto.setSubmittedById(job.get().getSubmittedById());
			jobDto.setSubmitTime(job.get().getSubmitTime());
			jobDto.setFile(job.get().getFile());
			jobDto.setId(id);
			jobDto.setPoliceStationId(job.get().getPoliceStationId());
			return jobDto;
		} else {
			throw new RuntimeException("Invalid job id");
		}
	}
	
	public Optional<List<Job>> getJobsByDoneById(long id){
		Optional<List<Job>> jobs = jobRepo.findByDoneId(id);
		return jobs;
	}
	
	public Optional<List<Job>> getJobsBySubmittedById(long id){
		Optional<List<Job>> jobs = jobRepo.findBySubmittedById(id);
		return jobs;
	}
}
