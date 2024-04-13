package com.management.portal.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.portal.entities.AllEmployees;


public interface AllEmployeesRepository extends JpaRepository<AllEmployees, Long>{

	Optional<AllEmployees> findByUserName(String userName);

}
