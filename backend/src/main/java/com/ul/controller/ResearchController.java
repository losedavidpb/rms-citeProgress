package com.ul.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ul.model.Research;
import com.ul.service.ResearchService;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/research")
@CrossOrigin(origins = "http://localhost:5173")
public class ResearchController {
    @Autowired
    private ResearchService researchService;

    // Available Research -
    // http://localhost:8080/api/research/available-research
    @GetMapping("available-research")
    public List<Research> getAvailableResearch() {
        return researchService.getAvailableResearch();
    }

    // Get Research -
    // http://localhost:8080/api/research/get-research?id=
    @GetMapping("get-research")
    public ResponseEntity<?> getResearchById(@RequestParam("id") long id) {
        Optional<Research> research = researchService.getResearchById(id);

        if (research.isPresent()) {
            System.out.println("Research found: " + id);

            return ResponseEntity.ok(research);
        } else {
            System.err.println("Research not found: " + id);

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Research not found: " + id);
        }
    }
}