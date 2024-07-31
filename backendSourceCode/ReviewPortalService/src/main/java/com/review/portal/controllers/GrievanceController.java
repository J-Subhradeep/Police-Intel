package com.review.portal.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.review.portal.dtos.GrievanceDto;
import com.review.portal.entities.Grievance;
import com.review.portal.services.GrievanceService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/action/grievance")
@AllArgsConstructor
public class GrievanceController {

	
	private GrievanceService grievanceService;
	
	@PostMapping("/register")
	public ResponseEntity<Grievance> registerGrievance(@RequestBody GrievanceDto grievanceDto){
		Grievance grievance = grievanceService.registerGrievance(grievanceDto);
		return new ResponseEntity<Grievance>(grievance,HttpStatus.CREATED);
	}
	
	@PostMapping("/resolve")
	public ResponseEntity<Grievance> registerGrieEntity(@RequestBody Map<String, Long> request){
		Grievance grievance  = grievanceService.resolveGrievance(request.get("id"));
		return new ResponseEntity<Grievance>(grievance,HttpStatus.ACCEPTED);
	}
}
