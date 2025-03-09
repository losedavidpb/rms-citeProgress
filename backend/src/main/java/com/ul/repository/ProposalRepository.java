package com.ul.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
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
        initProposals();
    }

    private void initProposals() {
        Research research1 = new Research(1L,
            "Deep Learning in Medical Imaging",
            "Exploring deep learning techniques for enhanced medical image analysis.",
            Arrays.asList("Alice Smith", "Bob Johnson"),
            Arrays.asList("Deep Learning", "Medical Imaging"),
            "Under Review",
            new Date(), 150
        );

        Research research2 = new Research(2L,
            "AI in Finance",
            "Analyzing the applications of artificial intelligence in the financial sector.",
            Arrays.asList("Charlie Brown", "David Wilson"),
            Arrays.asList("Artificial Intelligence", "Finance"),
            "Published",
            new Date(), 350
        );

        Proposal proposal1 = new Proposal(research1, "Researcher");
        Proposal proposal2 = new Proposal(research2, "Researcher");

        proposals.putIfAbsent("researcher", new ArrayList<>());
        proposals.get("researcher").add(proposal1);
        proposals.get("researcher").add(proposal2);
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