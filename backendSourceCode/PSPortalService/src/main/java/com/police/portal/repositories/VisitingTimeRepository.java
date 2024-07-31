package com.police.portal.repositories;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.police.portal.entities.VisitingTimes;


public interface VisitingTimeRepository extends JpaRepository<VisitingTimes, Long>{
	List<VisitingTimes> findByVisitDateTimeBetween(ZonedDateTime startDateTime, ZonedDateTime endDateTime);
	List<VisitingTimes> findByPoliceStationId(Long policeStationId);
	
}
