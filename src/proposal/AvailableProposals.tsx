import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../style/filter.css";

// TODO: this must be located in a database
// Template => Tile | Authors | Tags | Status | Date | Citations
import { Proposal, proposalList } from "./ProposalList";
import { Filter } from "../Filter";

// -----------------------------

export function ProposalFilter() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("title");
  const navigate = useNavigate();

  const handleTitleClick = (id: number) => {
    navigate(`/proposal-review/${id}`);
  };

  const sortCriteria = (a: Proposal, b: Proposal) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  };

  const filteredData: Proposal[] = Filter(
    searchTerm, filterType,
    proposalList.sort(sortCriteria)
  );

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          placeholder="Type text for filtering"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          id="filter"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="search-select btn btn-outline-primary"
        >
          <option value="title">Title</option>
          <option value="authors">Authors</option>
          <option value="tags">Tags</option>
          <option value="date">Date</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author(s)</th>
            <th>Tags</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((proposal) => (
              <tr
                key={proposal.title}
                onClick={() => handleTitleClick(proposal.id)}
                className="button-proposal"
              >
                <td>{proposal.title}</td>
                <td>{proposal.authors}</td>
                <td>
                  {proposal.tags.split(",").map((tag, index) => (
                    <button
                      key={index}
                      className="btn btn-outline-primary btn-sm me-2 mb-2"
                    >
                      #{tag.trim()}
                    </button>
                  ))}
                </td>
                <td>Under Review</td>
                <td>{proposal.date.toISOString().split("T")[0]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No matching proposals found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}