package com.dapp.backend.model.response;


import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ResLogin {
    private UserLogin user;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class UserLogin {
        private String walletAddress;
        private String email;
        private String fullname;
        private String address;
        private String phoneNumber;
        private LocalDate birthday;
        private String centerName;
        private String roleName;
    }
  
}