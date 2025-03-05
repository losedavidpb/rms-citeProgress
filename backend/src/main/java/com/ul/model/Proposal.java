package com.ul.model;

import jakarta.persistence.Entity;

@Entity
public class Proposal {
    private Research research;
    private String author;

    public Proposal(Research research, String author) {
        this.research = research;
        this.author = author;
    }

    public Research getResearch() {
        return research;
    }

    public String getAuthor() {
        return author;
    }

    public void setResearch(Research research) {
        this.research = research;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}