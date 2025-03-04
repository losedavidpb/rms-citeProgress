import "./../style/home.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import { Login } from "./Login";
import { ProposalSubmission } from "./ProposalSubmission";
import { ProposalReview } from "./ProposalReview";
import { ProgressTracking } from "./ProgressTracking";
import { ResearchDashboard } from "./ResearchDashboard";
import { SignUp } from "./SignUp";

function Home() {
  return (
    <Router basename="/rms-citeProgress">
      <h1 className="pb-3">CiteProgress</h1>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/proposal-submission" element={<ProposalSubmission />} />
        <Route path="/proposal-review" element={<ProposalReview />} />
        <Route path="/progress-tracking" element={<ProgressTracking />} />
        <Route path="/research-dashboard" element={<ResearchDashboard />} />
      </Routes>
    </Router>
  );
}

export default Home;