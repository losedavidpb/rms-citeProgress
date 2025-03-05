export type Proposal = {
  id: number;
  title: string;
  description: string;
  authors: string;
  tags: string;
  date: Date;
  citations: number;
};

export const proposalList: Proposal[] = [
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