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
import org.springframework.web.bind.annotation.RestController;

import com.dapp.backend.annotation.ApiMessage;
import com.dapp.backend.exception.InvalidException;
import com.dapp.backend.model.Permission;
import com.dapp.backend.model.response.Pagination;
import com.dapp.backend.service.PermissionService;
import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PermissionController {

    private final PermissionService permissionService;

    @PostMapping("/permissions")
    @ApiMessage("Create a permission")
    public ResponseEntity<Permission> createPermission(@Valid @RequestBody Permission permission)
            throws InvalidException {
        if (this.permissionService.isPermissionExist(permission)) {
            throw new InvalidException("Permission đã tồn tại.");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(this.permissionService.createPermission(permission));
    }

    @GetMapping("/permissions")
    @ApiMessage("Get all permissions")
    public ResponseEntity<Pagination> getPermissions(
            @Filter Specification<Permission> spec, Pageable pageable) {
        return ResponseEntity.ok(this.permissionService.getPermissions(spec, pageable));
    }

    @PutMapping("/permissions")
    @ApiMessage("Update a permission")
    public ResponseEntity<Permission> updatePermission(@Valid @RequestBody Permission permission) throws InvalidException {
        if (this.permissionService.getPermissionById(permission.getId()) == null) {
            throw new InvalidException("Permission với id = " + permission.getId() + " không tồn tại.");
        }

        if (this.permissionService.isPermissionExist(permission)) {
            if (this.permissionService.isSameName(permission)) {
                throw new InvalidException("Permission đã tồn tại.");
            }
        }
        return ResponseEntity.ok().body(this.permissionService.updatePermission(permission));
    }

    @DeleteMapping("/permissions/{id}")
    @ApiMessage("Delete a permission")
    public ResponseEntity<Void> deletePermission(@PathVariable long id) throws InvalidException {
        if (this.permissionService.getPermissionById(id) == null) {
            throw new InvalidException("Permission với id = " + id + " không tồn tại.");
        }
        this.permissionService.deletePermission(id);
        return ResponseEntity.ok().body(null);
    }
}
