package com.review.portal.entities;

import java.time.ZonedDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="reviews")
@Data
@NoArgsConstructor
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Long visitorId;
	private Long visitingTimeId;
	private Long policeStationId;
	private String review;
	private String sentiment;
	private Boolean isPositive;
	private String review_timestamp;
	private Integer rating;
}
