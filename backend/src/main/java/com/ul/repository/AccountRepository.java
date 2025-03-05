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
            "Paco", "paco", "paco@mail.com",
            passwordEncoder.encode("admin123"), "Admin"
        );

        Account researcher1 = new Account(
            "David", "david", "david@mail.com",
            passwordEncoder.encode("researcher123"), "Researcher"
        );

        Account researcher2 = new Account(
            "Laura", "laura", "laura@mail.com",
            passwordEncoder.encode("researcher456"), "Researcher"
        );

        users.put(admin.getUsername(), admin);
        users.put(researcher1.getUsername(), researcher1);
        users.put(researcher2.getUsername(), researcher2);
    }

    public Optional<Account> findByUsername(String username) {
        return Optional.ofNullable(users.get(username));
    }

    public Account save(Account user) {
        users.put(user.getUsername(), user);
        return user;
    }

    public Map<String, Account> getAccounts() {
        return users;
    }
}
