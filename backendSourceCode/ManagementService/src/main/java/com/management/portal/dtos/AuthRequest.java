package com.management.portal.dtos;

import lombok.Data;

@Data
public class AuthRequest {
	String role;
	String userName;
	String password;
}
