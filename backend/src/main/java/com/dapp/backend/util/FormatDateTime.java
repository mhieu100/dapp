package com.dapp.backend.util;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;


public class FormatDateTime {
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE; // "yyyy-MM-dd"
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ISO_LOCAL_TIME; // "HH:mm:ss"

    public static String convertDateToString(LocalDate date) {
        return date.format(DATE_FORMATTER);
    }

    public static String convertTimeToString(LocalTime time) {
        return time.format(TIME_FORMATTER);
    }

     // Chuyển String → LocalDate (ngược lại)
     public static LocalDate parseStringToDate(String dateString) throws DateTimeParseException {
        return LocalDate.parse(dateString, DATE_FORMATTER);
    }

    // Chuyển String → LocalTime (ngược lại)
    public static LocalTime parseStringToTime(String timeString) throws DateTimeParseException {
        return LocalTime.parse(timeString, TIME_FORMATTER);
    }

}
