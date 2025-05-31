package com.dapp.backend.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class User {
    @Id
    String walletAddress;
    String fullname;
    String email;
    String phoneNumber;
    LocalDate birthday;
    String address;
    boolean isDeleted;
    @ManyToOne
    @JoinColumn(name = "center_id")
    Center center;
    @ManyToOne
    @JoinColumn(name = "role_id")
    Role role;
}
