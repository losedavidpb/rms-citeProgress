package com.ul.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ul.model.Feedback;
import com.ul.model.Proposal;
import com.ul.service.ProposalService;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/proposal")
@CrossOrigin(origins = "http://localhost:5173")
public class ProposalController {
    @Autowired
    private ProposalService proposalService;

    // Pending Proposals -
    // http://localhost:8080/api/proposal/pending-proposals?username=
    @GetMapping("pending-proposals")
    public ResponseEntity<?> getPendingProposals(@RequestParam("username") String username) {
        if (username.equals("null")) {
            return ResponseEntity.ok(proposalService.getProposals());
        } else {
            return ResponseEntity.ok(proposalService.getProposalsByAuthor(username));
        }
    }

    // Pending Proposals -
    // http://localhost:8080/api/proposal/get-proposal?id=
    @GetMapping("get-proposal")
    public ResponseEntity<?> getProposal(@RequestParam("id") long ID) {
        Optional<Proposal> proposal = proposalService.getProposalByID(ID);

        if (proposal.isPresent()) {
            return ResponseEntity.ok(proposal);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                "Invalid ID for getProposal: " + ID
            );
        }
    }

    // Submit Proposal -
    // http://localhost:8080/api/proposal/submit-proposal
    @PostMapping("submit-proposal")
    public ResponseEntity<?> submitProposal(@RequestBody Proposal proposal) {
        if (proposal == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid proposal: " + proposal);
        }

        Map<String, String> response = new HashMap<>();

        if (proposalService.submitProposal(proposal)) {
            System.out.println("Proposal has been submitted");

            response.put("message", "Proposal has been submitted");
            return ResponseEntity.ok(response);
        } else {
            System.err.println("Proposal has not been submitted");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Proposal has not been submitted");
        }
    }

    // Give Feedback -
    // http://localhost:8080/api/proposal/give-feedback
    @PostMapping("give-feedback")
    public ResponseEntity<?> giveFeedback(@RequestBody Feedback feedback) {
        if (feedback == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid feedback: " + feedback);
        }

        Map<String, String> response = new HashMap<>();

        if (proposalService.giveFeedback(feedback)) {
            System.out.println("Sucessful feedback");

            response.put("message", "Sucessful feedback");
            return ResponseEntity.ok(response);
        } else {
            System.err.println("Feedback with errors");

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Feedback with errors");
        }
    }
}