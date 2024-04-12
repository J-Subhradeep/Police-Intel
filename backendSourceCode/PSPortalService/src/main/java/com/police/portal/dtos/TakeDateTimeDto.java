package com.police.portal.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TakeDateTimeDto {
	private boolean hasStartDate;
	private int startYear;
	private int startMonth;
	private int startDay;
	private int startHour;
	private int startMinute;
	
	private boolean hasEndDate;
	private int endYear;
	private int endMonth;
	private int endDay;
	private int endHour;
	private int endMinute;
}
