package com.police.portal.dtos;

import java.time.ZonedDateTime;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VisitingTimeDto {
	private Long visitorId;
	private Long policeStationId;
}
