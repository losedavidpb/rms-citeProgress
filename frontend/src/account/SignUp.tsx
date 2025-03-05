import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "./api";

export function SignUp() {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const checkSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!terms) {
      setError("Please accept the terms");
      return;
    }

    signUp(name, username, email, password, "Researcher").then((data) => {
      if (data == null) {
        setError("Invalid signup credentials");
        return;
      }

      setError("");
      navigate("/");
    });
  };

  return (
    <div className="tab-content">
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={checkSignUp}>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerName">
            Name
          </label>
          <input
            type="text"
            id="registerName"
            className="form-control"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerUsername">
            Username
          </label>
          <input
            type="text"
            id="registerUsername"
            className="form-control"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerEmail">
            Email
          </label>
          <input
            type="email"
            id="registerEmail"
            className="form-control"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerPassword">
            Password
          </label>
          <input
            type="password"
            id="registerPassword"
            className="form-control"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="registerRepeatPassword">
            Repeat password
          </label>
          <input
            type="password"
            id="registerRepeatPassword"
            className="form-control"
            value={repeatPassword}
            required
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>

        <div className="form-check d-flex justify-content-center mb-4">
          <input
            className="form-check-input me-2"
            type="checkbox"
            value=""
            id="registerCheck"
            aria-describedby="registerCheckHelpText"
            onChange={(e) => setTerms(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="registerCheck">
            I have read and agree to the terms
          </label>
        </div>

        <button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-primary btn-block mb-3"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
