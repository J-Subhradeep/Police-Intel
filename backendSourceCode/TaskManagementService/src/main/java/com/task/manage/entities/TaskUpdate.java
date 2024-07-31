
package com.task.manage.entities;

import jakarta.persistence.Column;
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
	@Column(length = 500)
	private String title;
	@Column(length = 5000)
	private String description;
	private String submitTime;
	private String file;
}
