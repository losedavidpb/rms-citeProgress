package com.ul.model;

import jakarta.persistence.Entity;

@Entity
public class Feedback {
    private Long ID;
    private String description;
    private Boolean answer;

    public Feedback(Long ID, String description, Boolean answer) {
        this.ID = ID;
        this.description = description;
        this.answer = answer;
    }

    public Long getID() {
        return ID;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getAnswer() {
        return answer;
    }

    public void setID(Long iD) {
        ID = iD;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAnswer(Boolean answer) {
        this.answer = answer;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((ID == null) ? 0 : ID.hashCode());
        result = prime * result + ((description == null) ? 0 : description.hashCode());
        result = prime * result + ((answer == null) ? 0 : answer.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Feedback) {
            return hashCode() == obj.hashCode();
        }

        return false;
    }
}