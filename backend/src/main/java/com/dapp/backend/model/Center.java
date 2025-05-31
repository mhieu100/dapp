package com.dapp.backend.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "centers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Center {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long centerId;
    @NotBlank(message = "Tên trung tâm tiêm chủng không được trống")
    String name;
    String image;
    @NotBlank(message = "Địa chỉ trung tâm tiêm chủng không được trống")
    String address;
    String phoneNumber;
    int capacity;
    @NotBlank(message = "Giờ làm việc không được trống")
    String workingHours;

    @OneToMany(mappedBy = "center")
    List<User> doctors;

    @OneToMany(mappedBy = "center")
    List<User> cashiers;
}
