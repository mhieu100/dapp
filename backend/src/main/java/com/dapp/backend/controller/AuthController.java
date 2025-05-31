package com.dapp.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.dapp.backend.annotation.ApiMessage;
import com.dapp.backend.exception.InvalidException;
import com.dapp.backend.model.User;
import com.dapp.backend.model.mapper.AppointmentMapper;
import com.dapp.backend.model.request.ReqUser;
import com.dapp.backend.model.response.AppointmentDto;
import com.dapp.backend.model.response.ResLogin;
import com.dapp.backend.service.AppointmentService;
import com.dapp.backend.service.AuthService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.web3j.model.VaccineAppointment.Appointment;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AppointmentService appointmentService;

    @PostMapping("/register")
    @ApiMessage("Register new account")
    public ResponseEntity<User> registerUser(@RequestBody ReqUser reqUser) throws InvalidException {
        return ResponseEntity.ok().body(authService.registerUser(reqUser));
    }

    @PostMapping("/login")
    @ApiMessage("Login account")
    public ResponseEntity<ResLogin> loginUser(@RequestBody User user, HttpSession session) throws InvalidException {
        session.setAttribute("walletAddress", user.getWalletAddress() != null ? user.getWalletAddress().toLowerCase() : null);
        return ResponseEntity.ok().body(authService.loginUser(user.getWalletAddress()));
    }

    @GetMapping("/account")
    @ApiMessage("Get profile")
    public ResponseEntity<ResLogin> getProfile(HttpSession session) throws InvalidException {
        String walletAddress = (String) session.getAttribute("walletAddress");
        return ResponseEntity.ok().body(authService.loginUser(walletAddress));
    }

    @GetMapping("/my-appointments")
    @ApiMessage("Get all appointments of patient")
    public ResponseEntity<List<AppointmentDto>> getAllAppointmentsOfUser(HttpSession session) throws Exception {
        String walletAddress = (String) session.getAttribute("walletAddress");
        List<Appointment> appointments = appointmentService.getAppointmentsByPatient(walletAddress);
        List<AppointmentDto> dtos = appointments.stream()
                .map(AppointmentMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(dtos);
    }

    @PostMapping("/logout")
    @ApiMessage("Logout account")
    public void logoutUser(HttpSession session) {
        session.removeAttribute("walletAddress");
    }
}
