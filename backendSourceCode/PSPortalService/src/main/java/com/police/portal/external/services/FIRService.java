package com.police.portal.external.services;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.police.portal.dtos.FIRDto;
import com.police.portal.payload.ApiResponse;

@FeignClient(name = "FIR-MANAGEMENT-SERVICE")
public interface FIRService {
	
	@PostMapping("/fir-management/manage/upload-fir")
	ResponseEntity<ApiResponse> uploadFIR(@RequestBody FIRDto firDto);
	
	@PostMapping("/fir-management/manage/close-fir/{id}")
	ResponseEntity<ApiResponse> closeFir(@PathVariable UUID id);
	
}