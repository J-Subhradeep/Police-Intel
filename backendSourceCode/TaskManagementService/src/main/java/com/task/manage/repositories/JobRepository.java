package com.task.manage.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task.manage.entities.Job;

public interface JobRepository extends JpaRepository<Job, Long>{
	Optional<List<Job>> findByDoneId(long doneId);
	Optional<List<Job>> findBySubmittedById(long submittedById);

}
