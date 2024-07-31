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

import com.fir.manage.dtos.ChargesheetDto;
import com.fir.manage.dtos.FileDto;
import com.fir.manage.entities.Chargesheet;
import com.fir.manage.entities.FIR;
import com.fir.manage.external.services.FileClient;
import com.fir.manage.payloads.APIResponse;
import com.fir.manage.repository.ChargesheetRepository;
import com.fir.manage.repository.FIRRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChargesheetService {

	@Autowired
	private FileClient fileClient;
	
	private ChargesheetRepository chargesheetRepository;
	
	private FIRRepository firRepository;
	
	
	public APIResponse uploadChargesheet(ChargesheetDto chargesheetDto) {
		
		Optional<FIR> fir = firRepository.findById(chargesheetDto.getFirId());
		
		FIR updateFir = fir.get();
		
		if(updateFir.getIsClosed() == false) {
		
			MultipartFile[] files = chargesheetDto.getFiles();
	
			Chargesheet chargesheet = new Chargesheet();
			
			String chargesheetId = UUID.randomUUID().toString();
			
			chargesheet.setId(chargesheetId);
			chargesheet.setFirId(chargesheetDto.getFirId());
			chargesheet.setTitle(chargesheetDto.getTitle());
			chargesheet.setDescription(chargesheetDto.getDescription());
			chargesheet.setFiles(new ArrayList<>());
			if(files!=null && !files[0].getOriginalFilename().equals("")) {
				System.out.println();
				FileDto fileServiceResponse = fileClient.uploadFile(files);
				chargesheet.setFiles(fileServiceResponse.getFiles());
			}
			
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
			chargesheet.setCreationTime(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")).format(formatter)+"+05:30");
	
			
			// updating fir status
			updateFir.setIsClosed(true);
			updateFir.setClosedDate(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")).format(formatter)+"+05:30");
			updateFir.setChargesheetId(chargesheetId);
			
			firRepository.save(updateFir);
			
			chargesheetRepository.save(chargesheet);
			
			String message = "Chargesheet filed";
			Boolean success  = true;
			return new APIResponse(message,success);
		} else {
			String message = "Cannot add chargesheet, case is already closed.";
			Boolean success  = false;
			return new APIResponse(message,success);
		}
	}
	
	public Optional<ArrayList<Chargesheet>> getChargesheetByFirId(String id){
		return chargesheetRepository.findByFirId(id);
	}
	
}
