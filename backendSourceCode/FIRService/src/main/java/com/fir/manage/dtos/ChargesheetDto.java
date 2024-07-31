package com.fir.manage.dtos;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ChargesheetDto {
	
	private String id;
	private String firId;
	private String title;
	private String description;
	private MultipartFile[] files;
	private String creationTime;
}