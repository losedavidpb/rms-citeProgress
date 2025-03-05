import { User } from "../account/api";
import { Research } from "../research/api";

export type Proposal = {
  author: User;
  research: Research;
};

/*export const proposalList: Proposal[] = [
  {
    id: 1,
    title: "Research Proposal 1",
    authors: "Author One, Author Two",
    tags: "AI, Machine Learning",
    description: "This is a description of the first research proposal.",
    date: new Date("2023-03-01"),
    citations: 10,
  },
  {
    id: 2,
    title: "Research Proposal 2",
    authors: "Author Three, Author Four",
    tags: "Quantum Computing, Physics",
    description: "This is a description of the second research proposal.",
    date: new Date("2024-06-15"),
    citations: 5,
  },
];
*/
export const proposalList = [];
const API_URL = "http://localhost:8080/api/proposal";

export const getPendingProposals = async (): Promise<Proposal[] | null> => {
  try {
    const response = await fetch(`${API_URL}/pending-proposals`, {
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
