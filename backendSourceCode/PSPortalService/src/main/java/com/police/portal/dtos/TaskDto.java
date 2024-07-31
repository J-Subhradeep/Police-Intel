package com.police.portal.dtos;

import lombok.Data;

@Data
public class TaskDto {
	private Long id;
	private String title;
	private String description;
	private long assignedById;
	private long assignedToId;
	private Integer deadline;
	private String assignedTime;
	private Boolean isDone;
	private String file;
	private Long policeStationId;
}
