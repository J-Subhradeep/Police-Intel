package com.police.portal.repositories;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.police.portal.entities.Visitors;

public interface VisitorRepository extends JpaRepository<Visitors, Long>{
	List<Visitors> findByVisitorNameContainingIgnoringCase(String visitorName);
	Optional<Visitors> findFirstByVisitorEmail(String visitorEmail);
	Optional<Visitors> findFirstByVisitorPhone(String visitorPhone);
	List<Visitors> findByVisitorEmail(String visitorEmail);
	List<Visitors> findByVisitorPhone(String visitorPhone);
	List<Visitors> findByTimestampBetween(ZonedDateTime startDateTime, ZonedDateTime endDateTime);
	Optional<Visitors> findFirstByVisitorEmailOrVisitorPhone(String visitorEmail,String visitorPhone);
} 
