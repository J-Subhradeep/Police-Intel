package com.review.portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.review.portal.entities.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}
