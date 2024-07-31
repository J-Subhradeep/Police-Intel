package com.management.portal.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.management.portal.dtos.AuthRequest;
import com.management.portal.dtos.SystemUserRegisterDto;
import com.management.portal.payloads.ApiResponse;
import com.management.portal.payloads.JwtResponse;
import com.management.portal.services.auths.SocialMediaAuthService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/manage/social-media/auth")
@AllArgsConstructor
public class SocialMediaAuthenticationController {

	private SocialMediaAuthService socialMediaAuthService;
	
	@PostMapping("/register")
	public ResponseEntity<ApiResponse> createUser(@RequestBody SystemUserRegisterDto registerDto){
		ApiResponse response  = socialMediaAuthService.registerUser(registerDto);
		return new ResponseEntity<ApiResponse>(response,HttpStatus.CREATED);
	}
	
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> authenticate(@RequestBody AuthRequest authReq){
		authReq.setRole("social-media-user");
		JwtResponse response = socialMediaAuthService.getToken(authReq);
		return new ResponseEntity<JwtResponse>(response,HttpStatus.ACCEPTED);
	}
	@PostMapping("/validateToken")
	public ResponseEntity<ApiResponse> validateToken(@RequestParam("token") String token){
		ApiResponse response  = new ApiResponse();
		response.setMessage(socialMediaAuthService.validateToken(token));
		response.setSuccess(true);
		return new ResponseEntity<ApiResponse>(response,HttpStatus.OK);
	}
}
