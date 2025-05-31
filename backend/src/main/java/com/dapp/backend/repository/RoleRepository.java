package com.dapp.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.dapp.backend.model.Role;


public interface RoleRepository extends JpaRepository<Role, Long>, JpaSpecificationExecutor<Role>{
    Role findByName(String name);

}
