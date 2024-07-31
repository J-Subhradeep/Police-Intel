package com.management.portal.services.auths;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.management.portal.dtos.AuthRequest;
import com.management.portal.dtos.SystemUserLoginDto;
import com.management.portal.dtos.SystemUserRegisterDto;
import com.management.portal.entities.SystemUsers;
import com.management.portal.exceptions.ResourceNotFoundException;
import com.management.portal.payloads.ApiResponse;
import com.management.portal.payloads.JwtResponse;
import com.management.portal.repositories.SystemUserRepository;
import com.management.portal.services.JwtService;
import com.management.portal.services.PasswordEncodingAndDecoding;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SocialMediaAuthService {

	private PasswordEncodingAndDecoding passwordManagement;
	private SystemUserRepository systemUserRepository;
	private JwtService jwtService;
	
	
	
	public ApiResponse registerUser(SystemUserRegisterDto registerDto) {
		SystemUsers systemUser = new SystemUsers();
		systemUser.setRole(registerDto.getRole());
		systemUser.setName(registerDto.getName());
		
		// checking if any user with the same username
		Optional<SystemUsers> check = systemUserRepository.findByUserName(registerDto.getRole()+"-"+registerDto.getUserName());
		if(check.isPresent())
			throw new RuntimeException("User with this username already present");
		//setting username
		
		systemUser.setUserName(registerDto.getRole()+"-"+registerDto.getUserName());
		
		// checking for if user registerd with email or phone number
		systemUser.setIsEmailUser(registerDto.getIsEmailUser());
		systemUser.setIsMobileUser(registerDto.getIsMobileUser());
		
		//setting encoded password
		systemUser.setUserPassword(passwordManagement.encode(registerDto.getUserPassword()));
		
		// will be edited future
		systemUser.setProfilePhoto(registerDto.getProfilePhoto());
		
		systemUser.setIsVerified(false);
		systemUser.setUserAddress(registerDto.getUserAddress());
		systemUser.setPsId(0L);
		
//		saving user
		SystemUsers savedUser = systemUserRepository.save(systemUser);
		
		String message = "User saved with id :"+savedUser.getUserId();
		Boolean success  = true;
		return new ApiResponse(message,success);
		
	}
	
	
	public Optional<SystemUsers> authenticate(AuthRequest loginDto) {
		Optional<SystemUsers> systemUser = systemUserRepository.findByUserName(loginDto.getRole()+"-"+loginDto.getUserName());
		if(systemUser.isPresent()) {
			SystemUsers user = systemUser.get();
//			String password = passwordManagement.encode(loginDto.getPassword());
			if(passwordManagement.matchPasswordWithEncodedPassword(loginDto.getPassword(), user.getUserPassword()) && user.getRole().equals(loginDto.getRole())) {
				return systemUser;
			}
			else throw new ResourceNotFoundException("Authentication Error");
			
		}
		else {
			throw new ResourceNotFoundException("Authentication Error");
		}
	}
	
	
	public JwtResponse getToken(AuthRequest loginDto) {
		Optional<SystemUsers> user = authenticate(loginDto);
		if(user.isPresent()) {
			JwtResponse response = new JwtResponse();
			response.setToken(jwtService.generateToken(loginDto.getUserName(), loginDto.getRole()));
			response.setUserId(user.get().getUserId());
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
