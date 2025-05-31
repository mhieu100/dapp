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
import com.dapp.backend.model.Center;
import com.dapp.backend.model.response.Pagination;
import com.dapp.backend.model.response.ResCenter;
import com.dapp.backend.service.CenterService;
import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/centers")
@RequiredArgsConstructor
public class CenterController {

    private final CenterService centerService;

    @GetMapping("/{id}")
    @ApiMessage("Get a center by id")
    public ResponseEntity<ResCenter> getCenterById(@PathVariable Long id) throws InvalidException {
        return ResponseEntity.ok().body(centerService.getCenterById(id));
    }

    @GetMapping
    @ApiMessage("Get all centers")
    public ResponseEntity<Pagination> getAllCenters(@Filter Specification<Center> specification,
            Pageable pageable) {
        return ResponseEntity.ok().body(centerService.getAllCenters(specification, pageable));
    }

    @PostMapping
    @ApiMessage("Create a new center")
    public ResponseEntity<Center> createVaccine(@Valid @RequestBody Center center)
            throws InvalidException {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(centerService.createCenter(center));
    }

    @PutMapping("/{id}")
    @ApiMessage("Update a center")
    public ResponseEntity<ResCenter> updateCenter(@PathVariable Long id,
            @Valid @RequestBody Center center) throws InvalidException {
        return ResponseEntity.ok().body(centerService.updateCenter(id, center));
    }

    @DeleteMapping("/{id}")
    @ApiMessage("Delete a center")
    public void deleteVaccine(@PathVariable Long id) throws InvalidException {
        centerService.deleteCenter(id);
    }
}
