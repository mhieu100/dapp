package com.dapp.backend.model.response;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResCenter {
    Long centerId;
    String name;
    String image;
    String address;
    String phoneNumber;
    int capacity;
    String workingHours;
}
