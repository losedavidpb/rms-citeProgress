import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../style/progress-tracking.css";

// TODO: this must be located in a database
// Template => Tile | Authors | Tags | Status | Date
import { researchList } from "./utils/ResearchList";

// Research data Interface
interface ResearchItem {
  id: number;
  title: string;
  authors: string;
  tags: string;
  status: string;
  date: Date;
  citations: number;
}

// -----------------------------
// Filter Section
// -----------------------------

function FilterData(
  searchTerm: string,
  filterType: string,
  data: ResearchItem[]
) {
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
  const FilterDate = (date: Date, searchTerm: string) => {
    const dateString = date.toISOString().split("T")[0];
    return dateString.includes(searchTerm);
  };

  // Map filter types to corresponding filter functions
  const filterFunctions: {
    [key: string]: (research: ResearchItem, searchTerm: string) => boolean;
  } = {
    title: (research, searchTerm) => FilterText(research.title, searchTerm),
    authors: (research, searchTerm) =>
      FilterArrayText(research.authors.split(","), searchTerm),
    tags: (research, searchTerm) =>
      FilterArrayText(research.tags.split(","), searchTerm),
    status: (research, searchTerm) => FilterText(research.status, searchTerm),
    date: (research, searchTerm) => FilterDate(research.date, searchTerm),
  };

  const filterFunction = filterFunctions[filterType];
  return filterFunction
    ? data.filter((research) => filterFunction(research, searchTerm))
    : [];
}

// -----------------------------

export function ProgressTracking() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("title");
  const navigate = useNavigate();

  const handleTitleClick = (id: number) => {
    navigate(`/research-dashboard/${id}`);
  };

  const filteredData = FilterData(
    searchTerm,
    filterType,
    researchList.sort((a, b) => b.citations - a.citations)
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
          className="search-select"
        >
          <option value="title">Title</option>
          <option value="authors">Authors</option>
          <option value="tags">Tags</option>
          <option value="status">Status</option>
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
            filteredData.map((research) => (
              <tr
                key={research.id}
                onClick={() => handleTitleClick(research.id)}
                className="button-research"
              >
                <td>{research.title}</td>
                <td>{research.authors}</td>
                <td>{research.tags}</td>
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
