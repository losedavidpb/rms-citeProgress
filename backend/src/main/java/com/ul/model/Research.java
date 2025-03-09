package com.ul.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;

@Entity
public class Research {
    private long ID;
    private String title;
    private String description;
    private List<String> authors;
    private List<String> tags;
    private String status;
    private Date date;
    private int citations;

    public Research(long ID, String title, String description, List<String> authors, List<String> tags, String status, Date date, int citations) {
        this.ID = ID;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.tags = tags;
        this.status = status;
        this.date = date;
        this.citations = citations;
    }

    public long getID() {
        return ID;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getAuthors() {
        return authors;
    }

    public List<String> getTags() {
        return tags;
    }

    public String getStatus() {
        return status;
    }

    public Date getDate() {
        return date;
    }

    public int getCitations() {
        return citations;
    }

    public void setID(long iD) {
        ID = iD;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAuthors(List<String> authors) {
        this.authors = authors;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setCitations(int citations) {
        this.citations = citations;
    }
}