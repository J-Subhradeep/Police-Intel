package com.review.portal.dtos;

import lombok.Data;

@Data
public class SentimentAnalysisDto {
	private String sentiment;
	private Boolean positive;
}
