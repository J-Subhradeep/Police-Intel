package com.review.portal.services;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.review.portal.dtos.ReviewDto;
import com.review.portal.dtos.ReviewResponseDto;
import com.review.portal.dtos.SentimentAnalysisDto;
import com.review.portal.dtos.VisitingTimeDto;
import com.review.portal.entities.Review;
import com.review.portal.repositories.ReviewRepository;

@Service
public class ReviewService {
	
	private ReviewRepository reviewRepository;
	private SentimentAnalysisClient sentimentAnalysisClient;
	private VisitorTimingClient visitorTimingClient;
	




	public ReviewService(ReviewRepository reviewRepository, SentimentAnalysisClient sentimentAnalysisClient,
			VisitorTimingClient visitorTimingClient) {
		super();
		this.reviewRepository = reviewRepository;
		this.sentimentAnalysisClient = sentimentAnalysisClient;
		this.visitorTimingClient = visitorTimingClient;
	}





	public ReviewResponseDto createReview(ReviewDto reviewDto) {
		Map<String,String> mp = new HashMap<>();
		mp.put("review", reviewDto.getReview());
		Map<String,Long> visitingTimeIdData = new HashMap<>();
		visitingTimeIdData.put("visiting_time_id", reviewDto.getVisitingTimeId());
		
		
		VisitingTimeDto reviewStatus = visitorTimingClient.giveReviewForThisVisit(visitingTimeIdData);
		
		
		ReviewResponseDto reviewResponse = new ReviewResponseDto();
		
		if(reviewStatus.getSuccess()) {
		SentimentAnalysisDto sentimentDto = sentimentAnalysisClient.getSentiment(mp);
		Review review = new Review();
		review.setReview(reviewDto.getReview());
		review.setVisitorId(reviewDto.getVisitorId());
		review.setPoliceStationId(reviewDto.getPoliceStationId());
		review.setVisitingTimeId(reviewDto.getVisitingTimeId());
		review.setRating(reviewDto.getRating());
		review.setSentiment(sentimentDto.getSentiment());
		review.setIsPositive(sentimentDto.getPositive());
		review.setReview_timestamp(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")));
		review  = reviewRepository.save(review);
		reviewResponse.setReviewId(review.getId());
		reviewResponse.setSuccess(true);
		reviewResponse.setVisitingTimeId(reviewDto.getVisitingTimeId());
		}
		else {
			reviewResponse.setSuccess(false);
			reviewResponse.setVisitingTimeId(reviewDto.getVisitingTimeId());
		}
		return reviewResponse;
		
		
	}
}
