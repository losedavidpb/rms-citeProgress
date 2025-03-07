const API_URL = "http://localhost:8080/api/account";

export interface User {
  name: string,
  email: string,
  password: string,
  role: string
}

export const logIn = async (username: string, password: string): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    console.log(data);

    // Store account details in local storage
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

export const signUp = async (name: string, username: string, email: string, password: string, accountType: string): Promise<User | null> => {
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
        accountType: accountType,
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