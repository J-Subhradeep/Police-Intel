package com.review.portal.dtos;

import lombok.Data;

@Data
public class ReviewDto {
	private Long visitorId;
	private Long visitingTimeId;
	private Long policeStationId;
	private String review;
	private Integer rating;
}
