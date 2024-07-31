package com.review.portal.services;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.review.portal.dtos.VisitingTimeDto;

@FeignClient(name = "PS-PORTAL-SERVICE")
public interface VisitorTimingClient {

	
	@PostMapping("/police-admin/visitors/review")
	VisitingTimeDto giveReviewForThisVisit(@RequestBody Map<String, Long> mp);
	
}
