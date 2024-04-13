package com.fir.manage.repository;

import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.fir.manage.entities.FIR;


public interface FIRRepository extends MongoRepository<FIR, UUID>{

}

