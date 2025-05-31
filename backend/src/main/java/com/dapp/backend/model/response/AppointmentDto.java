package com.dapp.backend.model.response;
import lombok.Data;

import java.math.BigInteger;

@Data
public class AppointmentDto {
    private BigInteger appointmentId;
    private String vaccineName;
    private String patientAddress;
    private String doctorAddress;
    private String cashierAddress;
    private String centerName;
    private String date;
    private String time;
    private int price;
    private BigInteger status;
}