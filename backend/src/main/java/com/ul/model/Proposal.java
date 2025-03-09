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

    @Override
    public int hashCode() {
        final int prime = 31;

        int result = 1;
        result = prime * result + ((research == null) ? 0 : research.hashCode());
        result = prime * result + ((author == null) ? 0 : author.hashCode());

        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Proposal) {
            return this.hashCode() == obj.hashCode();
        }

        return false;
    }
}