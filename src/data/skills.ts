export interface SkillCategory {
  label: string;
  value: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: string;
  description: string;
}

export const skillCategories: SkillCategory[] = [
  { label: "ALL", value: "ALL" },
  { label: "LANGUAGES", value: "Languages" },
  { label: "WEB", value: "Web" },
  { label: "GAME", value: "Game" },
  { label: "TOOLS", value: "Tools" },
];

export const skills: Skill[] = [
  {
    name: "C",
    icon: "LogoCpp",
    category: "Languages",
    description: "Systems programming, algorithms, data structures",
  },
  {
    name: "C++",
    icon: "LogoCpp",
    category: "Languages",
    description: "Game engine development, performance-critical applications",
  },
  {
    name: "Go",
    icon: "Go",
    category: "Languages",
    description: "Backend services, cloud-native applications",
  },
  {
    name: "JavaScript",
    icon: "LogoJavascript",
    category: "Languages",
    description: "Web scripting, interactive applications",
  },
  {
    name: "TypeScript",
    icon: "LogoTypeScript",
    category: "Languages",
    description: "Type-safe JavaScript development",
  },
  {
    name: "HTML",
    icon: "Html5",
    category: "Languages",
    description: "Semantic markup, web structure",
  },
  {
    name: "CSS",
    icon: "Css3",
    category: "Languages",
    description: "Responsive styling, layout systems",
  },
  {
    name: "React",
    icon: "LogoReact",
    category: "Web",
    description: "Component-based UI libraries",
  },
  {
    name: "Next.js",
    icon: "Nextjs",
    category: "Web",
    description: "Full-stack React framework",
  },
  {
    name: "Tailwind CSS",
    icon: "Wind",
    category: "Web",
    description: "Utility-first CSS framework",
  },
  {
    name: "Unity",
    icon: "Unity",
    category: "Game",
    description: "Cross-platform game engine",
  },
  {
    name: "Godot",
    icon: "Godot",
    category: "Game",
    description: "Open-source game engine",
  },
  {
    name: "Git",
    icon: "GitBranch",
    category: "Tools",
    description: "Version control system",
  },
  {
    name: "GitHub",
    icon: "Github",
    category: "Tools",
    description: "Code hosting and collaboration",
  },
  {
    name: "VS Code",
    icon: "VsCode",
    category: "Tools",
    description: "Code editor and IDE",
  },
  {
    name: "Blender",
    icon: "Mesh3D",
    category: "Tools",
    description: "3D modeling and animation",
  },
  {
    name: "Blockbench",
    icon: "Cube",
    category: "Tools",
    description: "3D model editor for games",
  },
];
