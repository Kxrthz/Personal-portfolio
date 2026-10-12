export const navigation = ["01_HOME", "02_ABOUT", "03_SKILLS", "04_PROJECTS", "05_EXPERIENCE", "06_EDUCATION", "07_CERTIFICATIONS", "08_ACHIEVEMENTS", "09_CONTACT"];

export const skillGroups = [
  { name: "PROGRAMMING", skills: ["Java", "SQL", "JavaScript", "TypeScript", "Python"] },
  { name: "FRONTEND", skills: ["React.js", "HTML5", "CSS3", "Responsive Web Design", "DOM Manipulation", "Client-side State Management"] },
  { name: "BACKEND", skills: ["Node.js", "Express.js", "Spring Boot", "REST API Development", "CRUD Operations", "JWT Authentication", "Backend Architecture", "API Integration"] },
  { name: "DATABASE", skills: ["MongoDB", "MySQL", "Database Schema Design", "SQL Queries", "Data Modeling"] },
  { name: "TOOLS", skills: ["Git", "GitHub", "VS Code", "Vercel", "Render", "Postman"] },
  { name: "CORE CS", skills: ["OOP", "DSA", "Java Collections Framework", "Exception Handling", "MVC Architecture"] },
  { name: "CLOUD / AI", skills: ["Microsoft Azure AI Fundamentals", "Machine Learning Fundamentals", "Data Preprocessing", "Feature Scaling", "Model Evaluation"] },
];

export type PortfolioProject = {
  number: string;
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  sourceUrl: string;
  highlights: string[];
};

export const projects: PortfolioProject[] = [
  {
    number: "01", id: "nivor", title: "NIVOR",
    description: "Full-Stack Personal Productivity & Personal Workspace",
    technologies: ["React 19", "TypeScript", "Vite", "Java 21", "Spring Boot", "PostgreSQL"],
    liveUrl: "https://nivor-iota.vercel.app/", sourceUrl: "https://github.com/Kxrthz/",
    highlights: ["A personal workspace for planning, knowledge capture, focused work, habits, and personal financial tracking.", "Modular Controller–Service–Repository architecture with REST APIs, JWT authentication, BCrypt hashing, and protected routes.", "Normalized PostgreSQL data with JPA/Hibernate; deployed through Vercel and Render."],
  },
  {
    number: "02", id: "medishield", title: "MEDISHIELD",
    description: "Pharmacy Operations & AI-Assisted Compatibility Screening",
    technologies: ["Python", "Google Gemini API", "PostgreSQL / MySQL", "Gunicorn", "Render"],
    liveUrl: "https://medishield-ycvj.onrender.com/", sourceUrl: "https://github.com/Kxrthz/",
    highlights: ["Pharmacy workflows for medicine catalogs, inventory, patient records, prescription billing, and invoice generation.", "Gemini-assisted ingredient normalization, structured JSON validation, compatibility screening, and severity classification.", "Role-based access, transactional database operations, CSV/PDF reporting, and dashboard analytics."],
  },
  {
    number: "03", id: "tmfy", title: "tmfy.",
    description: "Personalized Digital Notes Web App",
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "Vercel"],
    liveUrl: "https://tmfy.vercel.app/", sourceUrl: "https://github.com/Kxrthz/",
    highlights: ["A lightweight app for creating and sharing personalized digital notes through unique generated links.", "Five themed experiences with customizable recipient, message, sender, and message starters.", "Dynamic DOM updates and one-click clipboard sharing."],
  },
];
