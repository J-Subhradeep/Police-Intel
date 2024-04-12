package com.fir.manage.dtos;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class FIRUpdateDto {
	
	private String id;
	private String FIR_id;
	private String title;
	private String description;
	private MultipartFile[] files;
	private String creationTime;

}
