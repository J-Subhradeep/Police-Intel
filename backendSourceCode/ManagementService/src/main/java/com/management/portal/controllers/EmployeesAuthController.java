
package com.management.portal.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.management.portal.dtos.AuthRequest;
import com.management.portal.dtos.EmployeeRegisterDto;
import com.management.portal.dtos.PoliceAdminUpdateDto;
import com.management.portal.dtos.SystemUserRegisterDto;
import com.management.portal.payloads.ApiResponse;
import com.management.portal.payloads.JwtResponse;
import com.management.portal.services.auths.AllEmployeesAuthService;
import com.management.portal.services.auths.PoliceStationAuthService;

import feign.Response;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/manage/officer/auth")
@AllArgsConstructor
public class EmployeesAuthController {
	private AllEmployeesAuthService allEmployeesAuthService;

	@PostMapping("/register")
	public ResponseEntity<ApiResponse> createEmployee(@RequestBody EmployeeRegisterDto registerDto) {
		ApiResponse response = allEmployeesAuthService.registerEmployee(registerDto);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<JwtResponse> authenticate(@RequestBody AuthRequest authReq) {
		JwtResponse response = allEmployeesAuthService.getToken(authReq);
		return new ResponseEntity<JwtResponse>(response, HttpStatus.ACCEPTED);
	}

	@PostMapping("/validateToken")
	public ResponseEntity<ApiResponse> validateToken(@RequestParam("token") String token) {
		ApiResponse response = new ApiResponse();
		String validation = allEmployeesAuthService.validateToken(token);
		System.out.println(validation);
		if (validation.equals("ACP")) {

			response.setMessage(allEmployeesAuthService.validateToken(token));

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
	public ResponseEntity<ApiResponse> updateEmployee(@RequestBody EmployeeRegisterDto employeeDto){
		ApiResponse response =  allEmployeesAuthService.updateEmployee(employeeDto);
		return new ResponseEntity<ApiResponse>(response,HttpStatus.ACCEPTED);
	}

}
