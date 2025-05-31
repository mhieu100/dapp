package com.dapp.backend.controller;

import lombok.RequiredArgsConstructor;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.web3j.model.VaccineAppointment.Appointment;

import com.dapp.backend.annotation.ApiMessage;
import com.dapp.backend.model.Payment;
import com.dapp.backend.model.mapper.AppointmentMapper;
import com.dapp.backend.model.request.ProcessAppointment;
import com.dapp.backend.model.request.ReqAppointment;
import com.dapp.backend.model.response.AppointmentDto;
import com.dapp.backend.service.AppointmentService;
import com.dapp.backend.service.UserService;

import jakarta.servlet.http.HttpSession;
        
@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {
        private final AppointmentService appointmentService;
        private final UserService userService;

        @PostMapping("/meta-mark")
        @ApiMessage("Create a appointments with metamark")
        public ResponseEntity<String> createAppointmentWithMetaMark(@RequestBody ReqAppointment reqAppointment,
                        HttpSession session)
                        throws Exception {
                String walletAddress = (String) session.getAttribute("walletAddress");
                return ResponseEntity.ok()
                                .body(appointmentService.createAppointmentWithMetaMark(reqAppointment, walletAddress));
        }

        @GetMapping("/{id}")
        @ApiMessage("Get appointment by id")
        public ResponseEntity<AppointmentDto> getAppointmentById(@PathVariable long id) throws Exception {
                Appointment appointment = appointmentService.getAppointment(BigInteger.valueOf(id));
                return ResponseEntity.ok().body(AppointmentMapper.toDto(appointment));
        }

        @GetMapping
        @ApiMessage("Get all appointments of center")
        public ResponseEntity<List<AppointmentDto>> getAllAppointmentsOfCenter(HttpSession session) throws Exception {
                String walletAddress = (String) session.getAttribute("walletAddress");
                String centerName = this.userService.getUserByWalletAddress(walletAddress).get().getCenter().getName();
                List<Appointment> appointments = appointmentService.getAppointmentsByCenter(centerName);
                List<AppointmentDto> dtos = appointments.stream()
                                .map(AppointmentMapper::toDto)
                                .collect(Collectors.toList());
                return ResponseEntity.ok().body(dtos);
        }

        @GetMapping("/all")
        @ApiMessage("Get all appointments")
        public ResponseEntity<List<AppointmentDto>> getAllAppointments() throws Exception {
                List<Appointment> appointments = appointmentService.getAllAppointments();
                List<AppointmentDto> dtos = appointments.stream()
                                .map(AppointmentMapper::toDto)
                                .collect(Collectors.toList());
                return ResponseEntity.ok().body(dtos);
        }

        @GetMapping("/my-schedule")
        @ApiMessage("Get all appointments of doctor")
        public ResponseEntity<List<AppointmentDto>> getAllAppointmentsOfDoctor(HttpSession session) throws Exception {
                String walletAddress = (String) session.getAttribute("walletAddress");
                List<Appointment> appointments = appointmentService.getAppointmentsByDoctor(walletAddress);
                List<AppointmentDto> dtos = appointments.stream()
                                .map(AppointmentMapper::toDto)
                                .collect(Collectors.toList());
                return ResponseEntity.ok().body(dtos);
        }

        @PutMapping("/{id}")
        @ApiMessage("Update a appointment of cashier")
        public ResponseEntity<String> updateAppointmentOfCashier(@PathVariable long id,
                        @RequestBody ProcessAppointment processAppointment,
                        HttpSession session) throws Exception {
                String cashierWalletAddress = (String) session.getAttribute("walletAddress");
                return ResponseEntity.ok().body(appointmentService.processAppointment(BigInteger.valueOf(id),
                                processAppointment.getDoctorAddress(), cashierWalletAddress));
        }

        @PutMapping("/{id}/complete")
        @ApiMessage("Complete a appointment")
        public ResponseEntity<String> completeAppointment(@PathVariable long id) throws Exception {
                return ResponseEntity.ok().body(appointmentService.completeAppointment(BigInteger.valueOf(id)));
        }

        @PutMapping("/{id}/cancel")
        @ApiMessage("Cancel a appointment")
        public ResponseEntity<String> cancelAppointment(@PathVariable long id , HttpSession session) throws Exception {
                String walletAddress = (String) session.getAttribute("walletAddress");
                return ResponseEntity.ok().body(appointmentService.cancelAppointment(walletAddress, BigInteger.valueOf(id)));
        }

        @GetMapping("/{id}/refund")
        @ApiMessage("Refund a appointment")
        public ResponseEntity<String> refundAppointment(@PathVariable long id) throws Exception {
                return ResponseEntity.ok().body(appointmentService.refundAppointment(BigInteger.valueOf(id)));
        }

        @PostMapping("/verify")
        @ApiMessage("Verify a appointment")
        public ResponseEntity<String> verifyAppointment(@RequestBody Payment payment) throws Exception {
                return ResponseEntity.ok().body(appointmentService.verifyAppointment(payment));
        }

        @GetMapping("/{id}/verify")
        @ApiMessage("Verify a appointment")
        public ResponseEntity<Payment> verifyAppointment(@PathVariable long id) throws Exception {
                return ResponseEntity.ok().body(appointmentService.verifyAppointment(BigInteger.valueOf(id)));
        }
}
