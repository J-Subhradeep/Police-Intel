package com.review.portal.services;

import org.springframework.stereotype.Service;

import com.review.portal.dtos.GrievanceDto;
import com.review.portal.entities.Grievance;
import com.review.portal.repositories.GrievanceRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GrievanceService {

	
	private GrievanceRepository grievanceRepository;
	
	public Grievance registerGrievance(GrievanceDto grievanceDto) {
		Grievance grievance = new Grievance();
		grievance.setComplaint(grievanceDto.getComplaint());
		grievance.setAddress(grievanceDto.getAddress());
		grievance.setMobile(grievanceDto.getMobile());
		grievance.setResolved(false);
		return grievanceRepository.save(grievance);
	}
	
	public Grievance resolveGrievance(Long id) {
		Grievance grievance = grievanceRepository.findById(id).get();
		grievance.setResolved(true);
		return grievanceRepository.save(grievance);
	}
}
