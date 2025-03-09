import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/account";

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const logIn = async (username: string, password: string): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", data.role);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const signUp = async (name: string, username: string, email: string, password: string, role: string): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        password: password,
        role: role,
      }),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Signup error:", error);
    return null;
  }
};


const isLogged = (): boolean => {
  return (
    localStorage.getItem("username") !== null &&
    localStorage.getItem("token") !== null &&
    localStorage.getItem("role") !== null
  );
}

export const useCheckSession = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged()) navigate("/");
  }, [navigate]);
};

export const useCheckNotSession = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged()) navigate(-1);
  }, [navigate]);
}

export const useCheckUserPermissions = (role: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") !== role) {
      navigate("/available-research");
    }
  });
};