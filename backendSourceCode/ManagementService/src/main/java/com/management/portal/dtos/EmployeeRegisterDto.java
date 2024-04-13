package com.management.portal.dtos;

import lombok.Data;

@Data
public class EmployeeRegisterDto {
	private Long id;
	private String name;
	private String userName;
	private String role;
	private String photo;
	private long policeStationId;
	private long districtId;
	private long superiorId;
	private String password;
}
