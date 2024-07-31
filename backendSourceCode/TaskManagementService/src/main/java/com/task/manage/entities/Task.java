
package com.task.manage.entities;

import jakarta.persistence.Column;
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
	@Column(length=500)
	private String title;
	@Column(length = 5000)
	private String description;
	private long assignedById;
	private long assignedToId;
	private String deadline;
	private String assignedTime;
	private Boolean isDone;
	private String file;
	private Long policeStationId;
}
