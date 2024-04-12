package com.fir.manage.dtos;

import lombok.Data;

@Data
public class VictimDto {
	private int victim_number;
	private String victim_name;
	private String victim_gender;
	private int victim_age;
	private String victim_social_catagory;
	private String victim_job;
}
