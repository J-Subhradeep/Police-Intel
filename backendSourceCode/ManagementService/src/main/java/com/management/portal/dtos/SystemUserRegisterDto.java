package com.management.portal.dtos;

import com.management.portal.entities.SystemUsers;

import lombok.Data;

@Data
public class SystemUserRegisterDto {
	private Long psId; // only for police station admin
	private String role;
	private String name;
	private String userName;
	private String userPassword;
	private String userAddress;
	private String profilePhoto;
	private Boolean isMobileUser;
	private Boolean isEmailUser;
}
