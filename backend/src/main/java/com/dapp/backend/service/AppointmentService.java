package com.dapp.backend.service;

import lombok.RequiredArgsConstructor;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.web3j.model.VaccineAppointment;
import org.web3j.model.VaccineAppointment.Appointment;
import org.web3j.protocol.core.methods.response.TransactionReceipt;

import com.dapp.backend.model.Center;
import com.dapp.backend.model.Payment;
import com.dapp.backend.model.Vaccine;
import com.dapp.backend.model.request.ReqAppointment;
import com.dapp.backend.repository.CenterRepository;
import com.dapp.backend.repository.PaymentRepository;
import com.dapp.backend.repository.VaccineRepository;
import com.dapp.backend.util.FormatDateTime;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final VaccineRepository vaccineRepository;
    private final CenterRepository centerRepository;
    private final VaccineAppointment contract;
    private final PaymentRepository paymentRepository;

    public String createAppointmentWithMetaMark(ReqAppointment reqAppointment, String walletAddress) throws Exception {
        Vaccine vaccine = vaccineRepository.findById(reqAppointment.getVaccineId()).get();
        Center center = centerRepository.findById(reqAppointment.getCenterId()).get();
        String date = FormatDateTime.convertDateToString(reqAppointment.getDate());
        String time = FormatDateTime.convertTimeToString(reqAppointment.getTime());

        TransactionReceipt receipt = contract.createAppointment(vaccine.getName(), center.getName(), date,
                time, walletAddress, BigInteger.valueOf(reqAppointment.getPrice())).send();
        return receipt.getTransactionHash();
    }

    public Appointment getAppointment(BigInteger id) throws Exception {
        return contract.getAppointment(id).send();
    }

    public List<Appointment> getAllAppointments() throws Exception {
        return contract.getAllAppointments().send();
    }

    public List<Appointment> getAppointmentsByDoctor(String doctorAddress) throws Exception {
        return contract.getAppointmentsByDoctor(doctorAddress).send();
    }

    public List<Appointment> getAppointmentsByCenter(String centerName) throws Exception {
        return contract.getAppointmentsByCenter(centerName).send();
    }

    public List<Appointment> getAppointmentsByPatient(String patientAddress) throws Exception {
        return contract.getAppointmentsByPatient(patientAddress).send();
    }

    public String processAppointment(
            BigInteger appointmentId,
            String doctorAddress,
            String cashierAddress) throws Exception {
        TransactionReceipt receipt = contract.processAppointment(appointmentId, doctorAddress, cashierAddress).send();
        return "Appointment processed. Transaction hash: " +
                receipt.getTransactionHash();
    }

    public String completeAppointment(BigInteger id) throws Exception {
        TransactionReceipt receipt = contract.completeAppointment(id).send();
        return "Appointment completed. Transaction hash: " +
                receipt.getTransactionHash();
    }

    public String cancelAppointment(String walletAddress,BigInteger id) throws Exception {
        TransactionReceipt receipt = contract.cancelAppointment(walletAddress, id).send();
        return "Appointment cancelled. Transaction hash: " +
                receipt.getTransactionHash();
    }

    public String refundAppointment(BigInteger id) throws Exception {
        TransactionReceipt receipt = contract.refundAppointment(id).send();
        return "Appointment refunded. Transaction hash: " +
                receipt.getTransactionHash();
    }

    public String verifyAppointment(Payment payment) throws Exception {
        payment.setPaymentDateTime(LocalDateTime.now());
        paymentRepository.save(payment);
        return "Appointment saved";
    }
    
    public Payment verifyAppointment(BigInteger id) throws Exception {
        return paymentRepository.findById(id.longValue()).get();
    }
}
