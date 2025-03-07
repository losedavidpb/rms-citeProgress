import "./style/app.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

// Components
import { Header } from "./Header";
import { Login } from "./account/Login";
import { SignUp } from "./account/SignUp";
import { ProposalSubmission } from "./proposal/ProposalSubmission";
import { ProposalReview } from "./proposal/ProposalReview";
import { ProposalFilter } from "./proposal/AvailableProposals";
import { AvailableResearch } from "./research/AvailableResearch";
import { ResearchDashboard } from "./research/ResearchDashboard";
import { GiveFeedback } from "./proposal/GiveFeedback";
import { PendingProposals } from "./proposal/PendingProposals";

function App() {
  // Enable/disable the header based on the current page
  function SetHeader() {
    return useLocation().pathname === "/" ? null : <Header />;
  }

  return (
    <Router basename="/rms-citeProgress">
      <SetHeader />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/available-proposals" element={<ProposalFilter />} />
        <Route path="/proposal-submission" element={<ProposalSubmission />} />
        <Route path="/pending-proposals" element={<PendingProposals />} />
        <Route path="/proposal-review/:id" element={<ProposalReview />} />
        <Route path="/give-feedback" element={<GiveFeedback />} />
        <Route path="/available-research" element={<AvailableResearch />} />
        <Route path="/research-dashboard/:id" element={<ResearchDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;