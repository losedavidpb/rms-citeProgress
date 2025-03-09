package com.ul.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ul.model.Feedback;
import com.ul.model.Proposal;
import com.ul.model.Research;

@Repository
public class ProposalRepository {
    private final Map<String, List<Proposal>> proposals;

    @Autowired
    private ResearchRepository researchRepository;

    public ProposalRepository() {
        this.proposals = new HashMap<>();
    }

    public List<Proposal> findAll() {
        List<Proposal> result = new ArrayList<>();

        for (List<Proposal> proposalList : this.proposals.values()) {
            result.addAll(proposalList);
        }

        return result;
    }

    public List<Proposal> findByAuthor(String author) {
        return proposals.getOrDefault(author, new ArrayList<>());
    }

    public Optional<Proposal> findByID(long id) {
        return proposals.values().stream()
            .flatMap(List::stream)
            .filter(proposal -> proposal.getResearch().getID() == id)
            .findFirst();
    }

    public boolean addProposal(Proposal proposal) {
        String author = proposal.getAuthor();
        if (containsProposal(author, proposal)) return false;

        List<Proposal> userProposals = proposals.computeIfAbsent(author, k -> new ArrayList<>());

        proposal.getResearch().setID(ResearchRepository.getLastID());
        ResearchRepository.incrementID();

        return userProposals.add(proposal);
    }

    public boolean giveFeedback(Feedback feedback) {
        Optional<Proposal> proposal = findByID(feedback.getID());
        if (!proposal.isPresent()) return false;

        if (feedback.getAnswer()) {
            Research research = proposal.get().getResearch();

            if (!researchRepository.addResearch(research)) {
                return false;
            }
        }

        return removeProposal(proposal.get());
    }

    private boolean containsProposal(String author, Proposal proposal) {
        return proposals.containsKey(author) && proposals.get(author).contains(proposal);
    }

    private boolean removeProposal(Proposal proposal) {
        String author = proposal.getAuthor();

        if (author == null || !proposals.containsKey(author)) {
            return false;
        }

        List<Proposal> userProposals = proposals.get(author);
        boolean removed = userProposals.remove(proposal);

        if (userProposals.isEmpty()) {
            proposals.remove(author);
        }

        return removed;
    }
}