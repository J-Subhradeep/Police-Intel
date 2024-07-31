package com.fir.manage.controllers;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fir.manage.dtos.FIRDto;
import com.fir.manage.entities.FIR;
import com.fir.manage.payloads.APIResponse;
import com.fir.manage.services.FIRService;

@RestController
@RequestMapping("/fir-management/manage")
public class FIRControllers {
	@Autowired
	private FIRService firService;
	
	@PostMapping("/upload-fir")
	ResponseEntity<APIResponse> uploadFIR(@RequestBody FIRDto firDto){
		APIResponse response = firService.uploadFIR(firDto);;
		return new ResponseEntity<APIResponse>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/get/all")
	List<FIR> getAllFir(){
		return firService.getFIR();
	}
	
//	@PostMapping("/start-investigation/{id}")
//	ResponseEntity<APIResponse> startInvestigation(@PathVariable UUID id){
//		APIResponse res = firService.startInvestigation(id);
//		return new ResponseEntity<APIResponse>(res, HttpStatus.ACCEPTED);
//	}
//	
//	@PostMapping("/end-investigation/{id}")
//	ResponseEntity<APIResponse> endInvestigation(@PathVariable UUID id){
//		APIResponse res = firService.endInvestigation(id);
//		return new ResponseEntity<APIResponse>(res, HttpStatus.ACCEPTED);
//	}

	@GetMapping("/test")
	ResponseEntity<String> test(){
		String test = "Test Successful";
		return new ResponseEntity<>(test,HttpStatus.OK);
	}
	
	@GetMapping("/get/{id}") 
	Optional<FIR> getFIRById(@PathVariable String id){
		return firService.getFIRById(id);
	}

}
