package com.dapp.backend.model.response;
import java.time.LocalDate;


import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResUser {
    String walletAddress;
    String fullname;
    String email;
    String phoneNumber;
    LocalDate birthday;
    String address;
    String centerName;
    String roleName;
}
