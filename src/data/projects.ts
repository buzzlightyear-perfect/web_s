export type ProjectCategory = "ALL" | "WEB" | "GAME" | "SOFTWARE";

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  category: ProjectCategory;
  technologies: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
  features: string[];
}

export const projects: Project[] = [
  {
    id: "game-dev",
    title: "Game Development Project",
    description:
      "A Unity-based game featuring interconnected gameplay systems built from architecture to implementation.",
    problem:
      "Need a cohesive game prototype that demonstrates mastery of systems design, UI/UX, and gameplay mechanics within Unity.",
    solution:
      "Built a modular game with inventory, stamina, interaction, clothing, and trophy rack systems — each designed as an independent, testable module.",
    category: "GAME",
    technologies: ["Unity", "C#", "UI/UX", "Gameplay Systems"],
    image: "https://picsum.photos/seed/game-dev-unity/900/600",
    githubUrl: "https://github.com/[YOUR GITHUB]",
    demoUrl: "",
    features: [
      "Inventory System",
      "Stamina System",
      "Interaction System",
      "Clothing System",
      "Trophy Rack System",
      "Custom UI/UX",
      "Gameplay Mechanics",
    ],
  },
  {
    id: "warehouse-system",
    title: "Warehouse Inventory System",
    description:
      "A C-based inventory management system using core data structures and ADT principles.",
    problem:
      "Efficiently manage warehouse inventory data using proper data structures — requiring modular, reusable code.",
    solution:
      "Implemented a complete inventory system in C using linked lists, stacks, queues, and other ADTs for modular data management.",
    category: "SOFTWARE",
    technologies: ["C", "Data Structures", "ADT", "Modular Programming"],
    image: "https://picsum.photos/seed/warehouse-inventory/900/600",
    githubUrl: "https://github.com/[YOUR GITHUB]",
    demoUrl: "",
    features: [
      "Linked List Management",
      "Stack Operations",
      "Queue Processing",
      "Inventory CRUD",
      "Modular Architecture",
    ],
  },
  {
    id: "web-project",
    title: "Web Development Project",
    description:
      "A modern web application built with Next.js, React, and TypeScript — responsive and performant.",
    problem:
      "Need a polished web experience that works seamlessly across devices with modern tooling and clean architecture.",
    solution:
      "Built with Next.js, React, and TypeScript using Tailwind CSS — component-driven, accessible, and fully responsive.",
    category: "WEB",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "https://picsum.photos/seed/web-nextjs/900/600",
    githubUrl: "https://github.com/[YOUR GITHUB]",
    demoUrl: "",
    features: [
      "Responsive Design",
      "Component Architecture",
      "Type Safety",
      "Performance Optimized",
    ],
  },
];

export const categories: { label: string; value: ProjectCategory }[] = [
  { label: "ALL", value: "ALL" },
  { label: "WEB", value: "WEB" },
  { label: "GAME", value: "GAME" },
  { label: "SOFTWARE", value: "SOFTWARE" },
];
