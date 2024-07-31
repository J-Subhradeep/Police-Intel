package com.fir.manage.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fir.manage.dtos.ChargesheetDto;
import com.fir.manage.entities.Chargesheet;
import com.fir.manage.payloads.APIResponse;
import com.fir.manage.services.ChargesheetService;

@RestController
@RequestMapping("/fir-management/chargesheet")
public class ChargesheetController {
	
	@Autowired
	private ChargesheetService chargesheetService;
	
	@PostMapping("/file-chargesheet")
	ResponseEntity<APIResponse> fileChargeshert(@ModelAttribute ChargesheetDto chargesheetDto){
		APIResponse response = chargesheetService.uploadChargesheet(chargesheetDto);;
		return new ResponseEntity<APIResponse>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/get/{id}") 
	Optional<ArrayList<Chargesheet>> getChargesheetByFIRId(@PathVariable String id){
		return chargesheetService.getChargesheetByFirId(id);
	}

	@GetMapping("/test")
	ResponseEntity<String> test(){
		String test = "Test Successful";
		return new ResponseEntity<>(test,HttpStatus.OK);
	}

}
