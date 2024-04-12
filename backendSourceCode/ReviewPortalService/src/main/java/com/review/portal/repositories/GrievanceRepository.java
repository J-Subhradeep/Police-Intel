package com.review.portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.portal.entities.Grievance;

public interface GrievanceRepository extends JpaRepository<Grievance, Long> {

}
