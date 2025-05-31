package com.dapp.backend.service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.dapp.backend.exception.InvalidException;
import com.dapp.backend.model.Center;
import com.dapp.backend.model.response.Pagination;
import com.dapp.backend.model.response.ResCenter;
import com.dapp.backend.repository.CenterRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CenterService {
    private final CenterRepository centerRepository;

    public ResCenter convertToResCenter(Center center) {
        ResCenter res = new ResCenter();
        res.setCenterId(center.getCenterId());
        res.setName(center.getName());
        res.setImage(center.getImage());
        res.setAddress(center.getAddress());
        res.setPhoneNumber(center.getPhoneNumber());
        res.setCapacity(center.getCapacity());
        res.setWorkingHours(center.getWorkingHours());
        return res;
    }

    public ResCenter getCenterById(Long id) throws InvalidException {
        return convertToResCenter(centerRepository.findById(id)
                .orElseThrow(() -> new InvalidException("Vaccination Center not found with id: " + id)));
    }

    public Pagination getAllCenters(Specification<Center> specification, Pageable pageable) {
        Page<Center> pageVaccinationCenter = centerRepository.findAll(specification, pageable);
        Pagination pagination = new Pagination();
        Pagination.Meta meta = new Pagination.Meta();

        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());

        meta.setPages(pageVaccinationCenter.getTotalPages());
        meta.setTotal(pageVaccinationCenter.getTotalElements());

        pagination.setMeta(meta);

        List<ResCenter> listVaccinationCenters = pageVaccinationCenter.getContent()
                .stream().map(this::convertToResCenter)
                .collect(Collectors.toList());

        pagination.setResult(listVaccinationCenters);

        return pagination;
    }

    public Center createCenter(Center vaccinationCenter) throws InvalidException {
        if (centerRepository.existsByName(vaccinationCenter.getName())) {
            throw new InvalidException("Vaccination Center already exists with name: " + vaccinationCenter.getName());
        }
        return centerRepository.save(vaccinationCenter);
    }

    public ResCenter updateCenter(Long id, Center vaccinationCenter)
            throws InvalidException {
        if (!centerRepository.existsById(id)) {
            throw new InvalidException("Vaccination Center not found with id: " + id);
        }
        vaccinationCenter.setCenterId(id);
        return convertToResCenter(centerRepository.save(vaccinationCenter));
    }

    public void deleteCenter(Long id) throws InvalidException {
        if (!centerRepository.existsById(id)) {
            throw new InvalidException("Vaccination Center not found with id: " + id);
        }
        centerRepository.deleteById(id);
    }
}
