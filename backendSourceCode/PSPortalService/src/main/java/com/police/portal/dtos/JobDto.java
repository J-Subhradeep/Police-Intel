package com.police.portal.dtos;

import lombok.Data;

@Data
public class JobDto {
	private Long id;
	private String title;
	private String description;
	private long submittedById;
	private long doneId;
	private String submitTime;
	private String file;
	private Long policeStationId;
}
