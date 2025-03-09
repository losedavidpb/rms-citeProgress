package com.ul.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ul.model.Feedback;
import com.ul.model.Proposal;
import com.ul.repository.ProposalRepository;

@Service
public class ProposalService {
    @Autowired
    private ProposalRepository proposalRepository;

    public List<Proposal> getProposals() {
        return proposalRepository.findAll();
    }

    public List<Proposal> getProposalsByAuthor(String username) {
        return proposalRepository.findByAuthor(username);
    }

    public Optional<Proposal> getProposalByID(long ID) {
        return proposalRepository.findByID(ID);
    }

    public boolean submitProposal(Proposal proposal) {
        return proposalRepository.addProposal(proposal);
    }

    public boolean giveFeedback(Feedback feedback) {
        return proposalRepository.giveFeedback(feedback);
    }
}