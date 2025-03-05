package com.ul.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ul.model.Account;
import com.ul.repository.AccountRepository;

import java.util.Optional;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Account signUp(String name, String username, String email, String password, String accountType) {
        Optional<Account> account = accountRepository.findByUsername(username);
        String hashedPassword = passwordEncoder.encode(password);

        if (account.isPresent()) {
            System.out.println("Username already exists: " + username);
            return null;
        }

        Account newAccount = new Account(name, username, email, hashedPassword, accountType);

        if (newAccount != null) {
            accountRepository.save(newAccount);
            System.out.println("Account created for username: " + username + " as " + accountType);
        }

        return newAccount;
    }

    public Account logIn(String username, String password) {
        Optional<Account> account = accountRepository.findByUsername(username);

        if (account.isPresent() && passwordEncoder.matches(password, account.get().getPassword())) {
            System.out.println("Login successful for user: " + username);
            return account.get();
        }

        System.out.println("Login failed for user: " + username);
        return null;
    }
}