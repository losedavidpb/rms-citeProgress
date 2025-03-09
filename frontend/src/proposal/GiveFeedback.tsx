import { useNavigate } from "react-router-dom";
import { useCheckSession, useCheckUserPermissions } from "../account/api";
import { giveFeedback } from "./api";

export function GiveFeedback() {
  useCheckSession();
  useCheckUserPermissions("Admin");

  const navigate = useNavigate();

  const handleSubmit = (id: number, description: string, answer: boolean) => {
    giveFeedback(id, description, answer);
    navigate("/available-research");
  };

  return (
    <div className="container my-5 bg-white shadow rounded">
      <div className="col-md-12">
        <div className="form-group">
          <h1 className="pb-3">Proposal Review</h1>
          <textarea
            id="proposalReview"
            className="form-control"
            rows={10}
            placeholder="Write your review here..."
          />
        </div>

        <div className="d-flex pb-4">
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
    </div>
  );
}