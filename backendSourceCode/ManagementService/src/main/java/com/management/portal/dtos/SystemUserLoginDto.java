package com.management.portal.dtos;

import lombok.Data;

@Data
public class SystemUserLoginDto {
	private Long userId;
	private String role;
	private String name;
	private String userName;
	private String userAddress;
	private String profilePhoto;
	private Boolean isMobileUser;
	private Boolean isEmailUser;
	private Boolean isVerfied;
}
