import { Research } from "../research/api";

export type Proposal = {
  author: string;
  research: Research;
};

const API_URL = "http://localhost:8080/api/proposal";

export const getPendingProposals = async (username: string | null): Promise<Proposal[] | null> => {
  let path = `${API_URL}/pending-proposals`;

  if (username !== undefined || username !== null) {
    path = path + `?username=${username}`;
  }

  try {
    const response = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Unknown error:", error);
    return null;
  }
};

export const getProposal = async (id: number): Promise<Proposal | null> => {
  try {
    const response = await fetch(`${API_URL}/get-proposal?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Unknown error:", error);
    return null;
  }
};

export const submitProposal = async (proposal: Proposal): Promise<string | null> => {
  try {
    const response = await fetch(`${API_URL}/submit-proposal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proposal),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Unknown error:", error);
    return null;
  }
}

export const giveFeedback = async (id: number, description: string, answer: boolean): Promise<string | null> => {
  try {
    const response = await fetch(`${API_URL}/give-feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        description: description,
        answer: answer,
      }),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Unknown error:", error);
    return null;
  }
}