package com.review.portal.dtos;

import java.time.ZonedDateTime;

import lombok.Data;

@Data
public class VisitingTimeDto {
	private Long id;
	private Long visitorId;
	private ZonedDateTime visitDateTime;
	private Long policeStationId;
	private Boolean isReviewDone;
	private Boolean success;
}
