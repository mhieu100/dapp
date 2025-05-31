// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VaccineAppointment {
    // Appointment status enum
    enum Status { PENDING, PROCESSING, COMPLETED, CANCELLED, REFUNDED }

    // Appointment struct
    struct Appointment {
        uint256 appointmentId;
        string vaccineName;
        address patientAddress;
        address doctorAddress;
        address cashierAddress;
        string centerName;
        string date;
        string time;
        uint256 price;
        Status status;
    }

    // State variables
    uint256 private appointmentCounter;
    mapping(uint256 => Appointment) private appointments;
    uint256[] private appointmentIds;

    // Events
    event AppointmentCreated(uint256 appointmentId, address patientAddress, string centerName, uint256 price);
    event AppointmentUpdated(uint256 appointmentId, address doctorAddress, address cashierAddress, Status status);
    event StatusUpdated(uint256 appointmentId, Status newStatus);
    event AppointmentRefunded(uint256 appointmentId, address patientAddress, uint256 price);

    constructor() {
        appointmentCounter = 1;
    }

    // Create a new appointment
    function createAppointment(
        string memory _vaccineName,
        string memory _centerName,
        string memory _date,
        string memory _time,
        address _patientAddress,
        uint256 _price
    ) public {
        require(_patientAddress != address(0), "Invalid patient address");

        uint256 newAppointmentId = appointmentCounter;
        
        appointments[newAppointmentId] = Appointment({
            appointmentId: newAppointmentId,
            vaccineName: _vaccineName,
            patientAddress: _patientAddress,
            doctorAddress: address(0),
            cashierAddress: address(0),
            centerName: _centerName,
            date: _date,
            time: _time,
            price: _price,
            status: Status.PENDING
        });

        appointmentIds.push(newAppointmentId);
        appointmentCounter++;

        emit AppointmentCreated(newAppointmentId, _patientAddress, _centerName, _price);
    }

    // Process an appointment by assigning doctor and cashier
    function processAppointment(
        uint256 _appointmentId,
        address _doctorAddress,
        address _cashierAddress
    ) public {
        require(appointments[_appointmentId].appointmentId != 0, "Appointment does not exist");
        require(
            appointments[_appointmentId].status == Status.PENDING,
            "Appointment must be in PENDING status"
        );

        appointments[_appointmentId].doctorAddress = _doctorAddress;
        appointments[_appointmentId].cashierAddress = _cashierAddress;
        appointments[_appointmentId].status = Status.PROCESSING;

        emit AppointmentUpdated(
            _appointmentId,
            _doctorAddress,
            _cashierAddress,
            Status.PROCESSING
        );
    }

    // Complete an appointment
    function completeAppointment(uint256 _appointmentId) public {
        require(appointments[_appointmentId].appointmentId != 0, "Appointment does not exist");
        require(
            appointments[_appointmentId].status == Status.PROCESSING,
            "Appointment must be in PROCESSING status"
        );

        appointments[_appointmentId].status = Status.COMPLETED;
        emit StatusUpdated(_appointmentId, Status.COMPLETED);
    }

    // Cancel an appointment
    function cancelAppointment(address _patientAddress ,uint256 _appointmentId) public {
        require(appointments[_appointmentId].appointmentId != 0, "Appointment does not exist");
        require(
            appointments[_appointmentId].status == Status.PENDING ||
            appointments[_appointmentId].status == Status.PROCESSING,
            "Appointment must be in PENDING or PROCESSING status"
        );
        require(
            _patientAddress == appointments[_appointmentId].patientAddress,
            "Only patient can cancel the appointment"
        );

        appointments[_appointmentId].status = Status.CANCELLED;
        emit StatusUpdated(_appointmentId, Status.CANCELLED);
    }

    // Refund an appointment
    function refundAppointment(uint256 _appointmentId) public {
        require(appointments[_appointmentId].appointmentId != 0, "Appointment does not exist");
        require(
            appointments[_appointmentId].status == Status.CANCELLED,
            "Appointment must be in CANCELLED status for refund"
        );

        appointments[_appointmentId].status = Status.REFUNDED;
        
        emit AppointmentRefunded(
            _appointmentId, 
            appointments[_appointmentId].patientAddress, 
            appointments[_appointmentId].price
        );
        emit StatusUpdated(_appointmentId, Status.REFUNDED);
    }

    // Get a specific appointment
    function getAppointment(uint256 _appointmentId) public view returns (Appointment memory) {
        require(appointments[_appointmentId].appointmentId != 0, "Appointment does not exist");
        return appointments[_appointmentId];
    }

    // Get all appointments
    function getAllAppointments() public view returns (Appointment[] memory) {
        Appointment[] memory allAppointments = new Appointment[](appointmentIds.length);
        
        for (uint256 i = 0; i < appointmentIds.length; i++) {
            allAppointments[i] = appointments[appointmentIds[i]];
        }
        
        return allAppointments;
    }

    // Get appointments by patient
    function getAppointmentsByPatient(address _patientAddress) public view returns (Appointment[] memory) {
        uint256 count = 0;
        
        for (uint256 i = 0; i < appointmentIds.length; i++) {
            if (appointments[appointmentIds[i]].patientAddress == _patientAddress) {
                count++;
            }
        }

        Appointment[] memory patientAppointments = new Appointment[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < appointmentIds.length; i++) {
            if (appointments[appointmentIds[i]].patientAddress == _patientAddress) {
                patientAppointments[index] = appointments[appointmentIds[i]];
                index++;
            }
        }

        return patientAppointments;
    }

    // Get appointments by center
    function getAppointmentsByCenter(string memory _centerName) public view returns (Appointment[] memory) {
        uint256 count = 0;
        
        for (uint256 i = 0; i < appointmentIds.length; i++) {
            if (keccak256(bytes(appointments[appointmentIds[i]].centerName)) == keccak256(bytes(_centerName))) {
                count++;
            }
        }

        Appointment[] memory centerAppointments = new Appointment[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < appointmentIds.length; i++) {
            if (keccak256(bytes(appointments[appointmentIds[i]].centerName)) == keccak256(bytes(_centerName))) {
                centerAppointments[index] = appointments[appointmentIds[i]];
                index++;
            }
        }

        return centerAppointments;
    }

    // Get appointments by doctor
    function getAppointmentsByDoctor(address _doctorAddress) public view returns (Appointment[] memory) {
        uint256 count = 0;
        
        for (uint256 i = 0; i < appointmentIds.length; i++) {
            if (appointments[appointmentIds[i]].doctorAddress == _doctorAddress) {
                count++;
            }
        }

        Appointment[] memory doctorAppointments = new Appointment[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < appointmentIds.length; i++) {
            if (appointments[appointmentIds[i]].doctorAddress == _doctorAddress) {
                doctorAppointments[index] = appointments[appointmentIds[i]];
                index++;
            }
        }

        return doctorAppointments;
    }

    // Get detailed information about an appointment
    function getAppointmentDetails(uint256 _appointmentId) public view returns (Appointment memory) {
        require(appointments[_appointmentId].appointmentId != 0, "Appointment does not exist");
        return appointments[_appointmentId];
    }

    // Clear all appointments
    function clearAllAppointments() public {
        // Reset counter
        appointmentCounter = 1;
        
        // Delete all appointments from mapping
        for (uint256 i = 0; i < appointmentIds.length; i++) {
            delete appointments[appointmentIds[i]];
        }
        
        // Clear the appointmentIds array
        delete appointmentIds;
    }
} 