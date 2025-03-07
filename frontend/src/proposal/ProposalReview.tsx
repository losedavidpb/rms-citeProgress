import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// TODO: this must be located in a database
import { Proposal, getProposal } from "./api";

export function ProposalReview() {
  const [error, setError] = useState<string>("");
  const [proposal, setProposal] = useState<Proposal | undefined>(undefined);
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  // Convert the id to a number
  const numericId = Number(id);

  useEffect(() => {
    if (localStorage.getItem("username") == null) {
      navigate("/");
    }

    if (localStorage.getItem("role") !== "Admin") {
      navigate("/available-research");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProposal(numericId);

      if (data != null) {
        setError("");
        setProposal(data);
      }
    };

    fetchData();
  }, [numericId]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Review Proposal</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {proposal ? (
        <div className="card">
          <div className="card-body">
            {/* Title */}
            <div className="d-flex align-items-center">
              <h3 className="fw-bold mb-4">{proposal.research.title}</h3>
            </div>

            {/* Authors and Date */}
            <div className="d-flex align-items-center">
              <p className="mb-0">
                <strong>Authors:</strong> {proposal.research.authors}
              </p>
              <p className="text-muted mb-0 ms-3">
                ({proposal.research.date.split("T")[0]})
              </p>
            </div>

            {/* Status and Citations */}
            <div className="d-flex align-items-center mt-4">
              <p className="mb-0">
                <strong>Status:</strong> Under Review
              </p>
              <p className="text-muted mb-0 ms-3">
                ({proposal.research.citations} citations)
              </p>
            </div>

            {/* Tags */}
            <div className="d-flex align-items-center mt-3">
              {proposal.research.tags.map((tag, index) => (
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
              <p className="mb-0">{proposal.research.description}</p>
            </div>
          </div>

          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/give-feedback")}
          >
            Give Feedback
          </button>
        </div>
      ) : (
        <div className="alert alert-warning mt-3">
          No proposal found or invalid ID.
        </div>
      )}
    </div>
  );
}
