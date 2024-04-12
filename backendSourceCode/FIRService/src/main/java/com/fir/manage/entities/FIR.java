package com.fir.manage.entities;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fir.manage.entities.helper.Accused;
import com.fir.manage.entities.helper.Victim;

import lombok.Data;

@Data
@Document(collection = "FIR")
public class FIR{
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
	private List<Accused> accused_list;
	private List<Victim> victim_list;
	private String description;
	private String act_section;
	private List<String> crime_catagory_list;
	private String submissionTime;
	private Boolean isClosed;
}

