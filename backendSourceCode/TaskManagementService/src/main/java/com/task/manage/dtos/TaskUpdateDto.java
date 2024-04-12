package com.task.manage.dtos;

import lombok.Data;

@Data
public class TaskUpdateDto {
	private Long id;
	private Long taskId;
	private String title;
	private String description;
	private String submitTime;
	private String file;
}
