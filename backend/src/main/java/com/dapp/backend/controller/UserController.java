package com.dapp.backend.controller;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dapp.backend.annotation.ApiMessage;
import com.dapp.backend.exception.InvalidException;
import com.dapp.backend.model.User;
import com.dapp.backend.model.request.ReqUser;
import com.dapp.backend.model.response.Pagination;
import com.dapp.backend.model.response.ResUser;
import com.dapp.backend.service.UserService;
import com.turkraft.springfilter.boot.Filter;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @ApiMessage("Get all users")
    public ResponseEntity<Pagination> getAllUsers(@Filter Specification<User> specification,
            Pageable pageable) {
                specification = Specification.where(specification).and((root, query, criteriaBuilder) -> criteriaBuilder
                                .equal(root.get("isDeleted"), false));
        return ResponseEntity.ok().body(userService.getAllUsers(specification, pageable));
    }

    @GetMapping("/doctors")
    @ApiMessage("Get all doctors of center")
    public ResponseEntity<Pagination> getAllDoctorsOfCenter(@Filter Specification<User> specification,
            Pageable pageable, HttpSession session) {
        String walletAddress = (String) session.getAttribute("walletAddress");
        String centerName = this.userService.getUserByWalletAddress(walletAddress).get().getCenter().getName();
        specification = Specification.where(specification).and((root, query, criteriaBuilder) -> criteriaBuilder
                .equal(root.get("role").get("name"), "DOCTOR")).and(specification).and((root, query, criteriaBuilder) -> criteriaBuilder
                .equal(root.get("center").get("name"), centerName));
        return ResponseEntity.ok().body(userService.getAllUsers(specification, pageable));
    }

    @PutMapping("/{walletAddress}")
    @ApiMessage("Update a user")
    public ResponseEntity<ResUser> updateUser(@PathVariable String walletAddress, @Valid @RequestBody ReqUser reqUser)
            throws InvalidException {
                System.out.println("hello");
        return ResponseEntity.ok().body(userService.updateUser(walletAddress, reqUser));
    }

    @DeleteMapping("/{walletAddress}")
    @ApiMessage("Delete a user")
    public void deleteUser(@PathVariable String walletAddress) throws InvalidException {
        userService.deleteUser(walletAddress);
    }
}
