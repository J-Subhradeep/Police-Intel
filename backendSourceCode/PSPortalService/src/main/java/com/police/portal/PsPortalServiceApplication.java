package com.police.portal;

import java.util.TimeZone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class PsPortalServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PsPortalServiceApplication.class, args);
	}

}
