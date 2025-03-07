import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../style/proposal.css";

export function ProposalSubmission() {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [authors, setAuthors] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [citations, setCitations] = useState<number>(-1);

  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !authors || !tags || !description || date == undefined || citations < 0 ) {
      setError("Please fill out all fields");
      return;
    }

    // TODO: Submit the proposal to the backend
    // ....

    // Reset form data
    setError("");
    setTitle("");
    setAuthors("");
    setTags("");
    setDescription("");
    setDate(new Date());
    setCitations(-1);

    // Simulate a backend call and navigate to another page
    navigate("/available-research");
  };

  useEffect(() => {
    if (localStorage.getItem("username") == null) {
      navigate("/");
    }

    if (localStorage.getItem("role") !== "Researcher") {
      navigate("/available-research");
    }
  });

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
