package com.dapp.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.dapp.backend.model.Center;


public interface CenterRepository extends JpaRepository<Center, Long>, JpaSpecificationExecutor<Center> {
    boolean existsByName(String name);
    Center findByName(String name);
}
