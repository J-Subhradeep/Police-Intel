package com.task.manage.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.task.manage.entities.Task;


public interface TaskRepository extends JpaRepository<Task, Long>{
	Optional<List<Task>> findByAssignedById(long assignedById);
	Optional<List<Task>> findByAssignedToId(long assignedToId);

}
