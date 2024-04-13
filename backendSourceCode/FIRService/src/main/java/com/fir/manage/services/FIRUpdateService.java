package com.fir.manage.services;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fir.manage.dtos.FIRUpdateDto;
import com.fir.manage.dtos.FileDto;
import com.fir.manage.entities.FIRUpdate;
import com.fir.manage.external.services.FileClient;
import com.fir.manage.payloads.APIResponse;
import com.fir.manage.repository.FIRUpdateRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FIRUpdateService {

	@Autowired
	private FileClient fileClient;
	
	private FIRUpdateRepository firUpdateRepository;
	
	
	public APIResponse uploadFIRUpdate(FIRUpdateDto firUpdateDto) {
		MultipartFile[] files = firUpdateDto.getFiles();

		FIRUpdate firUpdate = new FIRUpdate();
		firUpdate.setId(UUID.randomUUID().toString());
		firUpdate.setFirId(firUpdateDto.getFIR_id());
		firUpdate.setTitle(firUpdateDto.getTitle());
		firUpdate.setDescription(firUpdateDto.getDescription());
		firUpdate.setFiles(new ArrayList<>());
		if(files!=null && !files[0].getOriginalFilename().equals("")) {
			System.out.println();
			FileDto fileServiceResponse = fileClient.uploadFile(files);
			firUpdate.setFiles(fileServiceResponse.getFiles());
		}
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
		firUpdate.setCreationTime(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")).format(formatter)+"+05:30");
		
		firUpdateRepository.save(firUpdate);
		
		String message = "New update added";
		Boolean success  = true;
		return new APIResponse(message,success);
		
	}
	
	public Optional<ArrayList<FIRUpdate>> getUpdatesByFirId(String id){
		return firUpdateRepository.findByFirId(id);
	}
	
}
