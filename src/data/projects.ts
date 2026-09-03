export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  client: string;
  year: string;
  role: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  metrics: ProjectMetric[];
  features: ProjectFeature[];
  featured: boolean;
  accentColor: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "varasiddi-function-hall",
    title: "Varasiddi Function Hall",
    tagline: "A practical venue website built to help visitors discover, enquire, and plan.",
    category: "Business Website",
    client: "Varasiddi Function Hall",
    year: "2026",
    role: "Designer & Developer",
    description: "A real-world business website presenting the venue, events, accommodation, gallery, location, and direct enquiry paths in one clear experience.",
    longDescription: "Varasiddi Function Hall is a conversion-focused website for a local venue. The experience gives visitors the information they need before they make contact, from venue presentation and accommodation details to gallery, location, and enquiry flow.",
    challenge: "Bring several different visitor questions into one calm, easy-to-navigate website without making the experience feel like a brochure or an admin system.",
    solution: "Built a responsive business narrative with clear sections, prominent contact actions, useful venue information, visual proof, and an enquiry journey that works across devices.",
    architecture: ["Business-first information architecture", "Responsive page composition", "Enquiry and contact pathways"],
    techStack: ["Next.js", "React", "TypeScript", "CSS"],
    metrics: [],
    features: [
      { title: "Venue presentation", description: "Clear information for people comparing spaces for their event." },
      { title: "Gallery and location", description: "Visual proof and practical location context placed where visitors need it." },
      { title: "Direct enquiry", description: "Contact options and enquiry actions are available throughout the journey." },
    ],
    featured: true,
    accentColor: "linear-gradient(135deg, #c9784a 0%, #7d3e32 100%)",
    image: "/projects/Hotel .png",
    liveUrl: "https://varasiddi-function-hall.netlify.app/",
  },
  {
    id: "hr-analytics-excel-dashboard",
    title: "HR Analytics Excel Dashboard",
    tagline: "Interactive HR Analytics Dashboard built using Microsoft Excel",
    category: "Data Analytics",
    client: "Personal Project",
    year: "2026",
    role: "Developer",
    description: "Interactive HR Analytics Dashboard built using Microsoft Excel with Pivot Tables, Pivot Charts, KPI Cards, and Slicers.",
    longDescription: "An interactive dashboard built entirely in Excel to analyze HR metrics, visualize attrition, and track key performance indicators.",
    challenge: "Organizing raw HR data into a digestible, interactive format using only native Excel tools.",
    solution: "Utilized Pivot Tables, Slicers, and KPI cards to create a dynamic reporting interface.",
    architecture: [],
    techStack: ["Microsoft Excel", "Pivot Tables", "Data Visualization"],
    metrics: [],
    features: [],
    featured: true,
    accentColor: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    image: "/projects/Hr .png",
    githubUrl: "https://github.com/kovvurujavidh/HR-Analytics-Excel-Dashboard"
  },
  {
    id: "hr-analytics-sql",
    title: "HR Analytics SQL",
    tagline: "HR Analytics Project using SQL",
    category: "Data Engineering",
    client: "Personal Project",
    year: "2026",
    role: "Developer",
    description: "HR Analytics Project using SQL to analyze employee attrition, salaries, departments, and workforce insights.",
    longDescription: "A comprehensive data analysis project using raw SQL queries to extract workforce insights and metrics from HR databases.",
    challenge: "Querying complex relational datasets to extract actionable insights about attrition and compensation.",
    solution: "Designed optimized SQL queries to aggregate and analyze the dataset efficiently.",
    architecture: [],
    techStack: ["SQL", "Data Analysis"],
    metrics: [],
    features: [],
    featured: true,
    accentColor: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    image: "/projects/hr_analytics_sql_thumbnail_1788355351925.jpg",
    githubUrl: "https://github.com/kovvurujavidh/HR-Analytics-SQL"
  },
  {
    id: "my-trading-bot",
    title: "MyTradingBot",
    tagline: "Algorithmic Trading Bot",
    category: "Automation",
    client: "Personal Project",
    year: "2026",
    role: "Developer",
    description: "An automated trading bot built in Python to execute algorithmic strategies.",
    longDescription: "A Python-based automated trading system designed to parse market data and execute predefined trading logic.",
    challenge: "Handling market data streams and executing logic programmatically.",
    solution: "Built a Python architecture to process market conditions and execute trades.",
    architecture: [],
    techStack: ["Python", "Algorithmic Trading"],
    metrics: [],
    features: [],
    featured: true,
    accentColor: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    image: "/projects/Tradingbot .png",
    githubUrl: "https://github.com/kovvurujavidh/MyTradingBot"
  },
  {
    id: "trading-indicator",
    title: "Trading Indicator",
    tagline: "Market indicator implementation",
    category: "Web Frontend",
    client: "Personal Project",
    year: "2026",
    role: "Developer",
    description: "A web-based trading indicator project.",
    longDescription: "An implementation of technical market indicators built for the web.",
    challenge: "Visualizing technical indicators on web-based charts.",
    solution: "Implemented HTML/JS frontend to render market data indicators.",
    architecture: [],
    techStack: ["HTML", "JavaScript"],
    metrics: [],
    features: [],
    featured: false,
    accentColor: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    image: "/projects/trading_indicator_thumbnail_1788355406408.jpg",
    githubUrl: "https://github.com/kovvurujavidh/Trading-Indicator"
  }
];

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => p.featured).slice(0, 3);
}

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
