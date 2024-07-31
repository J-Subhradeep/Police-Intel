package com.police.portal.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DateTimeDto {
	private int year;
	private int month;
	private int day;
	private int hour;
	private int minute;
}
