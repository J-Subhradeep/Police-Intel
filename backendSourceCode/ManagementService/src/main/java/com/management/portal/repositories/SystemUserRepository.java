package com.management.portal.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.portal.entities.SystemUsers;

public interface SystemUserRepository extends JpaRepository<SystemUsers, Long>{
	Optional<SystemUsers> findByUserName(String username);
}
