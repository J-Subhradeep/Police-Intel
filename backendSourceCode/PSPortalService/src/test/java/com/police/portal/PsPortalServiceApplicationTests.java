package com.police.portal;

import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.police.portal.entities.Visitors;
import com.police.portal.repositories.VisitorRepository;

@SpringBootTest
class PsPortalServiceApplicationTests {

	@Autowired
	private VisitorRepository visitorRepository;
	
	@Test
	void contextLoads() {
	}
	
//	@Test
//	void loadVisitor() {
//		Visitors vis = new Visitors();
//		vis.setVisitorName("may 10 Visitor");
//		vis.setTimestamp(LocalDateTime.of(2023,Month.MAY,12,10,0));
//		visitorRepository.save(vis);
		
//	}
	
//	@Test
//	void testDateFinder() {
//		LocalDateTime startDateTime = LocalDateTime.of(2023,Month.APRIL,12,10,0);
//		LocalDateTime endDateTime = LocalDateTime.now();
//		List<Visitors> visitors = visitorRepository.findByTimestampBetween(startDateTime, endDateTime);
//		visitors.forEach(System.out::println);
//	}
	@Test
	void testTimezone() {
		System.out.println(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")));
	}

}
