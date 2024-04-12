package com.review.portal.services;

import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import com.review.portal.dtos.SentimentAnalysisDto;

@FeignClient(name = "SENTIMENT-ANALYSIS-SERVICE")
public interface SentimentAnalysisClient {
	@PostMapping("/get_sentiment")
	public SentimentAnalysisDto getSentiment(Map<String, String> mp);
}
