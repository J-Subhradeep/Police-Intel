package com.fir.manage.external.services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.fir.manage.dtos.FileDto;

@FeignClient(url = "https://api.web-project.in", name = "FILE-SERVICE")
public interface FileClient {
	@PostMapping(value = "/files/upload",consumes = "multipart/form-data")
	FileDto uploadFile(@RequestPart("files") MultipartFile[] files);
}
