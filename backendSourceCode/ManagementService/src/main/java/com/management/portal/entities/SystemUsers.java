package com.management.portal.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
@Entity
@Table(name="system_users")
@Data
public class SystemUsers {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;
	private Long psId; // only for police station admin users
	private String role;
	private String name;
	private String userName;
	private String userPassword;
	private String userAddress;
	private String profilePhoto;
	private Boolean isMobileUser;
	private Boolean isEmailUser;
	private Boolean isVerified;
}
