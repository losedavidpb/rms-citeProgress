import { Link, useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  function logout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg">
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
              {/* Only show these links if the user is a researcher */}
              {role === "Researcher" && (
                <li className="nav-item">
                  <Link to="/proposal-submission" className="nav-link">
                    Submit Proposal
                  </Link>
                </li>
              )}
              {role === "Researcher" && (
                <li className="nav-item">
                  <Link to="/pending-proposals" className="nav-link">
                    Pending Proposals
                  </Link>
                </li>
              )}
              {/* Only show this link if the user is an admin */}
              {role === "Admin" && (
                <li className="nav-item">
                  <Link to="/available-proposals" className="nav-link">
                    Review Proposals
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="#" className="nav-link" onClick={(e) => logout(e)}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}