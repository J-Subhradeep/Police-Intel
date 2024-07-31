package com.fir.manage.services;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fir.manage.dtos.FIRQueryResponseDto;
import com.fir.manage.entities.Chargesheet;
import com.fir.manage.entities.FIR;
import com.fir.manage.entities.FIRUpdate;
import com.fir.manage.repository.ChargesheetRepository;
import com.fir.manage.repository.FIRRepository;
import com.fir.manage.repository.FIRUpdateRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class FIRQueryResponseService {
	
	private FIRUpdateRepository firUpdateRepository;
	
	private FIRRepository firRepository;
	
	private ChargesheetRepository chargesheetRepository;
	
	
	public FIRQueryResponseDto getFIRQueryUpdate(String id){
		
		FIRQueryResponseDto firQueryResponseDto = new FIRQueryResponseDto();
		Optional<FIR> optionalFir = firRepository.findById(id);
		System.out.println(optionalFir);
		
		if(optionalFir.isPresent()) {
		
			FIR fir = optionalFir.get();
			
			if(fir.getIsClosed() == true) {
				firQueryResponseDto.setStatus("Case closed");
				
				Optional<Chargesheet> optionalChargesheet = chargesheetRepository.findById(fir.getChargesheetId());
				if(optionalChargesheet.isPresent()) {
					firQueryResponseDto.setChargesheetTitle(optionalChargesheet.get().getTitle());
					firQueryResponseDto.setChargesheetDescription(optionalChargesheet.get().getDescription());
				}
				
			} else if(fir.getInvestigationStarted() == true) {
				firQueryResponseDto.setStatus("Investigation in progress");
			} else {
				firQueryResponseDto.setStatus("Investigation will start soon");
			}
			
			firQueryResponseDto.setComplainantName(fir.getComplainant_name());
			firQueryResponseDto.setIOName(fir.getIo_name());
			
			Optional<FIRUpdate> optionalFirUpdate = firUpdateRepository.findById(fir.getLastUpadateId()==null?"0":fir.getLastUpadateId());
			
			if(optionalFirUpdate.isPresent()) {
				FIRUpdate firUpdate = optionalFirUpdate.get();
				
				firQueryResponseDto.setLastUpdateTitle(firUpdate.getTitle());
				firQueryResponseDto.setLastUpdateDescription(firUpdate.getDescription());
			}else {
				firQueryResponseDto.setLastUpdateTitle("Investigation yet to start");
				firQueryResponseDto.setLastUpdateDescription("Investigation yet to start");
			}
			
		}
		
		return firQueryResponseDto;
		
	}
	
}
