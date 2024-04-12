package com.fir.manage.entities;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
@Document(collection = "FIR_update")
public class FIRUpdate {
	
	private String id;
	private String firId;
	private String title;
	private String description;
	private List<String> files;
	private String creationTime;

}
