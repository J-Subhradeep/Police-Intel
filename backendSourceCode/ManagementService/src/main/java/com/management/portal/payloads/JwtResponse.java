package com.management.portal.payloads;

import lombok.Data;

@Data
public class JwtResponse {
	String token;
	Long userId;
	Boolean success;
}
