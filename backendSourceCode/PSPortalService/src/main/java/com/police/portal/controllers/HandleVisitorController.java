package com.police.portal.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.police.portal.dtos.ReviewDto;
import com.police.portal.dtos.TakeDateTimeDto;
import com.police.portal.dtos.VisitingTimeDto;
import com.police.portal.dtos.VisitorDto;
import com.police.portal.entities.VisitingTimes;
import com.police.portal.entities.Visitors;

import com.police.portal.services.HandleVisitingTimeServiceImpl;
import com.police.portal.services.HandleVisitorService;

@RestController
@RequestMapping("/police-admin/visitors")
public class HandleVisitorController {

	
	private HandleVisitorService visitorService;
	private HandleVisitingTimeServiceImpl visitingTimeService;
	public HandleVisitorController(HandleVisitorService visitorService, HandleVisitingTimeServiceImpl visitingTimeServiceImpl) {
		super();
		this.visitorService = visitorService;
		this.visitingTimeService = visitingTimeServiceImpl;
	}


	@PostMapping("/create")
	public Object createEntry(@RequestBody VisitorDto visitor) {
		return visitorService.createEntry(visitor);
	}

	@PostMapping("/create_visit_entry")
	public VisitingTimes createVisitEntry(@RequestBody VisitingTimeDto visitor) {
		return visitingTimeService.createEntry(visitor);
	}
	
	@GetMapping("/")
	public List<Visitors> getAllVisitors(){
		return visitorService.getAllVisitors();
	}
	
	@GetMapping("/get/email")
	public Visitors getByEmail(@RequestParam String q) {
		return visitorService.getVisitorByEmail(q);
	}
	@GetMapping("/get/ps")
	public List<VisitingTimes> getByPoliceStation(@RequestParam Long q) {
		return visitorService.getVisitorsByPoliceStation(q);
	}
	@GetMapping("/get/phone")
	public Visitors getByPhone(@RequestParam String q) {
		return visitorService.getVisitorByPhone(q);
	}
	@GetMapping("/get/name")
	public List<Visitors> getByName(@RequestParam String q){
		return visitorService.getVisitorsByName(q);
	}
	@GetMapping("/get/{id}")
	public Visitors getById(@PathVariable Long id) {
		return visitorService.getVisitorById(id);
	}
	
	@GetMapping("/get/date")
	public List<VisitingTimes> getByDateTimeBetween(@RequestBody TakeDateTimeDto datetime){
		return visitingTimeService.getVisitorsByDateTimeBetween(datetime);
	}
	
	@PostMapping("/review")
	public ReviewDto giveReviewForThisVisit(@RequestBody Map<String, Long> mp) {
		return visitingTimeService.giveReviewForThisVisit(mp.get("visiting_time_id"));
	}
}
