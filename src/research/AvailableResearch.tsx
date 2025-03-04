import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../style/filter.css";

// TODO: this must be located in a database
// Template => Tile | Authors | Tags | Status | Date | Citations
import { researchList, Research } from "./ResearchList";
import { Filter } from "../Filter";

// -----------------------------

export function ResearchFilter() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("title");
  const navigate = useNavigate();

  const handleTitleClick = (id: number) => {
    navigate(`/research-dashboard/${id}`);
  };

  const sortCriteria = (a: Research, b: Research) => {
    return b.citations - a.citations;
  };

  const filteredData: Research[] = Filter(
    searchTerm, filterType,
    researchList.sort(sortCriteria)
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
          <option value="status">Status</option>
          <option value="date">Date</option>
          <option value="citations">Citations</option>
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
            filteredData.map((research) => (
              <tr
                key={research.id}
                onClick={() => handleTitleClick(research.id)}
                className="button-research"
              >
                <td>{research.title}</td>
                <td>{research.authors}</td>
                <td>
                  {research.tags.split(",").map((tag, index) => (
                    <button
                      key={index}
                      className="btn btn-outline-primary btn-sm me-2 mb-2"
                    >
                      #{tag.trim()}
                    </button>
                  ))}
                </td>
                <td>{research.status}</td>
                <td>{research.date.toISOString().split("T")[0]}</td>
                <td>{research.citations}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No matching research found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}