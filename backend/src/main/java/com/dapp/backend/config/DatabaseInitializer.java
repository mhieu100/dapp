package com.dapp.backend.config;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import com.dapp.backend.model.Center;
import com.dapp.backend.model.Permission;
import com.dapp.backend.model.Role;
import com.dapp.backend.model.User;
import com.dapp.backend.repository.CenterRepository;
import com.dapp.backend.repository.PermissionRepository;
import com.dapp.backend.repository.RoleRepository;
import com.dapp.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final CenterRepository centerRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println(">>> START INIT DATABASE");
        long countRoles = this.roleRepository.count();
        long countUsers = this.userRepository.count();
        long countPermissions = this.permissionRepository.count();
        long countCenter = this.centerRepository.count();

        if (countPermissions == 0) {
            ArrayList<Permission> arr = new ArrayList<>();
            arr.add(new Permission("Get all appointments of center", "/appointments", "GET", "APPOINTMENT"));
            arr.add(new Permission("Update a appointment of cashier", "/appointments/{id}", "PUT", "APPOINTMENT"));
            arr.add(new Permission("Cancel a appointment", "/appointments/{id}/cancel", "PUT", "APPOINTMENT"));
            arr.add(new Permission("Complete a appointment", "/appointments/{id}/complete", "PUT", "APPOINTMENT"));
            arr.add(new Permission("Create a appointments with cash", "/appointments/cash", "POST", "APPOINTMENT"));
            arr.add(new Permission("Create a appointments with credit card", "/appointments/credit-card", "POST",
                    "APPOINTMENT"));
            arr.add(new Permission("Update status of payment", "/appointments/update-payment", "POST", "APPOINTMENT"));
            arr.add(new Permission("Get all appointments of doctor", "/appointments/my-schedule", "GET",
                    "APPOINTMENT"));

            arr.add(new Permission("Access profile", "/auth/account", "GET", "AUTH"));
            arr.add(new Permission("Get all appointments of user", "/auth/my-appointments", "GET", "AUTH"));

            arr.add(new Permission("Create a center", "/centers", "POST", "CENTER"));
            arr.add(new Permission("Get a center by id", "/centers/{id}", "GET", "CENTER"));
            arr.add(new Permission("Update a center", "/centers/{id}", "PUT", "CENTER"));
            arr.add(new Permission("Delete a center", "/centers/{id}", "DELETE", "CENTER"));

            arr.add(new Permission("Create a vaccine", "/vaccines", "POST", "VACCINE"));
            arr.add(new Permission("Get a vaccine by id", "/vaccines/{id}", "GET", "VACCINE"));
            arr.add(new Permission("Update a vaccine", "/vaccines/{id}", "PUT", "VACCINE"));
            arr.add(new Permission("Delete a vaccine", "/vaccines/{id}", "DELETE", "VACCINE"));

            arr.add(new Permission("Create a permission", "/permissions", "POST", "PERMISSION"));
            arr.add(new Permission("Get all permissions", "/permissions", "GET", "PERMISSION"));
            arr.add(new Permission("Update a permission", "/permissions", "PUT", "PERMISSION"));
            arr.add(new Permission("Delete a permission", "/permissions/{id}", "DELETE", "PERMISSION"));

            arr.add(new Permission("Update a user", "/users/{walletAddress}", "PUT", "USER"));
            arr.add(new Permission("Delete a user", "/users/{walletAddress}", "DELETE", "USER"));
            arr.add(new Permission("Get all users", "/users", "GET", "USER"));
            arr.add(new Permission("Get all doctors of center", "/users/doctors", "GET", "USER"));

            arr.add(new Permission("Get all roles", "/roles", "GET", "ROLE"));
            arr.add(new Permission("Update a role", "/roles/{id}", "PUT", "ROLE"));

            arr.add(new Permission("Upload a file", "/files", "GET", "FILE"));

            this.permissionRepository.saveAll(arr);
        }

        if (countCenter == 0) {
            Center hnCT = new Center();
            hnCT.setName("Trung Tâm Hà Nội");
            hnCT.setAddress("Hà Nội");
            hnCT.setCapacity(10);
            hnCT.setWorkingHours("8:00 - 17:00");
            this.centerRepository.save(hnCT);
            Center hcmCT = new Center();
            hcmCT.setName("Trung Tâm Hồ Chí Minh");
            hcmCT.setAddress("Hồ Chí Minh");
            hcmCT.setCapacity(10);
            hcmCT.setWorkingHours("8:00 - 17:00");
            this.centerRepository.save(hcmCT);
        }

        if (countRoles == 0) {
            Role adminRole = new Role();
            Role patientRole = new Role();
            Role doctorRole = new Role();
            Role cashierRole = new Role();
            adminRole.setName("ADMIN");
            adminRole.setPermissions(this.permissionRepository.findAll());
            patientRole.setName("PATIENT");
            doctorRole.setName("DOCTOR");
            cashierRole.setName("CASHIER");
            this.roleRepository.save(adminRole);
            this.roleRepository.save(patientRole);
            this.roleRepository.save(doctorRole);
            this.roleRepository.save(cashierRole);
        }

        if (countUsers == 0) {
            User adminUser = new User();
            adminUser.setWalletAddress("0x672DF7fDcf5dA93C30490C7d49bd6b5bF7B4D32C");
            adminUser.setEmail("admin@gmail.com");
            adminUser.setFullname("I'm admin");
            Role adminRole = this.roleRepository.findByName("ADMIN");
            if (adminRole != null) {
                adminUser.setRole(adminRole);
            }
            this.userRepository.save(adminUser);

            User doctorHN = new User();
            doctorHN.setWalletAddress("0x50803992C2Fc89952C237577020c9f51523519fc");
            doctorHN.setEmail("hoangtd@gmail.com");
            doctorHN.setFullname("Hoang Tran Duy");
            Role doctorRole = this.roleRepository.findByName("DOCTOR");
            if (doctorRole != null) {
                doctorHN.setRole(doctorRole);
            }
            Center centerHN = this.centerRepository.findByName("Trung Tâm Hà Nội");
            if (centerHN != null) {
                doctorHN.setCenter(centerHN);
            }
            this.userRepository.save(doctorHN);

            User doctorHCM = new User();
            doctorHCM.setWalletAddress("0x46B1324D1c9A80D02C7d9935aC8B541224051124");
            doctorHCM.setEmail("hieutm@gmail.com");
            doctorHCM.setFullname("Tran Minh Hieu");
            if (doctorRole != null) {
                doctorHCM.setRole(doctorRole);
            }
            Center centerHCM = this.centerRepository.findByName("Trung Tâm Hồ Chí Minh");
            if (centerHCM != null) {
                doctorHCM.setCenter(centerHCM);
            }
            this.userRepository.save(doctorHCM);

            User cashierHN = new User();
            cashierHN.setWalletAddress("0xCE8CC19D6a9b0C3a67E45B12D7f2AA1CDF74C83B");
            cashierHN.setEmail("hongnt@gmail.com");
            cashierHN.setFullname("Nguyen Thi Hong");
            Role cashierRole = this.roleRepository.findByName("CASHIER");
            if (cashierRole != null) {
                cashierHN.setRole(cashierRole);
            }
            Center centerHN2 = this.centerRepository.findByName("Trung Tâm Hà Nội");
            if (centerHN2 != null) {
                cashierHN.setCenter(centerHN2);
            }
            this.userRepository.save(cashierHN);

            User cashierHCM = new User();
            cashierHCM.setWalletAddress("0x56205409E70611ECc732757813a631e07cAC2648");
            cashierHCM.setEmail("thuydn@gmail.com");
            cashierHCM.setFullname("Doan Ngoc Thuy");
            if (cashierRole != null) {
                cashierHCM.setRole(cashierRole);    
            }
            Center centerHCM2 = this.centerRepository.findByName("Trung Tâm Hồ Chí Minh");
            if (centerHCM2 != null) {
                cashierHCM.setCenter(centerHCM2);
            }
            this.userRepository.save(cashierHCM);

            User patientUser = new User();
            patientUser.setWalletAddress("0xa487d0c4Cecc6a27bEC6c5FD74E6a10F263343B5");
            patientUser.setEmail("patient@gmail.com");
            patientUser.setFullname("I'm patient");
            Role patientRole = this.roleRepository.findByName("PATIENT");
            if (patientRole != null) {
                patientUser.setRole(patientRole);
            }
            this.userRepository.save(patientUser);
        }
    }

}
