package com.ul.model;

import jakarta.persistence.Entity;

@Entity
public class Account {
    private String name;
    private String username;
    private String email;
    private String password;
    private String accountType;

    public Account(String name, String username, String email, String password, String accountType) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.accountType = accountType;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getAccountType() {
        return accountType;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setAccountType(String accountType) {
        this.accountType = accountType;
    }
}