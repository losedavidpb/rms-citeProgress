import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../style/filter.css";

import { Research, getAvailableResearch } from "./api";
import { Filter, FilterType } from "../Filter";
import { useCheckAccount } from "../account/api";

export function AvailableResearch() {
  useCheckAccount();

  const [filteredData, setFilteredData] = useState<Research[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterType, setFilterType] = useState<FilterType>("title");
  const navigate = useNavigate();

  const handleTitleClick = (id: number) => {
    navigate(`/research-dashboard/${id}`);
  };

  const sortCriteria = (a: Research, b: Research) => {
    return b.citations - a.citations;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAvailableResearch();

      if (data != null) {
        const sortedData = data.sort(sortCriteria);
        const filtered = Filter(searchTerm, filterType, sortedData);
        setFilteredData(filtered);
      }
    };

    fetchData();
  }, [searchTerm, filterType]);

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
          onChange={(e) => setFilterType(e.target.value as FilterType)}
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
                  {research.tags.map((tag, index) => (
                    <button
                      key={index}
                      className="btn btn-outline-primary btn-sm me-2 mb-2"
                    >
                      #{tag.trim()}
                    </button>
                  ))}
                </td>
                <td>{research.status}</td>
                <td>{research.date.split("T")[0]}</td>
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