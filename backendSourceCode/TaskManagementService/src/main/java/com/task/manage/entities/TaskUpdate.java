
package com.task.manage.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="taskUpdate")
@Data
public class TaskUpdate {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long taskId;
	private String title;
	private String description;
	private String submitTime;
	private String file;
}
