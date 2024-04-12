package com.management.portal.services;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import com.management.portal.entities.PoliceStation;

public class ExcelUploadService {
	public static boolean isValidExcelFile(MultipartFile file) {

		return Objects.equals(file.getContentType(),
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
	}

	public static List<PoliceStation> getPoliceStationsDataFromExcel(InputStream inputStream) throws IOException {

		List<PoliceStation> policeStations = new ArrayList<>();
		XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
		XSSFSheet sheet = workbook.getSheetAt(0);
		int rowIndex = 0;
		for (Row row : sheet) {
			if (rowIndex == 0) {
				rowIndex++;
				continue;
			}
			Iterator<Cell> cellIterator = row.iterator();
			int cellIndex = 0;
			PoliceStation ps = new PoliceStation();
			while (cellIterator.hasNext()) {
				Cell cell = cellIterator.next();
				switch (cellIndex) {

				case 0 -> ps.setPoliceStationName(cell.getStringCellValue());
				case 1 -> ps.setAddress(cell.getStringCellValue());
				case 2 -> ps.setCity(cell.getStringCellValue());
				case 3 -> ps.setState(cell.getStringCellValue());
				case 4 -> ps.setCountry(cell.getStringCellValue());
				case 5 -> ps.setCityId((long) cell.getNumericCellValue());
				
				}
				cellIndex++;
			}
			policeStations.add(ps);
			
		}
		return policeStations;
	}
}
