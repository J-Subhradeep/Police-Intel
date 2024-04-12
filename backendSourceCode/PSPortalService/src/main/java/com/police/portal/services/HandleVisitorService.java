package com.police.portal.services;

import java.util.List;

import com.police.portal.dtos.DateTimeDto;
import com.police.portal.dtos.TakeDateTimeDto;
import com.police.portal.dtos.VisitorDto;
import com.police.portal.entities.VisitingTimes;
import com.police.portal.entities.Visitors;

public interface HandleVisitorService {

	
	Object createEntry(VisitorDto visitor);
	List<Visitors> getAllVisitors();
	List<Visitors> getVisitorsByName(String name);
	Visitors getVisitorByPhone(String phoneNumber);
	Visitors getVisitorByEmail(String email);
	List<VisitingTimes> getVisitorsByPoliceStation(Long id);
	List<Visitors> getVisitorsByDateTimeBetween(TakeDateTimeDto datetime);
	Visitors getVisitorById(Long id);
}
