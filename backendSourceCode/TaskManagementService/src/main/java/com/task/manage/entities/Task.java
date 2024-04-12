
package com.task.manage.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="task")
@Data
public class Task {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String description;
	private long assignedById;
	private long assignedToId;
	private String deadline;
	private String assignedTime;
	private Boolean isDone;
	private String file;
	private Long policeStationId;
}
