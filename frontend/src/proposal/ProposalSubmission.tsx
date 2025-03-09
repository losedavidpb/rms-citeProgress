import React, { useState } from "react";

import { useCheckSession, useCheckUserPermissions } from "../account/api";
import { submitProposal } from "./api";
import { useNavigate } from "react-router-dom";

export function ProposalSubmission() {
  useCheckSession();
  useCheckUserPermissions("Researcher");

  const [title, setTitle] = useState<string>("");
  const [authors, setAuthors] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [citations, setCitations] = useState<number>(-1);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const author = localStorage.getItem("username");

    if (author) {
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

      navigate("/available-research");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{paddingTop: 70}}>
      <div className="w-75 h-100 p-4 bg-white shadow rounded">
        <h1 className="pb-4 text-center">Proposal Submission</h1>
        <form onSubmit={handleSubmit} className="h-100 d-flex flex-column">
          {/* Title Field */}
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Authors and Tags in One Row */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="authors" className="form-label">
                Authors
              </label>
              <input
                type="text"
                className="form-control"
                id="authors"
                name="authors"
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="tags" className="form-label">
                Tags
              </label>
              <input
                type="text"
                className="form-control"
                id="tags"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Citations and Date */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="citations" className="form-label">
                Citations
              </label>
              <input
                type="number"
                className="form-control"
                id="citations"
                name="citations"
                value={citations}
                onChange={(e) => setCitations(Number(e.target.value))}
                min="0"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="date" className="form-label">
                Date of Research
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={date.toISOString().split("T")[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
                required
              />
            </div>
          </div>

          {/* Description Field */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control h-100"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  );
}
