package com.management.portal.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.management.portal.dtos.AuthRequest;
import com.management.portal.dtos.PoliceAdminUpdateDto;
import com.management.portal.dtos.SystemUserRegisterDto;
import com.management.portal.payloads.ApiResponse;
import com.management.portal.payloads.JwtResponse;
import com.management.portal.services.auths.PoliceStationAuthService;

import feign.Response;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/manage/police-station/auth")
@AllArgsConstructor
public class PoliceStationAuthenticationController {
	private PoliceStationAuthService policeStationAuthService;

	@PostMapping("/register")
	public ResponseEntity<ApiResponse> createUser(@RequestBody SystemUserRegisterDto registerDto) {
		registerDto.setRole("police-station-admin");
		ApiResponse response = policeStationAuthService.registerUser(registerDto);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<JwtResponse> authenticate(@RequestBody AuthRequest authReq) {
		authReq.setRole("police-station-admin");
		JwtResponse response = policeStationAuthService.getToken(authReq);
		return new ResponseEntity<JwtResponse>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/validateToken")
	public ResponseEntity<ApiResponse> validateToken(@RequestParam("token") String token) {
		ApiResponse response = new ApiResponse();
		String validation = policeStationAuthService.validateToken(token);
		if (validation.equals("police-station-admin")) {

			response.setMessage(policeStationAuthService.validateToken(token));

			response.setSuccess(true);
			return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
		}
		else {
			response.setMessage("Token invalid");
			response.setSuccess(false);
			return new ResponseEntity<ApiResponse>(response, HttpStatus.UNAUTHORIZED);
		}
	}
	
	
	@PostMapping("/update")
	public ResponseEntity<ApiResponse> updateUser(@RequestBody PoliceAdminUpdateDto adminUpdateDto){
		ApiResponse response =  policeStationAuthService.updateUser(adminUpdateDto);
		return new ResponseEntity<ApiResponse>(response,HttpStatus.ACCEPTED);
	}

}
