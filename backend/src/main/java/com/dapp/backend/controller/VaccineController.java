package com.dapp.backend.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dapp.backend.annotation.ApiMessage;
import com.dapp.backend.exception.InvalidException;
import com.dapp.backend.model.Vaccine;
import com.dapp.backend.model.response.Pagination;
import com.dapp.backend.service.VaccineService;
import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/vaccines")
public class VaccineController {

    private final VaccineService vaccineService;

    public VaccineController(VaccineService vaccineService) {
        this.vaccineService = vaccineService;
    }

    @GetMapping("/{id}")
    @ApiMessage("Get a vaccine by id")
    public ResponseEntity<Vaccine> getVaccineById(@PathVariable Long id) throws InvalidException {
        return ResponseEntity.ok().body(vaccineService.getVaccineById(id));
    }

    @GetMapping
    @ApiMessage("Get all vaccines")
    public ResponseEntity<Pagination> getAllVaccines(@Filter Specification<Vaccine> specification,
            Pageable pageable) {
        specification = Specification.where(specification).and((root, query, criteriaBuilder) -> criteriaBuilder
                .equal(root.get("isDeleted"), false));
        return ResponseEntity.ok().body(vaccineService.getAllVaccines(specification, pageable));
    }

    @PostMapping
    @ApiMessage("Create a new vaccine")
    public ResponseEntity<Vaccine> createVaccine(@Valid @RequestBody Vaccine vaccine) throws InvalidException {
        return ResponseEntity.status(HttpStatus.CREATED).body(vaccineService.createVaccine(vaccine));
    }

    @PutMapping("/{id}")
    @ApiMessage("Update a vaccine")
    public ResponseEntity<Vaccine> updateVaccine(@PathVariable Long id, @Valid @RequestBody Vaccine vaccine) throws InvalidException {
        return ResponseEntity.ok().body(vaccineService.updateVaccine(id, vaccine));
    }

    @DeleteMapping("/{id}")
    @ApiMessage("Delete a vaccine")
    public void deleteVaccine(@PathVariable Long id) throws InvalidException {
        vaccineService.deleteVaccine(id);
    }
    
}
