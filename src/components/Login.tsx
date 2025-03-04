import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  // TODO: Replace this with backend handling
  const accounts: {
    [key: string]: {
      name: string;
      email: string;
      password: string;
      role: string;
    };
  } = {
    admin: {
      name: "Paco",
      email: "paco@mail.com",
      password: "admin123",
      role: "Admin",
    },
    researcher1: {
      name: "David",
      email: "david@mail.com",
      password: "researcher123",
      role: "Researcher",
    },
    researcher2: {
      name: "Laura",
      email: "laura@mail.com",
      password: "researcher456",
      role: "Researcher",
    },
  };

  const checkLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if username and password are valid
    if (
      accounts[username] == undefined ||
      accounts[username].password != password
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
