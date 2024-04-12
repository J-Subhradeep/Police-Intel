package com.police.portal.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.police.portal.dtos.FIRDto;
import com.police.portal.dtos.JobDto;
import com.police.portal.dtos.TaskDto;
import com.police.portal.dtos.TaskUpdateDto;
import com.police.portal.external.services.FIRService;
import com.police.portal.external.services.TaskService;
import com.police.portal.payload.ApiResponse;

@Service
public class HandleFirServiceImpl {
	
	@Autowired
	private FIRService firService;
	
	public ResponseEntity<ApiResponse> uploadFIR(FIRDto firDto){
		ResponseEntity<ApiResponse> response = firService.uploadFIR(firDto);
		return response;
	}
	
	public ResponseEntity<ApiResponse> closeFir(UUID firId){
		return firService.closeFir(firId);
	}

}
