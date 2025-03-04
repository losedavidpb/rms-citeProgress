export type ResearchItem = {
  id: number;
  title: string;
  description: string;
  authors: string;
  tags: string;
  status: string;
  date: Date;
  citations: number;
};

export const researchList = [
  {
    id: 1,
    title: "AI in Healthcare: A Comprehensive Literature Review",
    description:
      "Exploring the use of AI in diagnosing diseases and predicting patient outcomes using large datasets.",
    authors: "John Doe, Jane Smith",
    tags: "health, AI, diagnostics",
    status: "Under Review",
    date: new Date("2025-10-10"),
    citations: 15,
  },
  {
    id: 2,
    title: "Machine Learning for Personalized Medicine",
    description:
      "Investigation of machine learning algorithms that create tailored treatment plans for patients.",
    authors: "Alice Brown, Bob Johnson",
    tags: "health, AI, personalized medicine",
    status: "Published",
    date: new Date("2025-08-15"),
    citations: 30,
  },
  {
    id: 3,
    title: "Deep Learning in Radiology: A Breakthrough for Diagnosing Cancer",
    description:
      "Study on the potential of deep learning techniques to improve diagnostic accuracy in radiology.",
    authors: "Emily Davis, Michael Lee",
    tags: "health, deep learning, radiology",
    status: "Under Review",
    date: new Date("2025-09-20"),
    citations: 8,
  },
  {
    id: 4,
    title: "AI-Driven Drug Discovery and Development",
    description:
      "Reviewing the progress and challenges in using AI for the discovery of new drugs and therapies.",
    authors: "Olivia Wilson, David Harris",
    tags: "health, AI, drug discovery",
    status: "Published",
    date: new Date("2025-06-30"),
    citations: 45,
  },
  {
    id: 5,
    title: "Predicting Disease Progression Using AI Algorithms",
    description:
      "A comprehensive study of AI models that predict the progression of chronic diseases over time.",
    authors: "James Clark, Sophia Turner",
    tags: "health, AI, disease progression",
    status: "Under Review",
    date: new Date("2025-07-25"),
    citations: 25,
  },
  {
    id: 6,
    title: "AI and Robotics: Transforming Surgery",
    description:
      "Exploring the synergy between AI and robotics to revolutionize minimally invasive surgery techniques.",
    authors: "Liam King, Isabella Scott",
    tags: "health, AI, robotics, surgery",
    status: "Published",
    date: new Date("2025-05-10"),
    citations: 60,
  },
  {
    id: 7,
    title:
      "Artificial Intelligence in Epidemiology: Tracking Disease Outbreaks",
    description:
      "Investigating how AI can enhance epidemiological studies and assist in the early detection of disease outbreaks.",
    authors: "Michael Adams, Emma Martinez",
    tags: "health, AI, epidemiology",
    status: "Under Review",
    date: new Date("2025-04-01"),
    citations: 10,
  },
  {
    id: 8,
    title: "AI-Assisted Diagnosis of Neurological Disorders",
    description:
      "Examining the potential of AI algorithms in diagnosing various neurological conditions.",
    authors: "Lucas Moore, Ava Young",
    tags: "health, AI, neurology",
    status: "Published",
    date: new Date("2025-03-15"),
    citations: 18,
  },
  {
    id: 9,
    title: "The Future of AI in Mental Health Diagnosis",
    description:
      "Reviewing AI tools that aid in diagnosing and treating mental health disorders.",
    authors: "Elijah White, Mia Harris",
    tags: "health, AI, mental health",
    status: "Under Review",
    date: new Date("2025-11-20"),
    citations: 12,
  },
  {
    id: 10,
    title:
      "AI for Healthcare Data Privacy: Ensuring Security in the Digital Age",
    description:
      "Exploring the role of AI in maintaining data privacy and security within healthcare systems.",
    authors: "Benjamin Taylor, Charlotte Green",
    tags: "health, AI, cybersecurity",
    status: "Under Review",
    date: new Date("2025-12-01"),
    citations: 20,
  },
];
