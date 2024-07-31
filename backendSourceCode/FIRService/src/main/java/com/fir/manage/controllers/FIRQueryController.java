package com.fir.manage.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fir.manage.dtos.FIRQueryResponseDto;
import com.fir.manage.services.FIRQueryResponseService;

@RestController
@RequestMapping("/fir-management/query")
public class FIRQueryController {
	@Autowired
	private FIRQueryResponseService firQueryResponseService;
	
	@GetMapping("/get") 
	FIRQueryResponseDto getFIRQueryByFIRId(@RequestParam String id){

		return firQueryResponseService.getFIRQueryUpdate(id);
	}
	
	
	@GetMapping("/test")
	ResponseEntity<String> test(){
		String test = "Test Successful";
		return new ResponseEntity<>(test,HttpStatus.OK);
	}

}
