import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Proposal } from "./ProposalList";

import "./../style/proposal.css";

export function ProposalSubmission() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Proposal>({
    id: 0,
    title: "",
    authors: "",
    tags: "",
    description: "",
    date: "",
    citations: 0,
  });

  const [errors, setErrors] = useState<Proposal>({
    id: 0,
    title: "",
    authors: "",
    tags: "",
    description: "",
    date: "",
    citations: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Proposal = {
      id: formData.id ? "" : "ID is required.",
      title: formData.title ? "" : "Title is required.",
      authors: formData.authors ? "" : "Authors are required.",
      tags: formData.tags ? "" : "Tags are required.",
      description: formData.description ? "" : "Description is required.",
      date: formData.date ? "" : "Date is required.",
      citations: formData.citations ? "" : "Citations are required.",
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) return;

    // Handle valid form submission
    console.log("Proposal submitted:", formData);
    setFormData({
      id: 0,
      title: "",
      authors: "",
      tags: "",
      description: "",
      date: "",
      citations: 0,
    });

    // Simulate a backend call and navigate to another page (e.g., home page)
    navigate("/home");
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
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        {/* Authors Field */}
        <div className="form-field">
          <label htmlFor="authors">Authors</label>
          <input
            type="text"
            id="authors"
            name="authors"
            value={formData.authors}
            onChange={handleInputChange}
            required
          />
          {errors.authors && <span className="error">{errors.authors}</span>}
        </div>

        {/* Tags Field */}
        <div className="form-field">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            required
          />
          {errors.tags && <span className="error">{errors.tags}</span>}
        </div>

        {/* Description Field */}
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>

        {/* Date Field */}
        <div className="form-field">
          <label htmlFor="date">Date of Research</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit">Submit Proposal</button>
      </form>
    </div>
  );
}
