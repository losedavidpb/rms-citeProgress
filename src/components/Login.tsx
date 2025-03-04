import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./../style/login.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  // TODO: Replace this with backend handling
  const accounts: { [key: string]: { password: string; role: string } } = {
    admin: { password: "admin123", role: "Admin" },
    researcher1: { password: "researcher123", role: "Researcher" },
    researcher2: { password: "researcher456", role: "Researcher" },
  };

  const checkLogin = (e) => {
    e.preventDefault();

    // Check if username and password are valid
    if (accounts[username] == undefined || accounts[username].password != password) {
      setError("Invalid username or password");
      return;
    }

    // Redirect to appropriate page
    setError("");
    navigate("/progress-tracking");
  };

  return (
    <div>
      <div className="tab-content">
        <div
          className="tab-pane fade show active"
          id="pills-login"
          role="tabpanel"
          aria-labelledby="tab-login"
        >

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={checkLogin}>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="username"
                id="loginUsername"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="password"
                id="loginPassword"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className="row mb-4">
              <div className="col-md-6 d-flex justify-content-center">
                <div className="form-check mb-3 mb-md-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="loginCheck"
                    checked
                  />
                  <label className="form-check-label" htmlFor="loginCheck">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
              </div>

              <div className="col-md-6 d-flex justify-content-center">
                <a href="#!">Forgot password?</a>
              </div>
            </div>
            <button
              type="submit"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-primary btn-block mb-4"
            >
              Login
            </button>

            <div className="text-center">
              <p>
                Not a member? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}