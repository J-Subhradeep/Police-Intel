package com.fir.manage.entities;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "chargesheet")
public class Chargesheet {
	
	private String id;
	private String firId;
	private String title;
	private String description;
	private List<String> files;
	private String creationTime;
}
