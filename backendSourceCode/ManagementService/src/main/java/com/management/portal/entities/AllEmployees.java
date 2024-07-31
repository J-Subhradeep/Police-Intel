package com.management.portal.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="all_employees")
@Data
public class AllEmployees {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String userName;
	private String role;
	private String photo;
	private long policeStationId;
	private long districtId;
	private long superiorId;
	private String password;
}
