package com.dapp.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "vaccines")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Vaccine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long vaccineId;
    @NotBlank(message = "Manufacturer cannot be blank")
    private String manufacturer;
    private String schedule;
    @NotBlank(message = "Efficacy cannot be blank")
    private String efficacy;
    @NotBlank(message = "Disease cannot be blank")
    private String disease;
    @NotBlank(message = "Vaccine name cannot be blank")
    private String name;
    @NotBlank(message = "Country type cannot be blank")
    private String country;
    @NotBlank(message = "Price cannot be blank")
    private String price;
    @NotBlank(message = "Target cannot be blank")
    private String target;
    @NotNull(message = "Stock quantity cannot be null")
    @Min(value = 0, message = "Stock quantity must be greater than or equal to 0")
    private int stockQuantity;
    @NotNull(message = "Dosage cannot be null")
    @Min(value = 1, message = "Dosage must be greater than or equal to 1")
    private int dosage;
    @NotBlank(message = "Description cannot be blank")
    private String description;
    private boolean isDeleted;
}
