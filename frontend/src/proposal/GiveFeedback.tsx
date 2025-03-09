import { useNavigate } from "react-router-dom";
import { useCheckAccount, useCheckUserPermissions } from "../account/api";
import { giveFeedback } from "./api";

export function GiveFeedback() {
  useCheckAccount();
  useCheckUserPermissions("Admin");

  const navigate = useNavigate();

  const handleSubmit = (id: number, description: string, answer: boolean) => {
    giveFeedback(id, description, answer);
    navigate("/available-research");
  };

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
        <button
          className="btn btn-primary mt-3"
          onClick={() =>
            handleSubmit(
              Number(localStorage.getItem("id")),
              localStorage.getItem("description") || "",
              true
            )
          }
        >
          Accept Proposal
        </button>
        <button
          className="btn btn-danger mt-3 ms-3"
          onClick={() =>
            handleSubmit(
              Number(localStorage.getItem("id")),
              localStorage.getItem("description") || "",
              false
            )
          }
        >
          Reject Proposal
        </button>
      </div>
    </div>
  );
}