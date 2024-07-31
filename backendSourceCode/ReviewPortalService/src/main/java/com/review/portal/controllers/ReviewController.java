package com.review.portal.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.review.portal.dtos.ReviewDto;
import com.review.portal.dtos.ReviewResponseDto;
import com.review.portal.entities.Review;
import com.review.portal.services.ReviewService;

@RestController
@RequestMapping("/action/review")
public class ReviewController {

	
	private ReviewService reviewService;
	
	
	public ReviewController(ReviewService reviewService) {
		super();
		this.reviewService = reviewService;
	}


	@PostMapping("/save")
	public ReviewResponseDto saveReview(@RequestBody ReviewDto reviewDto) {
		return reviewService.createReview(reviewDto);
	}
}
