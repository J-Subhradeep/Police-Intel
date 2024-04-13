package com.management.portal.services.auths;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.management.portal.dtos.AuthRequest;
import com.management.portal.dtos.EmployeeRegisterDto;
import com.management.portal.dtos.PoliceAdminUpdateDto;
import com.management.portal.dtos.SystemUserRegisterDto;
import com.management.portal.entities.AllEmployees;
import com.management.portal.entities.SystemUsers;
import com.management.portal.exceptions.ResourceNotFoundException;
import com.management.portal.payloads.ApiResponse;
import com.management.portal.payloads.JwtResponse;
import com.management.portal.repositories.AllEmployeesRepository;
import com.management.portal.repositories.SystemUserRepository;
import com.management.portal.services.JwtService;
import com.management.portal.services.PasswordEncodingAndDecoding;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class AllEmployeesAuthService {
	private PasswordEncodingAndDecoding passwordManagement;
	private AllEmployeesRepository allEmployeesRepository;
	private JwtService jwtService;
	
	
	
	public ApiResponse registerEmployee(EmployeeRegisterDto employeeRegisterDto) {
//		SystemUsers systemUser = new SystemUsers();
		AllEmployees employee = new AllEmployees();
		employee.setRole(employeeRegisterDto.getRole());
		employee.setName(employeeRegisterDto.getName());
		
		// checking if any user with the same username
		Optional<AllEmployees> check = allEmployeesRepository.findByUserName(employeeRegisterDto.getRole()+"-"+employeeRegisterDto.getUserName());
		if(check.isPresent())
			throw new RuntimeException("User with this username already present");
		//setting username
		
		employee.setUserName(employeeRegisterDto.getRole()+"-"+employeeRegisterDto.getUserName());
		
		//setting encoded password
		employee.setPassword(passwordManagement.encode(employeeRegisterDto.getPassword()));
		
		// will be edited future
		employee.setPhoto(employeeRegisterDto.getPhoto());
		
		employee.setPoliceStationId(employeeRegisterDto.getPoliceStationId());
		employee.setDistrictId(employeeRegisterDto.getDistrictId());
		employee.setSuperiorId(employeeRegisterDto.getSuperiorId());
//		saving user
		AllEmployees savedEmployee = allEmployeesRepository.save(employee);
		
		String message = "Employee saved with id :"+savedEmployee.getId();
		Boolean success  = true;
		return new ApiResponse(message,success);
		
	}
	
	public ApiResponse updateEmployee(EmployeeRegisterDto employeeDto) {
		Optional<AllEmployees> employee = allEmployeesRepository.findByUserName(employeeDto.getRole()+"-"+employeeDto.getUserName());
		if(employee.isPresent()) {
			AllEmployees emp = employee.get();
			emp.setPassword(passwordManagement.encode(employeeDto.getPassword()));
			allEmployeesRepository.save(emp);
			ApiResponse response = new ApiResponse("updated",true);
			return response;
		}
		else {
			throw new ResourceNotFoundException("Officer not found with id: "+employeeDto.getId());
		}
	}
	
	
	
	public Optional<AllEmployees> authenticate(AuthRequest loginDto) {
		Optional<AllEmployees> employee = allEmployeesRepository.findByUserName(loginDto.getRole()+"-"+loginDto.getUserName());
		if(employee.isPresent()) {
			AllEmployees emp = employee.get();
//			String password = passwordManagement.encode(loginDto.getPassword());
			if(passwordManagement.matchPasswordWithEncodedPassword(loginDto.getPassword(), emp.getPassword()) && emp.getRole().equals(loginDto.getRole())) {
				return employee;
			}
			else throw new ResourceNotFoundException("Authentication Error");
			
		}
		else {
			throw new ResourceNotFoundException("Authentication Error");
		}
	}
	
	
	public JwtResponse getToken(AuthRequest loginDto) {
		Optional<AllEmployees> employee= authenticate(loginDto);
		if(employee.isPresent()) {
			JwtResponse response = new JwtResponse();
			response.setToken(jwtService.generateToken(loginDto.getUserName(), loginDto.getRole()));
			response.setUserId(employee.get().getId());
			response.setSuccess(true);
			return response;
		}
		else {
			throw new ResourceNotFoundException("Authentication Error");
		}
	}
	
	public String validateToken(String token) {
		return jwtService.validateToken(token);
	}
}
