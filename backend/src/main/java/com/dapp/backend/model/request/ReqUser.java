package com.dapp.backend.model.request;

import java.time.LocalDate;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReqUser {
    String walletAddress;
    String fullname;
    String email;
    String phoneNumber;
    LocalDate birthday;
    String address;
    String centerName;
    String roleName;
    boolean isDeleted;
}
