package com.police.portal.entities;

import java.time.ZonedDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "visiting_times")
public class VisitingTimes {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long visitorId;
	private ZonedDateTime visitDateTime;
	private Long policeStationId;
	private Boolean isReviewDone;
	private String visitorName;
	private String visitorEmail;
	private String visitorPhone;
	private String visitorAddress;
	
}
