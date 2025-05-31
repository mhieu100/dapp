package com.dapp.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dapp.backend.exception.InvalidException;
import com.dapp.backend.model.User;
import com.dapp.backend.model.request.ReqUser;
import com.dapp.backend.model.response.ResLogin;
import com.dapp.backend.repository.RoleRepository;
import com.dapp.backend.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public User registerUser(ReqUser reqUser) throws InvalidException {
        Optional<User> existUser = userRepository.findByWalletAddress(reqUser.getWalletAddress());
        if (existUser.isPresent()) {
            throw new InvalidException("Usser already exist");

        }
        User user = new User();
        user.setWalletAddress(reqUser.getWalletAddress());
        user.setFullname(reqUser.getFullname());
        user.setEmail(reqUser.getEmail());
        user.setPhoneNumber(reqUser.getPhoneNumber());
        user.setBirthday(reqUser.getBirthday());
        user.setAddress(reqUser.getAddress());
        user.setRole(roleRepository.findByName("PATIENT"));
        return userRepository.save(user);
    }

    public ResLogin loginUser(String walletAddress) throws InvalidException {
        Optional<User> currentUserDB = userRepository.findByWalletAddress(walletAddress);
        if (!currentUserDB.isPresent()) {
            throw new InvalidException("Not found user");

        }
        ResLogin.UserLogin userLogin = new ResLogin.UserLogin(
                currentUserDB.get().getWalletAddress() != null ? currentUserDB.get().getWalletAddress().toLowerCase() : null,
                currentUserDB.get().getEmail(),
                currentUserDB.get().getFullname(),
                currentUserDB.get().getAddress(),
                currentUserDB.get().getPhoneNumber(),
                currentUserDB.get().getBirthday(),
                currentUserDB.get().getCenter() == null ? null : currentUserDB.get().getCenter().getName(),
                currentUserDB.get().getRole().getName());

        ResLogin resLogin = new ResLogin();
        resLogin.setUser(userLogin);
        return resLogin;
    }
}
