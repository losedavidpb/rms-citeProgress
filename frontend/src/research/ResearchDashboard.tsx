import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Research, getResearch } from "./api";

export function ResearchDashboard() {
  const [error, setError] = useState<string>("");
  const [research, setResearch] = useState<Research | undefined>(undefined);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Convert the id to a number
  const numericId = Number(id);

  useEffect(() => {
    if (localStorage.getItem("username") == null) {
      navigate("/");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getResearch(numericId);

      if (data != null) {
        setError("");
        setResearch(data);
      }
    };

    fetchData();
  }, [numericId]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Research Dashboard</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {research ? (
        <div className="card">
          <div className="card-body">
            {/* Title */}
            <div className="d-flex align-items-center">
              <h3 className="fw-bold mb-4">{research.title}</h3>
            </div>

            {/* Authors and Date */}
            <div className="d-flex align-items-center">
              <p className="mb-0">
                <strong>Authors:</strong> {research.authors}
              </p>
              <p className="text-muted mb-0 ms-3">
                ({research.date.split("T")[0]})
              </p>
            </div>

            {/* Status and Citations */}
            <div className="d-flex align-items-center mt-4">
              <p className="mb-0">
                <strong>Status:</strong> {research.status}
              </p>
              <p className="text-muted mb-0 ms-3">
                ({research.citations} citations)
              </p>
            </div>

            {/* Tags */}
            <div className="d-flex align-items-center mt-3">
              {research.tags.map((tag: string, index: number) => (
                <button
                  key={index}
                  className="btn btn-outline-primary btn-sm me-2 mb-2"
                >
                  #{tag.trim()}
                </button>
              ))}
            </div>

            {/* Abstract */}
            <div className="d-flex align-items-center">
              <h5 className="mt-4">Abstract</h5>
            </div>

            <div className="d-flex align-items-center">
              <p className="mb-0">{research.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning mt-3">
          No research found or invalid ID.
        </div>
      )}
    </div>
  );
}