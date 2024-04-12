package com.police.portal.services;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.police.portal.dtos.ReviewDto;
import com.police.portal.dtos.TakeDateTimeDto;
import com.police.portal.dtos.VisitingTimeDto;
import com.police.portal.dtos.VisitorDto;
import com.police.portal.entities.VisitingTimes;
import com.police.portal.entities.Visitors;
import com.police.portal.repositories.VisitingTimeRepository;
import com.police.portal.repositories.VisitorRepository;

@Service
public class HandleVisitingTimeServiceImpl {

	@Autowired
	private VisitingTimeRepository visitingTimeRepository;
	
	@Autowired
	private VisitorRepository visitorRepository;
	
	public VisitingTimes createEntry(VisitingTimeDto visitor) {
		VisitingTimes  visitingTime= new VisitingTimes();
		Visitors vis = visitorRepository.findById(visitor.getVisitorId()).get();
		vis.setLastVisitTimestamp(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")));
		visitingTime.setVisitDateTime(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")));
		visitingTime.setVisitorId(visitor.getVisitorId());
		visitingTime.setPoliceStationId(visitor.getPoliceStationId());
		visitingTime.setIsReviewDone(false);
		visitingTime.setVisitorName(vis.getVisitorName());
		visitingTime.setVisitorEmail(vis.getVisitorEmail());
		visitingTime.setVisitorAddress(vis.getVisitorAddress());
		visitingTime.setVisitorPhone(vis.getVisitorPhone());
		return visitingTimeRepository.save(visitingTime);
	}
	
	public List<VisitingTimes> getVisitorsByDateTimeBetween(TakeDateTimeDto datetime) {
		// TODO Auto-generated method stub
		ZonedDateTime startDateTime = LocalDateTime.now().atZone(ZoneId.of("Asia/Kolkata"));
		ZonedDateTime endDateTime = LocalDateTime.now().atZone(ZoneId.of("Asia/Kolkata"));

		if(datetime.isHasStartDate()) {
			startDateTime = ZonedDateTime.of(datetime.getStartYear(),datetime.getStartMonth(),datetime.getStartDay(),datetime.getStartHour(),datetime.getStartMinute(),0,0,ZoneId.of("Asia/Kolkata"));
		}
		if(datetime.isHasEndDate()) {
			
			endDateTime = ZonedDateTime.of(datetime.getEndYear(),datetime.getEndMonth(),datetime.getEndDay(),datetime.getEndHour(),datetime.getEndMinute(),0,0,ZoneId.of("Asia/Kolkata"));
		}
		System.out.println(startDateTime);
		System.out.println(endDateTime);
		List<VisitingTimes> visitors = visitingTimeRepository.findByVisitDateTimeBetween(startDateTime, endDateTime.plusHours(5).plusMinutes(30));
		return visitors;
	}

	
	public ReviewDto giveReviewForThisVisit(Long id) {
		VisitingTimes vt = visitingTimeRepository.findById(id).get();
		ReviewDto rdto = new ReviewDto();
		rdto.setId(vt.getId());
		rdto.setIsReviewDone(vt.getIsReviewDone());
		rdto.setPoliceStationId(vt.getPoliceStationId());
		rdto.setVisitDateTime(vt.getVisitDateTime());
		rdto.setVisitorId(vt.getVisitorId());
		if(vt.getIsReviewDone()) {


			rdto.setSuccess(false);
		}
		else {
			vt.setIsReviewDone(true);
			rdto.setSuccess(true);
		}
		visitingTimeRepository.save(vt);
		return rdto;
	}
}
