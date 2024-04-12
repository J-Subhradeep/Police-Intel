
package com.task.manage.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="job")
@Data
public class Job {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(length = 500)
	private String title;
	@Column(length = 5000)
	private String description;
	private long submittedById;
	private long doneId;
	private String submitTime;
	private String file;
	private Long policeStationId;
}
