package com.review.portal.dtos;

import lombok.Data;

@Data
public class ReviewResponseDto {
	private Boolean success;
	private Long reviewId;
	private Long visitingTimeId;
}
