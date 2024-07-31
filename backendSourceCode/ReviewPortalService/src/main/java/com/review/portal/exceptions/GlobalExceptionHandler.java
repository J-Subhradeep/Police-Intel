package com.review.portal.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.review.portal.payload.ApiResponse;





@RestControllerAdvice
public class GlobalExceptionHandler {
	
	

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse> handleException(Exception ex){
		
		String message = ex.getMessage();
		
		ApiResponse response = ApiResponse.builder().message(message).success(false).build();
		return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
	}


}
