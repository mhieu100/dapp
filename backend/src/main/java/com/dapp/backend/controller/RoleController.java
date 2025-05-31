package com.dapp.backend.controller;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dapp.backend.annotation.ApiMessage;
import com.dapp.backend.exception.InvalidException;
import com.dapp.backend.model.Role;
import com.dapp.backend.model.response.Pagination;
import com.dapp.backend.service.RoleService;
import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping("/roles")
    @ApiMessage("Get all roles")
    public ResponseEntity<Pagination> getRoles(
            @Filter Specification<Role> spec, Pageable pageable) {
        return ResponseEntity.ok(this.roleService.getRoles(spec, pageable));
    }

    @PutMapping("/roles/{id}")
    @ApiMessage("Update a role")
    public ResponseEntity<Role> updateRole(@PathVariable long id ,@Valid @RequestBody Role role) throws InvalidException {
        // check id
        if (this.roleService.fetchById(id) == null) {
            throw new InvalidException("Role với id = " + role.getId() + " không tồn tại");
        }
        
        return ResponseEntity.ok().body(this.roleService.updateRole(id ,role));
    }

}
