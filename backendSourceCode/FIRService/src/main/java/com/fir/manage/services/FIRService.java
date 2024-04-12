package com.fir.manage.services;


import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fir.manage.dtos.AccusedDto;
import com.fir.manage.dtos.FIRDto;
import com.fir.manage.dtos.VictimDto;
import com.fir.manage.entities.FIR;
import com.fir.manage.entities.helper.Accused;
import com.fir.manage.entities.helper.Victim;
import com.fir.manage.payloads.APIResponse;
import com.fir.manage.repository.FIRRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FIRService {

	private FIRRepository firRepository;
	
	
	public APIResponse uploadFIR(FIRDto firDto) {
		UUID uuid = UUID.randomUUID();
		FIR fir = new FIR();
		fir.setId(uuid);
		fir.setIo_id(firDto.getIo_id());
		fir.setIo_name(firDto.getIo_name());
		fir.setIo_designation(firDto.getIo_designation());
		fir.setPs_id(firDto.getPs_id());
		fir.setPs_name(firDto.getPs_name());
		fir.setOccurrence_date_time_from(firDto.getOccurrence_date_time_from());
		fir.setOccurrence_date_time_to(firDto.getOccurrence_date_time_to());
		fir.setFIR_type(firDto.getFIR_type());
		fir.setPlace_of_incident(firDto.getPlace_of_incident());
		fir.setComplainant_name(firDto.getComplainant_name());
		fir.setComplainant_phone_number(firDto.getComplainant_phone_number());
	
		List<Accused> accusedList = new ArrayList<>();
		
		List<AccusedDto> accusedListDto = firDto.getAccused_list();
		
		for (AccusedDto accused : accusedListDto) {
			Accused new_accused = new Accused();
			
			new_accused.setAccused_number(accused.getAccused_number());
			new_accused.setAccused_name(accused.getAccused_name());
			new_accused.setAccused_gender(accused.getAccused_gender());
			new_accused.setAccused_age(accused.getAccused_age());
			new_accused.setAccused_social_catagory(accused.getAccused_social_catagory());
			new_accused.setAccused_job(accused.getAccused_job());
			
			accusedList.add(new_accused);
		}
		
		fir.setAccused_list(accusedList);
		
		List<Victim> victimList = new ArrayList<>();
		
		List<VictimDto> victimListDto = firDto.getVictim_list();
		
		for (VictimDto victim : victimListDto) {
			Victim new_victim = new Victim();
			
			new_victim.setVictim_number(victim.getVictim_number());
			new_victim.setVictim_name(victim.getVictim_name());
			new_victim.setVictim_gender(victim.getVictim_gender());
			new_victim.setVictim_age(victim.getVictim_age());
			new_victim.setVictim_social_catagory(victim.getVictim_social_catagory());;
			new_victim.setVictim_job(victim.getVictim_job());;
			
			victimList.add(new_victim);
		}
		
		fir.setVictim_list(victimList);
		
		fir.setDescription(firDto.getDescription());
		fir.setAct_section(firDto.getAct_section());
		fir.setCrime_catagory_list(firDto.getCrime_catagory_list());
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
		fir.setSubmissionTime(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")).format(formatter)+"+05:30");
		fir.setIsClosed(false);
		firRepository.save(fir);
		
		String message = "FIR saved with id: " + fir.getId();
		Boolean success  = true;
		return new APIResponse(message,success);
	}
	
	public List<FIR> getFIR() {
		return firRepository.findAll();
	}
	
	public APIResponse updateFIR(UUID id) {
		Optional<FIR> fir = firRepository.findById(id);
		if(fir.isPresent()) {
			FIR updateFir = fir.get();
			updateFir.setIsClosed(true);
			firRepository.save(updateFir);
			String message = "FIR with id: " + updateFir.getId() + " is updated";
			Boolean success  = true;
			return new APIResponse(message,success);
		}
		String message = "Wrong ID";
		Boolean success  = false;
		return new APIResponse(message,success);
	}
}
