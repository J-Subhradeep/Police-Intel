package com.fir.manage.dtos;

import lombok.Data;

@Data
public class AccusedDto {
	private int accused_number;
	private String accused_name;
	private String accused_gender;
	private int accused_age;
	private String accused_social_catagory;
	private String accused_job;
}
