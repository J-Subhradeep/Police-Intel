package com.fir.manage.repository;

import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fir.manage.entities.FIR;
import com.fir.manage.entities.FIRUpdate;


public interface FIRRepository extends MongoRepository<FIR, String>{
	Optional<FIR> findById(String FIRId);
}

