import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../style/filter.css";

// TODO: this must be located in a database
// Template => Tile | Authors | Tags | Status | Date | Citations
import { Proposal, proposalList } from "./ProposalList";

// -----------------------------
// Filter Section
// -----------------------------

function FilterData(searchTerm: string, filterType: string, data: Proposal[]) {
  // Filter for text
  const FilterText = (text: string, searchTerm: string) => {
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Filter for array of texts
  const FilterArrayText = (textArr: string[], searchTerm: string) => {
    for (let index = 0; index < textArr.length; index++) {
      if (FilterText(textArr[index], searchTerm)) return true;
    }

    return false;
  };

  // Filter for date
  const FilterDate = (date: string, searchTerm: string) => {
    return date.includes(searchTerm);
  };

  // Map filter types to corresponding filter functions
  const filterFunctions: {
    [key: string]: (proposal: Proposal, searchTerm: string) => boolean;
  } = {
    title: (proposal, searchTerm) => FilterText(proposal.title, searchTerm),
    authors: (proposal, searchTerm) =>
      FilterArrayText(proposal.authors.split(","), searchTerm),
    tags: (proposal, searchTerm) =>
      FilterArrayText(proposal.tags.split(","), searchTerm),
    date: (proposal, searchTerm) => FilterDate(proposal.date.toISOString(), searchTerm),
  };

  const filterFunction = filterFunctions[filterType];
  return filterFunction
    ? data.filter((proposal) => filterFunction(proposal, searchTerm))
    : [];
}

// -----------------------------

export function ProposalFilter() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("title");
  const navigate = useNavigate();

  const handleTitleClick = (id: number) => {
    navigate(`/proposal-review/${id}`);
  };

  const filteredData = FilterData(
    searchTerm,
    filterType,
    proposalList.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
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
            <th>Citations</th>
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
                <td>{proposal.citations}</td>
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
