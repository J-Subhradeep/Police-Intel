package com.management.portal.controllers;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.management.portal.payloads.ApiResponse;
import com.management.portal.services.PoliceStationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/manage/police")
@AllArgsConstructor
public class PoliceStationControllers {

	private PoliceStationService policeStationService;
	
	
	@PostMapping("/upload-excel")
	public ResponseEntity<ApiResponse> policeStationsUploadViaExcel(@RequestParam("file")MultipartFile file) throws IOException{
		this.policeStationService.savePoliceStations(file);
		ApiResponse response = new ApiResponse();
		response.setMessage("data uploaded successfully");
		response.setSuccess(true);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/test")
	public String test() {
		return "Successfully loaded";
	}
	
}
