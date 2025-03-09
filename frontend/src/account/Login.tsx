import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { logIn, useCheckNotSession } from "./api";

export function Login() {
  useCheckNotSession();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const checkLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    logIn(username, password).then((data) => {
      if (data == null) {
        setError("Invalid login credentials");
        return;
      }

      setError("");
      navigate("/available-research");
    });
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="bg-white shadow rounded p-5" style={{ width: "400px" }}>
        <h1 className="pb-4 text-center">Log In</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={checkLogin}>
          <div className="form-outline mb-4">
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
          <div className="form-outline mb-4">
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
            className="btn btn-primary btn-block w-100 mb-4"
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
    </div>
  );
}