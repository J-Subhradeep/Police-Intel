package com.fir.manage.repository;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fir.manage.entities.FIRUpdate;


public interface FIRUpdateRepository extends MongoRepository<FIRUpdate, String>{
	Optional<ArrayList<FIRUpdate>> findByFirId(String FIRId);
}
