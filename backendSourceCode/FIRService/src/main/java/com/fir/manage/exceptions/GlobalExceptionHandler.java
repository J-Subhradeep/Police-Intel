package com.fir.manage.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fir.manage.payloads.APIResponse;




@RestControllerAdvice
public class GlobalExceptionHandler {
	
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<APIResponse> handleResourceNotFoundException(ResourceNotFoundException ex){
		
		String message = ex.getMessage();
		
		APIResponse response = APIResponse.builder().message(message).success(false).build();
		return new ResponseEntity<>(response,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<APIResponse> handleException(Exception ex){
		
		String message = ex.getMessage();
		
		APIResponse response = APIResponse.builder().message(message).success(false).build();
		return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
	}


}