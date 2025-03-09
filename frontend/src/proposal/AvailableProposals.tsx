import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getPendingProposals, Proposal } from "./api";
import { Filter, FilterType } from "../Filter";
import { useCheckSession, useCheckUserPermissions } from "../account/api";

export function ProposalFilter() {
  useCheckSession();
  useCheckUserPermissions("Admin");

  const [filteredData, setFilteredData] = useState<Proposal[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<FilterType>("title");
  const navigate = useNavigate();

  const handleTitleClick = (id: number) => {
    localStorage.setItem("selected-proposal", id.toString());
    navigate(`/proposal-review/${id}`);
  };

  const sortCriteria = (a: Proposal, b: Proposal) => {
    return new Date(b.research.date).getTime() - new Date(a.research.date).getTime();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPendingProposals(null);

      if (data != null) {
        const sortedData = data.sort(sortCriteria);
        const filtered = Filter(searchTerm, filterType, sortedData);
        setFilteredData(filtered);
      }
    };

    fetchData();
  }, [searchTerm, filterType]);

  return (
    <div className="container bg-white shadow rounded">
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
          onChange={(e) => setFilterType(e.target.value as FilterType)}
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
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((proposal) => (
              <tr
                key={proposal.research.title}
                onClick={() => handleTitleClick(proposal.research.id)}
                className="button-proposal"
              >
                <td>{proposal.research.title}</td>
                <td>{proposal.research.authors}</td>
                <td>
                  {proposal.research.tags.map((tag, index) => (
                    <button
                      key={index}
                      className="btn btn-outline-primary btn-sm me-2 mb-2"
                    >
                      #{tag.trim()}
                    </button>
                  ))}
                </td>
                <td>{proposal.research.date.split("T")[0]}</td>
              </tr>
            ))
          ) : (
            <tr className="container">
              <td colSpan={4}>No matching proposals found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}