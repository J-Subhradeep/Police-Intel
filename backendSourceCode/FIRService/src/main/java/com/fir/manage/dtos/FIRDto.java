package com.fir.manage.dtos;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class FIRDto{
	private UUID id;
	private long io_id;
	private String io_name;
	private String io_designation;
	private long ps_id;
	private String ps_name;
	private String occurrence_date_time_from;
	private String occurrence_date_time_to;
	private String FIR_type;
	private String place_of_incident;
	private String complainant_name;
	private String complainant_phone_number;
	private List<AccusedDto> accused_list;
	private List<VictimDto> victim_list;
	private String description;
	private String act_section;
	private List<String> crime_catagory_list;
	private String submissionTime;
	private Boolean investigationStarted;
	private String investigationStartDate;
	private Boolean isClosed;
	private String closedDate;
}

