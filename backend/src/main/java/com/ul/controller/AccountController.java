package com.ul.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ul.model.Account;
import com.ul.security.JwtUtil;
import com.ul.service.AccountService;

import java.util.Map;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    // Log in -
    // http://localhost:8080/api/account/login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        Account account = accountService.logIn(username, password);

        if (account == null) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }

        String jwt = jwtTokenUtil.generateToken(username);
        return ResponseEntity.ok(Map.of("token", jwt));
    }

    // Sign up -
    // http://localhost:8080/api/account/signup
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody Map<String, String> credentials) {
        String name = credentials.get("name");
        String username = credentials.get("username");
        String email = credentials.get("email");
        String password = credentials.get("password");
        String accountType = credentials.get("accountType");
        Account account = accountService.signUp(name, username, email, password, accountType);

        if (account != null) {
            return ResponseEntity.ok(account);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}