package com.ul.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ul.model.Proposal;
import com.ul.repository.ProposalRepository;

@Service
public class ProposalService {
    @Autowired
    private ProposalRepository proposalRepository;

    public Proposal getProposalByID(long ID) {
        return proposalRepository.findByID(ID);
    }

    public List<Proposal> getProposalsByAuthor(String username) {
        return proposalRepository.findByAuthor(username);
    }

    public List<Proposal> getProposals() {
        return proposalRepository.findAll();
    }
}