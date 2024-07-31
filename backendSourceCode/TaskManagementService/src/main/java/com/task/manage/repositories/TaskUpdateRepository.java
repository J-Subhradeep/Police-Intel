package com.task.manage.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task.manage.entities.TaskUpdate;


public interface TaskUpdateRepository extends JpaRepository<TaskUpdate, Long>{
	Optional<TaskUpdate> findByTaskId(long taskId);
}
