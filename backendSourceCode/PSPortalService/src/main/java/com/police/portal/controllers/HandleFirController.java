package com.police.portal.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.police.portal.dtos.FIRDto;
import com.police.portal.payload.ApiResponse;
import com.police.portal.services.HandleFirServiceImpl;

@RestController
@RequestMapping("/police-admin/fir/manage")
public class HandleFirController {

	@Autowired
	private HandleFirServiceImpl firServiceImpl;
	
	
	@PostMapping("/add-fir")
	ResponseEntity<ApiResponse> addFir(@RequestBody FIRDto firDto){
		return firServiceImpl.uploadFIR(firDto);
	}

	@PostMapping("/close-fir/{firId}")
	ResponseEntity<ApiResponse> closeFir(@PathVariable UUID firId){
		return firServiceImpl.closeFir(firId);
	}
}
