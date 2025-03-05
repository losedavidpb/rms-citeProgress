export type Research = {
  id: number;
  title: string;
  description: string;
  authors: string[];
  tags: string[];
  status: string;
  date: string;
  citations: number;
};

const API_URL = "http://localhost:8080/api/research";

export const getAvailableResearch = async (): Promise<Research[] | null> => {
  try {
    const response = await fetch(`${API_URL}/available-research`, {
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

export const getResearch = async (id: number): Promise<Research | null> => {
  try {
    const response = await fetch(`${API_URL}/get-research?id=${id}`, {
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