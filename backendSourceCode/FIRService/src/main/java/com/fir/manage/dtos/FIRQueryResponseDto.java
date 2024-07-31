package com.fir.manage.dtos;

import lombok.Data;

@Data
public class FIRQueryResponseDto {
	String status;
	String lastUpdateTitle;
	String lastUpdateDescription;
	String IOName;
	String complainantName;
	String chargesheetTitle;
	String chargesheetDescription;
}
