import React, { useState } from "react";

import "./../style/proposal.css";
import { useCheckAccount, useCheckUserPermissions } from "../account/api";
import { submitProposal } from "./api";

export function ProposalSubmission() {
  useCheckAccount();
  useCheckUserPermissions("Researcher");

  const [title, setTitle] = useState<string>("");
  const [authors, setAuthors] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [citations, setCitations] = useState<number>(-1);

  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const author = localStorage.getItem("username");

    if (author) {
      if (!title || !authors || !tags || !description || date == undefined || citations < 0) {
        setError("Please fill out all fields");
        return;
      }

      setError("");
      setTitle("");
      setAuthors("");
      setTags("");
      setDescription("");
      setDate(new Date());
      setCitations(-1);

      submitProposal({
        author: author,
        research: {
          id: -1,
          title: title,
          description: description,
          authors: authors.split(","),
          tags: tags.split(","),
          status: "Under Review",
          date: date.toISOString().split("T")[0],
          citations: citations,
        },
      });

      //navigate("/available-research");
    }
  };

  return (
    <div className="form-container">
      <h2 className="pb-4">Proposal Submission</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {error && <span className="error">{error}</span>}
        </div>

        {/* Authors Field */}
        <div className="form-field">
          <label htmlFor="authors">Authors</label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            required
          />
          {error && <span className="error">{error}</span>}
        </div>

        {/* Tags Field */}
        <div className="form-field">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
          {error && <span className="error">{error}</span>}
        </div>

        {/* Description Field */}
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {error && <span className="error">{error}</span>}
        </div>

        {/* Date Field */}
        <div className="form-field">
          <label htmlFor="date">Date of Research</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            required
          />
          {error && <span className="error">{error}</span>}
        </div>

        {/* Citations Field */}
        <div className="form-field">
          <label htmlFor="citations">Citations</label>
          <input
            type="number"
            id="citations"
            name="citations"
            value={citations}
            onChange={(e) => setCitations(Number(e.target.value))}
            min="0"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit Proposal</button>
      </form>
    </div>
  );
}
