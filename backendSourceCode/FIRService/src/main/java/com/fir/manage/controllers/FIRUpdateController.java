package com.fir.manage.controllers;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fir.manage.dtos.FIRDto;
import com.fir.manage.dtos.FIRUpdateDto;
import com.fir.manage.entities.FIR;
import com.fir.manage.entities.FIRUpdate;
import com.fir.manage.payloads.APIResponse;
import com.fir.manage.services.FIRService;
import com.fir.manage.services.FIRUpdateService;

@RestController
@RequestMapping("/fir-update/manage")
public class FIRUpdateController {
	
	@Autowired
	private FIRUpdateService firUpdateService;
	
	@PostMapping("/add-fir-update")
	ResponseEntity<APIResponse> uploadFIRUpdate(@ModelAttribute FIRUpdateDto updateDto){
		APIResponse response = firUpdateService.uploadFIRUpdate(updateDto);;
		return new ResponseEntity<APIResponse>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/get/{id}") 
	Optional<ArrayList<FIRUpdate>> getFIRById(@PathVariable String id){
		return firUpdateService.getUpdatesByFirId(id);
	}

	@GetMapping("/test")
	ResponseEntity<String> test(){
		String test = "Test Successful";
		return new ResponseEntity<>(test,HttpStatus.OK);
	}

}
