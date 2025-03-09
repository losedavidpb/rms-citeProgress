package com.ul.repository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.ul.model.Account;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Repository
public class AccountRepository {
    private final Map<String, Account> users;
    private final PasswordEncoder passwordEncoder;

    public AccountRepository(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.users = new HashMap<>();

        initUsers();
    }

    // Static users for testing purposes
    // TODO: Remove this and implement a database
    private void initUsers() {
        Account admin = new Account(
            "admin", "admin", "admin@mail.com",
            passwordEncoder.encode("admin123"), "Admin"
        );

        Account researcher = new Account(
            "Researcher", "researcher", "researcher@mail.com",
            passwordEncoder.encode("researcher123"), "Researcher"
        );

        users.put(admin.getUsername(), admin);
        users.put(researcher.getUsername(), researcher);
    }

    public Optional<Account> findByUsername(String username) {
        return Optional.ofNullable(users.get(username));
    }

    public Optional<Account> save(Account user) {
        return Optional.ofNullable(users.put(user.getUsername(), user));
    }
}