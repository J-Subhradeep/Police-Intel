package com.police.portal.dtos;

import java.time.ZonedDateTime;

import lombok.Data;

@Data
public class ReviewDto {
	private Long id;
	private Long visitorId;
	private ZonedDateTime visitDateTime;
	private Long policeStationId;
	private Boolean isReviewDone;
	private Boolean success;
}
