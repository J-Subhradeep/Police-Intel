package com.fir.manage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class FirServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FirServiceApplication.class, args);
	}

}
