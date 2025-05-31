package com.dapp.backend.config;

import java.math.BigInteger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.web3j.crypto.Credentials;
import org.web3j.model.VaccineAppointment;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.gas.StaticGasProvider;

@Configuration
public class Web3jConfig {

    private static final String PRIVATE_KEY = "0x829bb78247f6b250227d3604505542cb21dbbc8791b8ac5e2b11a417b49fbbde";
    private static final String CONTRACT_ADDRESS = "0xB4134676e03bfbcd93C7C3221c145755C2c1C37d";
    private static final BigInteger GAS_PRICE = BigInteger.valueOf(20_000_000_000L);
    private static final BigInteger GAS_LIMIT = BigInteger.valueOf(4_300_000);

    @Bean
    Web3j web3j() {
        return Web3j.build(new HttpService("http://127.0.0.1:7545")); // Ganache URL
    }

    @Bean
    public Credentials credentials() {
        return Credentials.create(PRIVATE_KEY);
    }

    @Bean
    public VaccineAppointment vaccineAppointmentContract(Web3j web3j, Credentials credentials) {
        return VaccineAppointment.load(
                CONTRACT_ADDRESS,
                web3j,
                credentials,
                new StaticGasProvider(GAS_PRICE, GAS_LIMIT));
    }

  
    
}