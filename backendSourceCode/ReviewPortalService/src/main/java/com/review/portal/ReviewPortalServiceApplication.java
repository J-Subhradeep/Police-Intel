package com.review.portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ReviewPortalServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReviewPortalServiceApplication.class, args);
	}

}
