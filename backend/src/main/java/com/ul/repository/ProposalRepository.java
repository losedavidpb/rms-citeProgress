package com.ul.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ul.model.Proposal;
import com.ul.model.Research;

@Repository
public class ProposalRepository {
    private Map<String, List<Long>> proposals;

    @Autowired
    private ResearchRepository researchRepository;

    public ProposalRepository() {
        this.proposals = new HashMap<>();
        initProposals();
    }

    private void initProposals() {
        this.proposals.put("david", Arrays.asList(2L, 3L, 5L));
        this.proposals.put("laura", Arrays.asList(1L, 6L, 8L));
    }

    public Proposal findByID(long ID) {
        Research research = researchRepository.findById(ID);

        if (research != null) {
            for (String author : proposals.keySet()) {
                if (proposals.get(author).contains(research.getID())) {
                    return new Proposal(research, author);
                }
            }
        }

        return null;
    }

    public List<Proposal> findAll() {
        List<Proposal> result = new ArrayList<>();

        for (String author : proposals.keySet()) {
            List<Proposal> userProposals = findByAuthor(author);

            if (userProposals != null && !userProposals.isEmpty()) {
                result.addAll(userProposals);
            }
        }

        return result;
    }

    public List<Proposal> findByAuthor(String author) {
        List<Proposal> proposals = new ArrayList<>();

        if (this.proposals.containsKey(author)) {
            for (Long ID : this.proposals.get(author)) {
                Research research = researchRepository.findById(ID);
                proposals.add(new Proposal(research, author));
            }
        }

        return proposals;
    }

    public boolean addProposal(Proposal proposal) {
        String author = proposal.getAuthor();

        if (this.proposals.containsKey(author)) {
            List<Proposal> userProposals = findByAuthor(author);

            if (!userProposals.contains(proposal)) {
                proposal.getResearch().setID(researchRepository.getLastID());
                return userProposals.add(proposal);
            }
        }

        return false;
    }
}