export const projects = [
  {
    id: 1,
    slug: "farm-beware",
    title: "Farm-Beware",
    category: "GAME",
    description:
      "A game development project built with Unity featuring multiple complex systems including inventory management, stamina mechanics, and interactive environments.",
    longDescription:
      "A comprehensive game development project showcasing advanced programming patterns and game design principles. Built entirely in Unity with C#, this project demonstrates proficiency in game architecture, player mechanics, and UI/UX design within a game context.",
    role: "Game Programmer",
    technologies: ["Unity", "C#", "Game Design", "UI/UX"],
    features: [
      "Inventory system with item stacking and management",
      "Stamina system for gameplay balance",
      "Interactive object system with player feedback",
      "Clothing customization system",
      "Trophy rack achievement display",
      "Responsive and intuitive UI/UX",
    ],
    problem:
      "Creating a cohesive game experience requires integrating multiple interdependent systems that must work together seamlessly while maintaining performance and player engagement.",
    solution:
      "Implemented a modular architecture where each system operates independently but communicates through event-driven patterns, allowing for easy testing, maintenance, and future expansion.",
    image: "/projects/farm-beware.svg",
    github: null,
    demo: null,
    year: "2024",
  },
  {
    id: 2,
    slug: "warehouse-inventory",
    title: "Warehouse Inventory System",
    category: "OTHER",
    description:
      "A command-line inventory management system built from scratch using C with custom data structures and abstract data types.",
    longDescription:
      "A comprehensive warehouse inventory management system developed as a core data structures project. This system demonstrates mastery of fundamental computer science concepts by implementing custom data structures from the ground up.",
    role: "Software Developer",
    technologies: ["C", "Data Structures", "ADT", "File I/O"],
    features: [
      "Custom linked list implementation for dynamic data storage",
      "Stack-based operation history and undo functionality",
      "Queue system for processing inventory operations",
      "Efficient search and sort algorithms",
      "Persistent data storage with file I/O",
      "Memory-efficient resource management",
    ],
    problem:
      "Managing warehouse inventory requires efficient data retrieval, modification, and storage while handling varying data volumes and ensuring data integrity across operations.",
    solution:
      "Implemented custom data structures optimized for each operation type: linked lists for flexible storage, stacks for operation history, and queues for batch processing, all with O(n) or better time complexity.",
    image: "/projects/inventory-system.svg",
    github: null,
    demo: null,
    year: "2024",
  },
  {
    id: 3,
    slug: "portfolio-website",
    title: "Developer Portfolio",
    category: "WEB",
    description:
      "A modern, interactive portfolio website built with Next.js featuring smooth animations and responsive design.",
    longDescription:
      "A personal portfolio website designed and developed from scratch using modern web technologies. This project showcases both technical proficiency and design sensibility, creating an engaging user experience that reflects professional capabilities.",
    role: "Frontend Developer",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    features: [
      "Server-side rendering for optimal performance",
      "Responsive design across all device sizes",
      "Smooth scroll-triggered animations",
      "Interactive project filtering and modals",
      "Dark mode support with system preference detection",
      "SEO-optimized with proper metadata",
    ],
    problem:
      "A developer portfolio needs to demonstrate technical skills while being visually impressive, performant, and accessible across all devices and browsers.",
    solution:
      "Built with Next.js App Router for optimal rendering, Tailwind CSS for consistent styling, and Framer Motion for performant animations. Implemented component-based architecture for maintainability.",
    image: "/projects/portfolio.svg",
    github: null,
    demo: null,
    year: "2025",
  },
];

export const categories = ["ALL", "WEB", "GAME", "OTHER"];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export function getAllSlugs() {
  return projects.map((p) => p.slug);
}
