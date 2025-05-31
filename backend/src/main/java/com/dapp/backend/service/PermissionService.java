package com.dapp.backend.service;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.dapp.backend.model.Permission;
import com.dapp.backend.model.response.Pagination;
import com.dapp.backend.repository.PermissionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PermissionService {
    private final PermissionRepository permissionRepository;

    public boolean isPermissionExist(Permission permission) {
        return permissionRepository.existsByModuleAndApiPathAndMethod(
                permission.getModule(),
                permission.getApiPath(),
                permission.getMethod());
    }

    public Pagination getPermissions(Specification<Permission> spec, Pageable pageable) {
        Page<Permission> pPermissions = this.permissionRepository.findAll(spec, pageable);
        Pagination rs = new Pagination();
        Pagination.Meta mt = new Pagination.Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());

        mt.setPages(pPermissions.getTotalPages());
        mt.setTotal(pPermissions.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(pPermissions.getContent());
        return rs;
    }

    public Permission createPermission(Permission permission) {
        return permissionRepository.save(permission);
    }

    public Permission updatePermission(Permission permission) {
        Permission permissionDB = this.permissionRepository.findById(permission.getId()).get();
        if (permissionDB != null) {
            permissionDB.setName(permission.getName());
            permissionDB.setModule(permission.getModule());
            permissionDB.setApiPath(permission.getApiPath());
            permissionDB.setMethod(permission.getMethod());
        }
        return permissionRepository.save(permission);
    }

    public void deletePermission(Long id) {
        // delete permission_role
        Optional<Permission> permissionOptional = this.permissionRepository.findById(id);
        Permission currentPermission = permissionOptional.get();
        currentPermission.getRoles().forEach(role -> role.getPermissions().remove(currentPermission));

        // delete permission
        this.permissionRepository.delete(currentPermission);
    }

    public Permission getPermissionById(long id) {
        return this.permissionRepository.findById(id).get();
    }

    public boolean isSameName(Permission permission) {
        Permission permissionDB = this.getPermissionById(permission.getId());
        if (permissionDB != null) {
            if (permissionDB.getName().equals(permission.getName()))
                return true;
        }
        return false;
    }
}
