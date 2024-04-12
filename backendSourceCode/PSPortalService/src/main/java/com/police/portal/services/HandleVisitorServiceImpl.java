package com.police.portal.services;

import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.police.portal.dtos.DateTimeDto;
import com.police.portal.dtos.TakeDateTimeDto;
import com.police.portal.dtos.VisitorDto;
import com.police.portal.entities.VisitingTimes;
import com.police.portal.entities.Visitors;
import com.police.portal.exceptions.ResourceNotFoundException;
import com.police.portal.repositories.VisitingTimeRepository;
import com.police.portal.repositories.VisitorRepository;

@Service
public class HandleVisitorServiceImpl implements HandleVisitorService {

	private VisitorRepository visitorRepository;
	private VisitingTimeRepository visitingTimeRepository;



	public HandleVisitorServiceImpl(VisitorRepository visitorRepository,
			VisitingTimeRepository visitingTimeRepository) {
		super();
		this.visitorRepository = visitorRepository;
		this.visitingTimeRepository = visitingTimeRepository;
	}

	@Override
	public Object createEntry(VisitorDto visitor) {
		// TODO Auto-generated method stub
		Optional<Visitors> check = visitorRepository.findFirstByVisitorEmailOrVisitorPhone(visitor.getVisitorEmail(),visitor.getVisitorPhone());
		Optional<Visitors> checkPhone = visitorRepository.findFirstByVisitorPhone(visitor.getVisitorPhone());
		if (check.isPresent() && !visitor.getVisitorEmail().isBlank()) {
			Map<String, Object> map = new HashMap<>();
			map.put("present", true);
			map.put("data", check.get());
			map.put("created", false);
			return map;
		}

		else if(checkPhone.isPresent()) {
			Map<String, Object> map = new HashMap<>();
			map.put("present", true);
			map.put("data", checkPhone.get());
			map.put("created", false);
			return map;
		}
		Visitors v = new Visitors();
		v.setVisitorName(visitor.getVisitorName());
		v.setVisitorEmail(visitor.getVisitorEmail());
		v.setVisitorPhone(visitor.getVisitorPhone());
		v.setVisitorAddress(visitor.getVisitorAddress());
		v.setTimestamp(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")));
		v.setLastVisitTimestamp(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")));		
		Visitors savedVisitor = visitorRepository.save(v);
		VisitingTimes vt = new VisitingTimes();
		vt.setVisitorId(savedVisitor.getId());
		vt.setVisitDateTime(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")));
		vt.setPoliceStationId(visitor.getPoliceStationId());
		vt.setIsReviewDone(false);
		vt.setVisitorName(visitor.getVisitorName());
		vt.setVisitorEmail(visitor.getVisitorEmail());
		vt.setVisitorAddress(visitor.getVisitorAddress());
		vt.setVisitorPhone(visitor.getVisitorPhone());
		visitingTimeRepository.save(vt);
		Map<String, Object> map = new HashMap<>();
		map.put("visitorId", v.getId());
		map.put("created", true);
		map.put("present", false);
		return map;
	}

	@Override
	public List<Visitors> getVisitorsByName(String name) {
		// TODO Auto-generated method stub
		return visitorRepository.findByVisitorNameContainingIgnoringCase(name);
	}

	@Override
	public Visitors getVisitorByPhone(String phoneNumber) {
		// TODO Auto-generated method stub
		return visitorRepository.findFirstByVisitorPhone(phoneNumber)
				.orElseThrow(() -> new ResourceNotFoundException("No Visitor Found With This Mobile Number"));
	}

	@Override
	public Visitors getVisitorByEmail(String email) {
		// TODO Auto-generated method stub
		return visitorRepository.findFirstByVisitorEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("No Visitor Found With This Email"));

	}

	@Override
	public List<Visitors> getAllVisitors() {
		// TODO Auto-generated method stub
		return visitorRepository.findAll();
	}

	@Override
	public List<VisitingTimes> getVisitorsByPoliceStation(Long id) {
		// TODO Auto-generated method stub
		return visitingTimeRepository.findByPoliceStationId(id);
	}

	@Override
	public List<Visitors> getVisitorsByDateTimeBetween(TakeDateTimeDto datetime) {
		// TODO Auto-generated method stub
		ZonedDateTime startDateTime = LocalDateTime.now().atZone(ZoneId.of("Asia/Kolkata"));
		ZonedDateTime endDateTime = LocalDateTime.now().atZone(ZoneId.of("Asia/Kolkata"));
		if(datetime.isHasStartDate()) {
			startDateTime = ZonedDateTime.of(datetime.getStartYear(),datetime.getStartMonth(),datetime.getStartDay(),datetime.getStartHour(),datetime.getStartMinute(),0,0,ZoneId.of("Asia/Kolkata"));
		}
		if(datetime.isHasEndDate()) {
			
			endDateTime = ZonedDateTime.of(datetime.getEndYear(),datetime.getEndMonth(),datetime.getEndDay(),datetime.getEndHour(),datetime.getEndMinute(),0,0,ZoneId.of("Asia/Kolkata"));
		}
		List<Visitors> visitors = visitorRepository.findByTimestampBetween(startDateTime, endDateTime);
		return visitors;
	}

	@Override
	public Visitors getVisitorById(Long id) {
		// TODO Auto-generated method stub
		return visitorRepository.findById(id).get();
	}



}
