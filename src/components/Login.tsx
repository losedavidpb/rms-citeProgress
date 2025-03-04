import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

// TODO: Replace this with backend handling
import { accountList } from "./utils/AccountList";

export function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const checkLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if username and password are valid
    if (
      accountList[username] == undefined ||
      accountList[username].password != password
    ) {
      setError("Invalid username or password");
      return;
    }

    // Redirect to appropriate page
    setError("");
    navigate("/progress-tracking");
  };

  return (
    <div className="tab-content">
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
            Not a member? <Link to="/sign-up">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
