import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// TODO: this must be located in a database
import { proposalList, Proposal } from "./ProposalList";

export function ProposalReview() {
  const [error, setError] = useState<string>("");
  const [proposal, setProposal] = useState<Proposal | undefined>(undefined);
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  // Convert the id to a number
  const numericId = Number(id);

  useEffect(() => {
    // Check if the id is a number
    if (isNaN(numericId) || numericId < 0 || numericId > proposalList.length) {
      setError("Invalid proposal id");
      setProposal(undefined);
      return;
    }

    // Check if the proposal exists
    let foundproposal = undefined;

    for (const Proposal of proposalList) {
      if (Proposal.id === numericId) {
        foundproposal = Proposal;
        break;
      }
    }

    if (!foundproposal) {
      setError("proposal not found");
      return;
    }

    setError("");
    setProposal(foundproposal);
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
              <h3 className="fw-bold mb-4">{proposal.title}</h3>
            </div>

            {/* Authors and Date */}
            <div className="d-flex align-items-center">
              <p className="mb-0">
                <strong>Authors:</strong> {proposal.authors}
              </p>
              <p className="text-muted mb-0 ms-3">
                ({proposal.date.toISOString().split("T")[0]})
              </p>
            </div>

            {/* Status and Citations */}
            <div className="d-flex align-items-center mt-4">
              <p className="mb-0">
                <strong>Status:</strong> Under Review
              </p>
              <p className="text-muted mb-0 ms-3">
                ({proposal.citations} citations)
              </p>
            </div>

            {/* Tags */}
            <div className="d-flex align-items-center mt-3">
              {proposal.tags.split(",").map((tag, index) => (
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
              <p className="mb-0">{proposal.description}</p>
            </div>
          </div>

          <button className="btn btn-primary mt-3" onClick={() => navigate("/give-feedback")}>
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
