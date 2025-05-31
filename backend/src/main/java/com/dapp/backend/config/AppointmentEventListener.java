// package com.dapp.backend.config;

// import org.springframework.stereotype.Component;
// import org.web3j.model.VaccineAppointment;
// import org.web3j.protocol.core.DefaultBlockParameterName;

// import jakarta.annotation.PostConstruct;
// import lombok.AllArgsConstructor;

// @Component
// @AllArgsConstructor
// public class AppointmentEventListener {

//     private final VaccineAppointment contract;

//     @PostConstruct
//     public void subscribeToEvents() {
//         // Listen for AppointmentCreated events
//         contract.appointmentCreatedEventFlowable(
//                 DefaultBlockParameterName.EARLIEST,
//                 DefaultBlockParameterName.LATEST)
//                 .subscribe(event -> {
//                     System.out.println("New appointment created: " + event.appointmentId);
//                     // Add your business logic here
//                 });

//         // Listen for AppointmentUpdated events
//         contract.appointmentUpdatedEventFlowable(
//                 DefaultBlockParameterName.EARLIEST,
//                 DefaultBlockParameterName.LATEST)
//                 .subscribe(event -> {
//                     System.out.println("Appointment updated: " + event.appointmentId);
//                     // Add your business logic here
//                 });

//         // Listen for StatusUpdated events
//         contract.statusUpdatedEventFlowable(
//                 DefaultBlockParameterName.EARLIEST,
//                 DefaultBlockParameterName.LATEST)
//                 .subscribe(event -> {
//                     System.out.println("Status updated for appointment: " + event.appointmentId);
//                     // Add your business logic here
//                 });
//     }
// }