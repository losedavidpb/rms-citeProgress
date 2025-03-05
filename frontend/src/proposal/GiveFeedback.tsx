import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function GiveFeedback() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username") == null) {
      navigate("/");
    }
  });

    return (
      <div>
        <div className="col-md-12">
          <div className="form-group">
            <h2>Proposal Review</h2>
            <textarea
              id="proposalReview"
              className="form-control"
              rows={10}
              placeholder="Write your review here..."
            />
          </div>
        </div>

        <div className="d-flex">
          <button className="btn btn-primary mt-3" onClick={() => navigate("/available-proposals")}>
            Accept Proposal
          </button>
          <button
            className="btn btn-danger mt-3 ms-3"
            onClick={() => navigate("")}
          >
            Reject Proposal
          </button>
        </div>
      </div>
    );
}