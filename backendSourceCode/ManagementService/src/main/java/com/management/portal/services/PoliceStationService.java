package com.management.portal.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.management.portal.entities.PoliceStation;
import com.management.portal.repositories.PoliceStationRepository;

import jakarta.transaction.Transactional;

@Service
public class PoliceStationService {
	
	@Autowired
	private PoliceStationRepository policeStationRepository;
	

	public void savePoliceStations(MultipartFile file) throws IOException {
		if(ExcelUploadService.isValidExcelFile(file)) {
			List<PoliceStation> policeStations = ExcelUploadService.getPoliceStationsDataFromExcel(file.getInputStream());
			this.policeStationRepository.saveAll(policeStations);
		}
	}
	
}
