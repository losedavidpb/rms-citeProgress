package com.ul.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ul.model.Research;
import com.ul.repository.ResearchRepository;

@Service
public class ResearchService {
    @Autowired
    private ResearchRepository researchRepository;

    public Research getResearchById(long id) {
        return researchRepository.findById(id);
    }

    public List<Research> getAvailableResearch() {
        return researchRepository.findAll();
    }
}