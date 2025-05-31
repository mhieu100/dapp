package com.dapp.backend.service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.dapp.backend.model.Permission;
import com.dapp.backend.model.Role;
import com.dapp.backend.model.response.Pagination;
import com.dapp.backend.repository.PermissionRepository;
import com.dapp.backend.repository.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    public Pagination getRoles(Specification<Role> spec, Pageable pageable) {
        Page<Role> pageRole = this.roleRepository.findAll(spec, pageable);
        Pagination rs = new Pagination();
        Pagination.Meta mt = new Pagination.Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());

        mt.setPages(pageRole.getTotalPages());
        mt.setTotal(pageRole.getTotalElements());

        rs.setMeta(mt);
        rs.setResult(pageRole.getContent());
        return rs;
    }

    public Role fetchById(long id) {
        Optional<Role> roleOptional = this.roleRepository.findById(id);
        return roleOptional.orElse(null);
    }

    public Role updateRole(long id, Role role) {
        Role roleDB = this.fetchById(id);
        // check permissions
        if (role.getPermissions() != null) {
            List<Long> reqPermissions = role.getPermissions()
                    .stream().map(Permission::getId)
                    .collect(Collectors.toList());

            List<Permission> dbPermissions = this.permissionRepository.findByIdIn(reqPermissions);
            roleDB.setPermissions(dbPermissions);
        }

        roleDB.setName(role.getName());
        roleDB = this.roleRepository.save(roleDB);
        return roleDB;
    }

}
