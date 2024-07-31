package com.fir.manage.repository;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fir.manage.entities.Chargesheet;

public interface ChargesheetRepository extends MongoRepository<Chargesheet, String>{
	Optional<ArrayList<Chargesheet>> findByFirId(String FIRId);
}

