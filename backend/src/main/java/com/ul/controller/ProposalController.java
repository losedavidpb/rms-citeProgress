package com.ul.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public List<Proposal> getPendingProposals(@RequestParam("username") String username) {
        if (username == null) {
            return proposalService.getProposals();
        } else {
            return proposalService.getProposalsByAuthor(username);
        }
    }

    // Pending Proposals -
    // http://localhost:8080/api/proposal/get-proposal?id=
    @GetMapping("get-proposal")
    public Proposal getProposal(@RequestParam("id") long ID) {
        return proposalService.getProposalByID(ID);
    }

    // Submit Proposal -
    // http://localhost:8080/api/proposal/submit-proposal
    @PostMapping("submit-proposal")
    public ResponseEntity<?> submitProposal(@RequestBody Proposal proposal) {
        if (proposal == null) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Map<String, String> response = new HashMap<>();

        if (proposalService.submitProposal(proposal)) {
            response.put("message", "Proposal has been submitted");
            return ResponseEntity.ok(response);
        } else {
            System.out.println("B");
            response.put("message", "Proposal has not been submitted");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // Give Feedback -
    // http://localhost:8080/api/proposal/give-feedback
    @PostMapping("give-feedback")
    public String giveFeedback(@RequestBody Map<String, String> information) {
        return "";
    }

}