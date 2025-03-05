import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to="/available-research" className="navbar-brand">
            CiteProgress
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  to="/available-research"
                  className="nav-link active"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/proposal-submission" className="nav-link">
                  Submit Proposal
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/available-proposals" className="nav-link">
                  Review Proposals
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={() => logout()}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
