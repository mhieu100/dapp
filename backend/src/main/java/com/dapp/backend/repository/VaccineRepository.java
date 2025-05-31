package com.dapp.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.dapp.backend.model.Vaccine;

public interface VaccineRepository extends JpaRepository<Vaccine, Long>, JpaSpecificationExecutor<Vaccine> {
    boolean existsByName(String vaccineName);
    List<Vaccine> findAllByName(String vaccineName);
    Vaccine findByName(String vaccineName);
}
