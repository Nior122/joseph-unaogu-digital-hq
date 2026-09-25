export const site = {
  name: "Joseph Unaogu",
  role: "Digital Builder",
  email: "chinecheremjoseph39@gmail.com",
  location: "Remote · Working worldwide",
  tagline: "A digital builder in motion — exploring the intersection of technology, AI, automation, writing, and creativity.",
  brand: "BUILD. EXPLORE. CREATE.",
  resumeUrl: "#",
  socials: [
    { label: "WhatsApp", href: "https://wa.me/2347046118938", handle: "+234 704 611 8938" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/joseph-unaogu-72b2ba245/", handle: "in/joseph-unaogu" },
    { label: "X / Twitter", href: "https://x.com/Bigcherem", handle: "@Bigcherem" },
  ],
};

export const rotatingWords = [
  "DIGITAL EXPERIENCES",
  "AI SYSTEMS",
  "AUTOMATION WORKFLOWS",
  "WEBSITES",
  "DIGITAL PRODUCTS",
  "STORIES",
  "IDEAS",
];

export const heroParagraph =
  "I'm Joseph Unaogu — a digital builder exploring software, AI, automation, writing, and creative technology. I learn by building real things and turn ideas into useful digital experiences.";

export type ExploreStatus = "building" | "exploring" | "learning" | "experimenting";

export const currentlyExploring: { label: string; status: ExploreStatus }[] = [
  { label: "AI Applications", status: "building" },
  { label: "Automation Systems", status: "experimenting" },
  { label: "Next.js", status: "building" },
  { label: "AI Content Workflows", status: "exploring" },
  { label: "YouTube & Content", status: "exploring" },
  { label: "eBook Publishing", status: "building" },
  { label: "Copywriting", status: "learning" },
  { label: "Full-stack Web Dev", status: "building" },
  { label: "Local AI Experiments", status: "exploring" },
];

export const buildingNow: string[] = [
  "Improving my personal portfolio",
  "Exploring AI-powered applications",
  "Building digital products",
  "Exploring automation workflows",
  "Creating content systems",
  "Improving my writing and software skills",
];

export const marqueeItems = [
  "SOFTWARE DEVELOPMENT", "AI", "AUTOMATION", "WEB DEVELOPMENT", "eBOOKS",
  "COPYWRITING", "CONTENT", "YOUTUBE", "CREATIVE TECHNOLOGY", "DIGITAL PRODUCTS",
  "WRITING", "DESIGN", "SAAS", "DASHBOARDS", "AUTOMATION WORKFLOWS",
];

export const aboutParagraphs = [
  "I studied Computer Science and developed a broad interest in technology, software, AI, automation, digital products, writing, content creation, and creative technology.",
  "I don't want to only consume technology — I want to understand it by building with it. My path is shaped by experimentation: I pick up a tool, try to make something real, and learn the hard parts by solving them.",
  "I'm interested in how technology can solve problems, simplify work, create opportunities, and transform ideas into useful products. Some areas I'm still developing; others — like writing and content — I've practiced deeply. The honest mix is what makes the work mine.",
];

export type TimelinePhase = { id: string; title: string; body: string };
export const journey: TimelinePhase[] = [
  { id: "foundation", title: "Foundation", body: "Studied Computer Science and developed a strong interest in technology and digital systems." },
  { id: "exploration", title: "Exploration", body: "Started exploring software development, websites, AI tools, automation, content creation, and digital products." },
  { id: "building", title: "Building", body: "Began turning ideas into actual projects, applications, websites, automations, and content systems." },
  { id: "creating", title: "Creating", body: "Developed a deeper interest in eBook writing, copywriting, YouTube, digital content, and creative technology." },
  { id: "now", title: "Now", body: "Continuing to learn, build, experiment, and develop stronger professional skills." },
];

export type SkillLevel = "Professional" | "Intermediate / Practical" | "AI / Practical" | "Automation / Practical" | "Creative / Exploring";
export type SkillCategory = "software" | "ai" | "automation" | "writing" | "creative";

export type SkillNode = {
  id: string; label: string; short: string; category: SkillCategory; level: SkillLevel;
  accent: string; blurb: string;
};

export const skillNodes: SkillNode[] = [
  // writing (professional)
  { id: "ebook", short: "eBook", label: "eBook Writing", category: "writing", level: "Professional", accent: "#ff4dcb", blurb: "Structuring long-form, reader-focused books from idea to finished draft." },
  { id: "copy", short: "Copy", label: "Copywriting", category: "writing", level: "Professional", accent: "#ff4dcb", blurb: "Website, sales, product, and conversion-focused copy that communicates." },
  { id: "content", short: "Content", label: "Content Writing", category: "writing", level: "Professional", accent: "#ff4dcb", blurb: "Articles, educational and technology content, digital publishing." },
  // software
  { id: "html", short: "HTML", label: "HTML/CSS", category: "software", level: "Intermediate / Practical", accent: "#3df0ff", blurb: "Semantic, responsive markup and modern styling." },
  { id: "js", short: "JS", label: "JavaScript", category: "software", level: "Intermediate / Practical", accent: "#3df0ff", blurb: "Hands-on JS for interactive web experiences." },
  { id: "ts", short: "TS", label: "TypeScript", category: "software", level: "Intermediate / Practical", accent: "#3df0ff", blurb: "Typed development for more reliable apps." },
  { id: "react", short: "React", label: "React", category: "software", level: "Intermediate / Practical", accent: "#3df0ff", blurb: "Component-based UI development." },
  { id: "next", short: "Next", label: "Next.js", category: "software", level: "Intermediate / Practical", accent: "#3df0ff", blurb: "Full-stack React framework for real products." },
  { id: "python", short: "Python", label: "Python", category: "software", level: "Intermediate / Practical", accent: "#3df0ff", blurb: "Scripting, automation, and backend experimentation." },
  { id: "api", short: "API", label: "API Integration", category: "software", level: "Intermediate / Practical", accent: "#3df0ff", blurb: "Connecting services and data sources." },
  { id: "db", short: "DB", label: "Database Concepts", category: "software", level: "Intermediate / Practical", accent: "#3df0ff", blurb: "PostgreSQL, Prisma, data modeling fundamentals." },
  { id: "auth", short: "Auth", label: "Auth Systems", category: "software", level: "Intermediate / Practical", accent: "#3df0ff", blurb: "Authentication and user sessions." },
  { id: "git", short: "Git", label: "Git / GitHub", category: "software", level: "Intermediate / Practical", accent: "#3df0ff", blurb: "Version control and collaboration." },
  // ai
  { id: "aiapp", short: "AI Apps", label: "AI Applications", category: "ai", level: "AI / Practical", accent: "#a974ff", blurb: "Building AI-powered products and assistants." },
  { id: "llm", short: "LLM", label: "LLM Integrations", category: "ai", level: "AI / Practical", accent: "#a974ff", blurb: "Wiring large language models into real workflows." },
  { id: "chatbot", short: "Chatbot", label: "AI Chatbots", category: "ai", level: "AI / Practical", accent: "#a974ff", blurb: "Conversational assistants and support bots." },
  { id: "prompt", short: "Prompt", label: "Prompt Engineering", category: "ai", level: "AI / Practical", accent: "#a974ff", blurb: "Designing effective prompts and templates." },
  { id: "img", short: "AI Img", label: "AI Image Gen", category: "ai", level: "AI / Practical", accent: "#a974ff", blurb: "Image generation and visual experiments." },
  { id: "aiauto", short: "AI Auto", label: "AI Automation", category: "ai", level: "AI / Practical", accent: "#a974ff", blurb: "Using AI to automate repetitive work." },
  // automation
  { id: "make", short: "Make", label: "Make.com", category: "automation", level: "Automation / Practical", accent: "#b6ff3d", blurb: "Visual automation workflows." },
  { id: "n8n", short: "n8n", label: "n8n", category: "automation", level: "Automation / Practical", accent: "#b6ff3d", blurb: "Self-hostable workflow automation." },
  { id: "sheets", short: "Sheets", label: "Google Sheets Auto", category: "automation", level: "Automation / Practical", accent: "#b6ff3d", blurb: "Spreadsheet-driven automation." },
  { id: "pub", short: "Publish", label: "Automated Publishing", category: "automation", level: "Automation / Practical", accent: "#b6ff3d", blurb: "Scheduled content publishing systems." },
  // creative
  { id: "video", short: "Video", label: "Video Editing", category: "creative", level: "Creative / Exploring", accent: "#ffb13d", blurb: "Editing and short-form video." },
  { id: "anim", short: "Anim", label: "Animation", category: "creative", level: "Creative / Exploring", accent: "#ffb13d", blurb: "Motion and visual storytelling." },
  { id: "yt", short: "YouTube", label: "YouTube Content", category: "creative", level: "Creative / Exploring", accent: "#ffb13d", blurb: "Planning educational and useful content." },
  { id: "visual", short: "Visual", label: "Visual Storytelling", category: "creative", level: "Creative / Exploring", accent: "#ffb13d", blurb: "Communicating ideas visually." },
];

export const skillCategories: { id: SkillCategory | "all"; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "software", label: "SOFTWARE" },
  { id: "ai", label: "AI" },
  { id: "automation", label: "AUTOMATION" },
  { id: "writing", label: "WRITING" },
  { id: "creative", label: "CONTENT & MEDIA" },
];

export type ProjectAvailability =
  | "Live" | "In Development" | "Private Preview"
  | "Available for Customization" | "Available for Acquisition" | "Concept" | "Experiment";

export type ProjectStatus = "live" | "in-progress" | "experiment" | "concept" | "archived";
export type ProjectHealth = "ONLINE" | "OFFLINE" | "AUTH_REQUIRED" | "ERROR" | "UNKNOWN";

// Real website screenshot pipeline (priority 1). Uses a hosted headless-browser
// rendering service so the thumbnail shows the ACTUAL site, not a placeholder.
// Priority order: live screenshot -> manual upload (previewImage) -> designed fallback.
export function screenshotUrl(url: string, opts?: { width?: number; full?: boolean }): string {
  const clean = url.replace(/^https?:\/\//, "");
  const width = opts?.width ?? 1200;
  const full = opts?.full ? "/full" : "";
  return `https://image.thum.io/get${full}/width/${width}/https://${clean}`;
}

export type Project = {
  id: string; name: string; url: string; description: string;
  category: string; accent: string;
  status: ProjectStatus; availability: ProjectAvailability;
  featured?: boolean; tech: string[]; role: string;
  problem: string; approach: string; lessons: string;
  health: ProjectHealth; lastChecked: string;
  lastPreview?: string;
  previewImage?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: "drape", name: "Drape", url: "https://drape-fzs.pages.dev/",
    description: "A bespoke fashion marketplace connecting discerning clients with talented tailors and designers for fully custom-made clothing and accessories.",
    category: "E-commerce", accent: "#ffb13d", status: "live", availability: "Available for Customization",
    featured: true, tech: ["Next.js", "React", "Marketplace UI", "E-commerce"], role: "Designer & Developer",
    problem: "Finding reliable tailors and designers for custom clothing is difficult, and the commission process is often disorganized.",
    approach: "Designed a premium marketplace experience to streamline discovery, communication, and commissions between clients and fashion creators.",
    lessons: "In premium e-commerce, the visual interface and trust signals are just as important as the functional transaction flow.",
    health: "ONLINE", lastChecked: "Recent",
  },
  {
    id: "eduflow", name: "EduFlow", url: "https://eduflow-five-psi.vercel.app/",
    description: "An AI-powered school operating system that digitizes everything from attendance to AI-generated report comments and lesson plans.",
    category: "SAAS", accent: "#4d8bff", status: "live", availability: "Available for Customization",
    featured: true, tech: ["Next.js", "React", "AI Integrations", "Role-Based Auth"], role: "Builder & Developer",
    problem: "School administration involves tedious manual tasks like report writing, attendance tracking, and lesson planning that take time away from students.",
    approach: "Built a comprehensive dashboard platform featuring student management, role-based access, and AI tools for generating educational content.",
    lessons: "Automating routine administrative tasks with AI can save hundreds of hours, making educational software highly impactful.",
    health: "ONLINE", lastChecked: "Recent",
    previewImage: "/projects/eduflow.png",
  },
  {
    id: "hireflows", name: "HireFlow", url: "https://hireflows.vercel.app/",
    description: "An AI-powered job tracker and recruitment platform for tracking applications, optimizing resumes, and managing hiring pipelines.",
    category: "SAAS", accent: "#a974ff", status: "live", availability: "Available for Customization",
    featured: true, tech: ["Next.js", "Clerk", "Prisma", "Groq AI", "shadcn/ui"], role: "Builder & Developer",
    problem: "Managing the recruitment process and tracking job applications is often manual and tedious for both job seekers and employers.",
    approach: "Built a comprehensive platform featuring an AI-powered Kanban board for application tracking and smart candidate pipelines.",
    lessons: "Integrating AI directly into workflows (like email scanning and reply drafting) delivers the most immediate value to users.",
    health: "ONLINE", lastChecked: "Recent",
    previewImage: "/projects/hireflow.png",
  },
  {
    id: "velvet-fade", name: "Velvet & Fade", url: "https://velvet-and-fade-salon.vercel.app/",
    description: "A premium digital experience for a modern salon and beauty business — presenting services, atmosphere, brand identity, and customer conversion through an elegant web experience.",
    category: "Websites", accent: "#ff4dcb", status: "live", availability: "Available for Customization",
    featured: true, tech: ["Next.js", "Tailwind", "Framer Motion"], role: "Designer & Developer",
    problem: "A salon needed an online presence that felt as polished as its in-person experience.",
    approach: "I built an elegant, brand-led site focused on atmosphere, services, and conversion.",
    lessons: "Strong visual hierarchy and restraint communicate premium far better than decoration.",
    health: "ONLINE", lastChecked: "Recent",
  },
  {
    id: "northgate", name: "Northgate Properties", url: "https://northgate-properties.vercel.app/",
    description: "A modern property-focused digital experience presenting real estate listings with a polished browsing experience for buyers and clients.",
    category: "Websites", accent: "#4d8bff", status: "live", availability: "Available for Customization",
    featured: true, tech: ["Next.js", "Tailwind", "Maps UI"], role: "Designer & Developer",
    problem: "Property browsing needed to feel trustworthy and easy to scan.",
    approach: "A clean, listing-first layout with strong imagery and clear calls to action.",
    lessons: "Information architecture matters more than color for real-estate usability.",
    health: "ONLINE", lastChecked: "Recent",
  },
  {
    id: "ember-spice", name: "Ember & Spice", url: "https://ember-and-spice-kohl.vercel.app/",
    description: "A modern restaurant digital experience communicating atmosphere, food, brand personality, and customer appeal through an engaging web interface.",
    category: "Websites", accent: "#ffb13d", status: "live", availability: "Available for Customization",
    featured: true, tech: ["Next.js", "Tailwind", "Framer Motion"], role: "Designer & Developer",
    problem: "A restaurant needed warmth and personality online, not a generic template.",
    approach: "A warm, imagery-led design that sells the feeling of the place.",
    lessons: "Mood and typography do most of the selling for food brands.",
    health: "ONLINE", lastChecked: "Recent",
  },
  {
    id: "adura-glow", name: "Adura Glow Oil", url: "https://adura-glow-oil-store.vercel.app/",
    description: "A digital storefront for a beauty and botanical product brand, presenting products through a polished, visually focused shopping experience.",
    category: "E-commerce", accent: "#b6ff3d", status: "live", availability: "Available for Customization",
    featured: true, tech: ["Next.js", "Tailwind", "Product UI"], role: "Designer & Developer",
    problem: "A product brand needed a storefront that felt premium and focused on the product.",
    approach: "A clean product experience with strong visuals and simple purchase flow.",
    lessons: "Reducing friction at every step increases perceived quality.",
    health: "ONLINE", lastChecked: "Recent",
  },
  {
    id: "supportiq", name: "SupportIQ", url: "https://supportiq-two.vercel.app/",
    description: "An AI-powered customer support platform concept helping businesses create intelligent support experiences using business-specific knowledge and AI-powered conversations.",
    category: "AI", accent: "#a974ff", status: "in-progress", availability: "Private Preview",
    featured: true, tech: ["Next.js", "TypeScript", "LLM APIs", "Auth", "PostgreSQL"],
    role: "Builder & Designer",
    problem: "Small businesses struggle to give fast, consistent support without a full team.",
    approach: "A chatbot that reads uploaded business documents and answers from that context.",
    lessons: "Retrieval quality matters more than the model alone — chunking and source handling decide real quality.",
    health: "AUTH_REQUIRED", lastChecked: "Recent",
    repo: undefined,
  },
  {
    id: "scrolltek", name: "ScrollTek", url: "https://newsz-delta.vercel.app/",
    description: "A digital publication platform covering technology, digital culture, AI tools, phone tips, lifestyle, productivity, and trending topics — a content-driven media experience.",
    category: "Media", accent: "#3df0ff", status: "live", availability: "Available for Customization",
    featured: false, tech: ["Next.js", "Tailwind", "CMS-style"], role: "Builder & Editor",
    problem: "A content platform needed to feel current, readable, and easy to browse.",
    approach: "A media layout built around fast reading and clear topic structure.",
    lessons: "Content systems live or die by how easy it is to publish consistently.",
    health: "ONLINE", lastChecked: "Recent",
  },
  {
    id: "aduke-admin", name: "Aduke Studio Admin Panel", url: "https://admin-dashboard-ashy-tau-44.vercel.app/",
    description: "A dashboard interface for managing and controlling digital content and business systems through a structured administrative experience.",
    category: "Dashboards", accent: "#46e6a0", status: "live", availability: "Available for Customization",
    featured: false, tech: ["Next.js", "Tailwind", "Dashboard UI"], role: "Designer & Developer",
    problem: "Managing content and systems needed a clear, structured control surface.",
    approach: "A dashboard focused on clarity, density, and quick actions.",
    lessons: "Admin tools succeed when the most common task is one click away.",
    health: "ONLINE", lastChecked: "Recent",
  },
];

export const projectFilters: { id: string; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "websites", label: "WEBSITES" },
  { id: "ai", label: "AI" },
  { id: "saas", label: "SAAS" },
  { id: "dashboards", label: "DASHBOARDS" },
  { id: "e-commerce", label: "E-COMMERCE" },
  { id: "media", label: "MEDIA" },
  { id: "experiments", label: "EXPERIMENTS" },
];

export function projectMatchesFilter(p: Project, filter: string): boolean {
  if (filter === "all") return true;
  const c = p.category.toLowerCase();
  if (filter === "experiments") return p.status === "experiment" || p.status === "concept";
  return c.includes(filter) || (filter === "ai" && c === "ai");
}

export type Service = {
  id: string; title: string; accent: string; summary: string; highlights: string[];
  cta: string;
  ctaHref: string;
  ctaLabel: string;
};

// Reusable service → portfolio routing. Every CTA points at the correct proof-of-work section.
export const services: Service[] = [
  { id: "ebooks", title: "eBook Writing & Creation", accent: "#ff4dcb", summary: "Turn ideas into structured, engaging, professionally written eBooks — ready for publishing.", highlights: ["Complete eBook writing", "Structure & chapter development", "Research-based nonfiction", "Editing & KDP-ready formatting"], cta: "Start an eBook project", ctaHref: "/writing", ctaLabel: "Explore Writing →" },
  { id: "copywriting", title: "Copywriting", accent: "#ff4dcb", summary: "Compelling copy for websites, landing pages, products, and campaigns that actually communicate.", highlights: ["Website & landing copy", "Sales & product descriptions", "Marketing & social copy", "Conversion-focused writing"], cta: "Get copy that converts", ctaHref: "/writing", ctaLabel: "See Writing Samples →" },
  { id: "ai-automation", title: "AI & Automation Solutions", accent: "#a974ff", summary: "Practical AI-powered workflows and automation for repetitive digital tasks — a growing area I build in.", highlights: ["AI workflow design", "Make.com & n8n workflows", "API integrations", "Content & chatbot automation"], cta: "Explore an automation", ctaHref: "/projects?category=ai-automation", ctaLabel: "Explore AI Projects →" },
  { id: "web", title: "Website Development", accent: "#3df0ff", summary: "Modern, responsive websites and interfaces — from personal sites to AI-powered web apps.", highlights: ["Business & portfolio sites", "Landing pages", "SaaS-style interfaces", "AI-powered web apps"], cta: "Build a website", ctaHref: "/projects?category=web-development", ctaLabel: "View Web Projects →" },
  { id: "ebook-cover", title: "eBook Cover Design", accent: "#ff4dcb", summary: "Cover design that captures a book's tone and draws the right reader — from concept direction to finished artwork.", highlights: ["Cover concept & direction", "Typography & layout", "Genre-aligned artwork", "Print & digital formats"], cta: "Design a cover", ctaHref: "/writing", ctaLabel: "View Book Covers →" },
  { id: "youtube", title: "YouTube & Content Creation", accent: "#ffb13d", summary: "I develop digital content from idea to finished visual experience, combining storytelling, research, AI tools, visual design, video editing, and content systems.", highlights: ["YouTube channel development", "Faceless YouTube content", "YouTube Shorts", "Scriptwriting", "Content ideation", "Visual storytelling", "AI-assisted production", "Video editing", "Animation", "Thumbnail concepts", "Content repurposing", "Social media content systems"], cta: "Start a content project", ctaHref: "/content", ctaLabel: "Explore Content Work →" },
];

// Maps a service CTA category param to an existing project filter id.
export function projectCategoryFromParam(param: string | null): string {
  if (!param) return "all";
  const map: Record<string, string> = {
    "ai-automation": "ai",
    "web-development": "websites",
    "dashboards": "dashboards",
    "saas": "saas",
    "digital-products": "e-commerce",
    "content-systems": "media",
  };
  return map[param] ?? "all";
}

// Four connected areas Joseph works across — used for the Services positioning block.
export const serviceGroups: { key: string; label: string; blurb: string; accent: string }[] = [
  { key: "build", label: "BUILD", blurb: "AI, automation, websites, and digital products.", accent: "#3df0ff" },
  { key: "write", label: "WRITE", blurb: "Fiction, nonfiction, eBooks, copywriting, and publishing.", accent: "#ff4dcb" },
  { key: "design", label: "DESIGN", blurb: "eBook covers, digital interfaces, and visual experiences.", accent: "#a974ff" },
  { key: "create", label: "CREATE", blurb: "YouTube, video, animation, storytelling, and AI-assisted content.", accent: "#ffb13d" },
];

// Content & Media skill pills for the Skills page.
export const contentSkills: { label: string }[] = [
  { label: "YouTube" },
  { label: "YouTube Shorts" },
  { label: "Faceless Content" },
  { label: "Video Editing" },
  { label: "Animation" },
  { label: "Visual Storytelling" },
  { label: "Scriptwriting" },
  { label: "Content Strategy" },
  { label: "AI Content Creation" },
  { label: "Thumbnail Design" },
  { label: "Content Automation" },
  { label: "Social Media Systems" },
];

export type Writing = {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  genre: "fiction" | "nonfiction";
  category: string;
  subcategory?: string;
  description: string;
  summary?: string;
  themes: string[];
  status: "Published" | "In Development" | "Researching" | "Concept" | "Idea" | "Draft" | "Planning";
  excerpt?: string;
  coverColor?: string;
  coverImage?: string;
  featured?: boolean;
  published?: boolean;
  link?: string;
};

export const writing: Writing[] = [
  {
    id: "productivity-busy-moms",
    title: "Productivity for Busy Moms",
    subtitle: "Practical Systems for Managing Family, Work, and Self",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "Productivity",
    subcategory: "Time Management",
    description: "Practical time management and productivity strategies designed specifically for mothers juggling family, work, and personal goals.",
    summary: "Modern motherhood often comes with an overwhelming number of responsibilities competing for the same limited hours of the day.\n\nThis book explores practical ways busy mothers can create more manageable systems for everyday life without chasing unrealistic versions of productivity.\n\nIt focuses on simplifying routines, organizing responsibilities, reducing mental overload, planning more effectively, and creating systems that work within the realities of family life.\n\nRather than promoting the idea that a mother must do everything perfectly, the book focuses on practical organization, realistic routines, and creating more breathing room in a busy life.",
    themes: ["Time management", "Daily routines", "Home organization", "Planning", "Mental overload", "Productivity", "Family responsibilities", "Practical systems"],
    status: "In Development",
    coverColor: "#b6ff3d",
    coverImage: "https://cdn.phototourl.com/free/2026-07-20-a627c161-6b67-4b6d-a6d0-c9dfea2b9be5.png",
    featured: true,
  },
  {
    id: "ai-tools-vas",
    title: "AI Tools for Virtual Assistants",
    subtitle: "Work Smarter, Deliver More Value",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "AI & Tech",
    subcategory: "AI Guides",
    description: "A practical guide to the AI tools and workflows that virtual assistants can use to work faster, communicate better, and deliver more value to their clients.",
    summary: "Artificial intelligence is changing the way many digital professionals work.\n\nAI Tools for Virtual Assistants explores practical ways virtual assistants can use modern AI tools to support their daily work, improve productivity, reduce repetitive tasks, and deliver better services to clients.\n\nThe book explores applications such as research, writing assistance, document creation, communication, organization, content support, and workflow automation.\n\nRather than presenting AI as a replacement for human skill, the book focuses on how virtual assistants can use AI as a practical tool to work more efficiently and expand the value they provide.",
    themes: ["AI tools", "Virtual assistance", "Productivity", "Research", "Content support", "Workflow automation", "Client services", "Digital work"],
    status: "In Development",
    coverColor: "#3df0ff",
    coverImage: "https://cdn.phototourl.com/free/2026-07-20-b2bb80a8-51e3-4ae6-a589-58947759ffa8.jpg",
    featured: true,
  },
  {
    id: "ai-freelancers",
    title: "AI for Freelancers",
    subtitle: "A Grounded Guide to Practical AI in Your Freelance Work",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "AI & Tech",
    subcategory: "AI Guides",
    description: "A grounded, practical guide for freelancers looking to integrate AI tools into their workflow — without the hype, without the fluff.",
    summary: "Freelancers are constantly balancing client work, communication, marketing, research, administration, and the actual delivery of their services.\n\nAI for Freelancers explores how modern AI tools can support freelancers across these different areas.\n\nThe book focuses on practical applications such as research, writing, brainstorming, client communication, proposals, task organization, content creation, and workflow improvement.\n\nIt presents AI as a tool that can help freelancers reduce repetitive work, improve their processes, and spend more time focusing on valuable creative and professional work.",
    themes: ["Freelancing", "AI tools", "Productivity", "Client work", "Research", "Writing", "Automation", "Business workflows"],
    status: "Researching",
    coverColor: "#4d8bff",
    coverImage: "https://cdn.phototourl.com/free/2026-07-20-28987222-0532-4b14-8b9b-3519d09ec73c.jpg",
  },
  {
    id: "the-trust-factor",
    title: "The Trust Factor: Rebuilding Love After Betrayal",
    subtitle: "Building, Breaking, and Restoring Trust in Relationships",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "Relationships",
    subcategory: "Relationship Dynamics",
    description: "An exploration of what trust really means in relationships — how it's built, how it's broken, and how it's restored.",
    summary: "Betrayal can change the way people experience love, trust, vulnerability, and emotional safety.\n\nThe Trust Factor: Rebuilding Love After Betrayal explores the difficult and often complicated process of rebuilding trust after a relationship has been damaged by betrayal.\n\nThe book examines communication, accountability, emotional honesty, forgiveness, boundaries, and the difficult question of whether trust can truly be rebuilt.\n\nIt also recognizes that rebuilding a relationship is not always the right choice for everyone.\n\nAt its heart, the book explores what it takes to create emotional safety again — whether that means rebuilding the relationship or finding the strength to move forward.",
    themes: ["Betrayal", "Trust", "Relationships", "Communication", "Accountability", "Forgiveness", "Emotional safety", "Boundaries"],
    status: "Concept",
    coverColor: "#ffb13d",
    coverImage: "https://cdn.phototourl.com/free/2026-07-20-9ccbd65a-6d96-4825-8396-1f13f69c2dfb.jpg",
  },
  {
    id: "dark-psychology",
    title: "Dark Psychology and Emotional Control",
    subtitle: "Understanding Manipulation and Protecting Your Mind",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "Psychology",
    subcategory: "Self-Awareness",
    description: "An examination of psychological manipulation tactics, emotional influence, and the awareness needed to recognize and respond to them.",
    summary: "People are influenced by the words, behaviors, emotions, and psychological tactics of others every day.\n\nDark Psychology and Emotional Control explores the darker side of psychological influence, manipulation, persuasion, and emotional control.\n\nThe purpose of the book is not to teach readers how to exploit other people.\n\nInstead, it focuses on awareness.\n\nThe book explores how people may recognize unhealthy manipulation, understand psychological influence, identify emotional control, become more aware of harmful patterns, and protect their emotional independence.\n\nUnderstanding these dynamics can help people make more informed decisions about the relationships and situations they find themselves in.",
    themes: ["Psychological influence", "Emotional manipulation", "Persuasion", "Emotional control", "Self-awareness", "Boundaries", "Psychological protection", "Emotional independence"],
    status: "Researching",
    coverColor: "#ff4dcb",
    coverImage: "https://cdn.phototourl.com/free/2026-07-20-5080ebbf-88bc-43ba-9a6d-7e3cfdfca445.jpg",
  },
  {
    id: "boundary-mastery",
    title: "Boundary Mastery: How to Protect Your Heart Without Closing It",
    subtitle: "The Art of Setting and Keeping Healthy Boundaries",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "Personal Development",
    subcategory: "Self-Improvement",
    description: "A practical guide to understanding, setting, and maintaining healthy boundaries in relationships, work, and daily life.",
    summary: "Protecting yourself does not mean becoming cold.\n\nSetting boundaries does not mean pushing everyone away.\n\nBoundary Mastery: How to Protect Your Heart Without Closing It explores how people can develop healthier boundaries while remaining open to connection, love, trust, and meaningful relationships.\n\nThe book explores the difference between healthy self-protection and emotional isolation.\n\nIt examines how to say no, communicate personal limits, protect emotional energy, recognize unhealthy relationship patterns, and maintain self-respect without completely closing yourself off from others.\n\nThe central idea is simple: You can protect your heart without building a wall around it.",
    themes: ["Emotional boundaries", "Self-respect", "Communication", "Relationships", "Emotional protection", "Vulnerability", "Trust", "Personal growth"],
    status: "Concept",
    coverColor: "#a974ff",
    coverImage: "https://cdn.phototourl.com/free/2026-07-20-244c6ae9-3f0d-48cf-a58f-d2b880c044fb.jpg",
  },
  {
    id: "male-female-dynamic",
    title: "Female Mind / Male Mind Dynamic",
    subtitle: "Understanding Communication, Emotion, and Connection",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "Relationships",
    subcategory: "Gender Dynamics",
    description: "A thoughtful exploration of communication styles, emotional needs, and relationship dynamics between men and women.",
    summary: "Relationships are often affected by differences in communication, expectations, emotional expression, personality, experience, and cultural conditioning.\n\nFemale Mind / Male Mind Dynamic explores common patterns that can influence how men and women may communicate, process emotions, understand relationships, and respond to conflict.\n\nThe book should not present men and women as rigidly identical or completely different.\n\nInstead, it should encourage readers to explore relationship dynamics with nuance and curiosity.\n\nIndividual personality, life experience, culture, and personal values all play an important role in how people think and behave.\n\nThe goal is not to create stereotypes.\n\nThe goal is to encourage better understanding, communication, and awareness between people.",
    themes: ["Communication", "Relationships", "Emotional expression", "Expectations", "Conflict", "Gender dynamics", "Personality", "Human behavior"],
    status: "Concept",
    coverColor: "#ff5d6c",
    coverImage: "https://cdn.phototourl.com/free/2026-07-20-a3461d4f-8a59-4871-a1c6-13c506783cf4.jpg",
  },
  {
    id: "shadows-of-tomorrow",
    title: "Shadows of Tomorrow",
    subtitle: "A Novel About Choice, Consequence, and the Paths Not Taken",
    author: "Joseph Unaogu",
    genre: "fiction",
    category: "Literary Fiction",
    subcategory: "Speculative Science Fiction",
    description: "A literary fiction concept exploring choice, consequence, and the paths not taken.",
    summary: "The Shadows of Tomorrow is a speculative psychological science-fiction story about the uncertainty of the future and the hidden consequences of the choices people make today.\n\nSet against a world increasingly shaped by technology, surveillance, artificial intelligence, and rapidly changing societies, the story explores what happens when humanity begins to encounter possibilities of the future that were never meant to be seen.\n\nAs the boundary between prediction and reality begins to disappear, the characters are forced to confront difficult questions about identity, memory, free will, and the nature of destiny. Is the future something that can truly be changed, or are people simply moving toward events that have already been set in motion?\n\nThe story explores the psychological weight of knowing what may come next and the danger of allowing fear of the future to control the present. As hidden truths begin to surface, the shadows of tomorrow become more than distant possibilities — they become reflections of the choices, fears, and secrets people have carried with them all along.\n\nThe Shadows of Tomorrow is a story about technology, uncertainty, human nature, and the consequences of looking too far into the future. It combines mystery, psychological tension, speculative science fiction, and emotional storytelling into a journey through the possibilities of what humanity may become.",
    themes: ["choice", "consequence", "memory", "identity", "technology", "surveillance", "artificial intelligence", "free will", "human nature", "uncertainty"],
    status: "Concept",
    coverColor: "#a974ff",
    coverImage: "https://cdn.phototourl.com/free/2026-07-20-88da20e4-a052-42bd-bf58-96f106089675.jpg",
  },
  {
    id: "the-last-archive",
    title: "The Last Archive",
    subtitle: "When Memory Becomes Currency — A Speculative Tale",
    author: "Joseph Unaogu",
    genre: "fiction",
    category: "Speculative Fiction",
    subcategory: "Science-Fiction Mystery",
    description: "A speculative fiction concept set in a world where memory is currency.",
    summary: "The Last Archives is a science-fiction mystery about the final surviving repository of humanity's knowledge after the world as it was once known has disappeared.\n\nIn a future shaped by technological advancement, conflict, environmental change, and the collapse of systems that once connected civilization, the remains of humanity's history are scattered, corrupted, or forgotten.\n\nSomewhere beyond the ruins of the old world lies the Last Archive — a mysterious repository believed to contain the final complete record of human civilization. Within its vast chambers are records of forgotten discoveries, lost cultures, abandoned technologies, hidden conflicts, and truths that powerful forces may have spent generations trying to erase.\n\nWhen the archive is finally discovered, the search for knowledge becomes something far more dangerous. The records do not simply explain the past. They reveal secrets about how the present world came to exist and raise unsettling questions about what may happen next.\n\nAs the truth begins to emerge, the characters must decide whether every truth deserves to be recovered, whether knowledge can truly save humanity, and whether some parts of history were deliberately forgotten for a reason.\n\nThe Last Archives explores the relationship between memory and power, the preservation of knowledge, the fragility of civilization, and humanity's desire to understand where it came from.\n\nIt is a story about forgotten history, lost knowledge, discovery, secrets, and the final question that remains when almost everything else has been lost:\n\nWhat will humanity choose to remember?",
    themes: ["memory", "identity", "dystopia", "humanity", "technology", "lost knowledge", "discovery", "secrets", "civilization", "power"],
    status: "Idea",
    coverColor: "#4d8bff",
    coverImage: "https://cdn.phototourl.com/free/2026-07-20-d4aba4f2-93c8-45f4-8a5d-53f710f069f5.jpg",
  },
  {
    id: "copywriting-portfolio",
    title: "Copywriting Portfolio",
    subtitle: "Web Copy, Product Descriptions, and Marketing Content",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "Copywriting",
    subcategory: "Professional Writing",
    description: "Samples and case studies from professional copywriting work — website copy, product descriptions, email campaigns, and marketing content.",
    summary: "Copywriter Portfolio is a curated collection of writing, messaging, and creative communication work designed to demonstrate the power of words in digital spaces.\n\nThe portfolio explores how strong copy can transform ideas into clear messages, turn attention into interest, and help brands communicate with the people they want to reach.\n\nIt showcases different approaches to writing, including website copy, landing page messaging, brand communication, product descriptions, service descriptions, marketing content, social media copy, and other forms of digital communication.\n\nAt its core, the portfolio reflects an approach to copywriting built around clarity, psychology, creativity, and purpose. Every piece of copy should do more than simply fill a page. It should communicate an idea, create interest, build trust, guide attention, and encourage the reader to take the next step.\n\nCopywriter Portfolio represents Joseph Unaogu's ability to take complex ideas and turn them into clear, engaging, and purposeful communication.\n\nIt is a collection of words written to inform, persuade, connect, and move people.",
    themes: ["copywriting", "marketing", "brand voice", "digital content", "clarity", "psychology", "creativity", "communication"],
    status: "In Development",
    coverColor: "#3df0ff",
    coverImage: "https://cdn.phototourl.com/member/2026-07-20-bb53c054-fd9b-4237-9280-0062fe345c87.jpg",
  },
];

export const nowFocus = [
  "Building small AI-powered web projects and shipping them publicly.",
  "Improving my full-stack development with Next.js and TypeScript.",
  "Exploring automation with Make.com and n8n for real workflows.",
  "Creating written content — eBooks, articles, and sharper copy.",
  "Preparing YouTube content around AI tools and practical building.",
];

export const ideaToBuild = [
  { step: "01", title: "IDEA", body: "I start with a problem, opportunity, or idea." },
  { step: "02", title: "EXPLORE", body: "I research the concept and explore possible tools." },
  { step: "03", title: "BUILD", body: "I turn the idea into a functional digital experience." },
  { step: "04", title: "LEARN", body: "I test, troubleshoot, improve, and learn from the process." },
  { step: "05", title: "REFINE", body: "I continue improving the product and the skills behind it." },
];

export const activityLog = [
  { year: "2026", items: ["New project added", "Portfolio updated", "AI application experiment started", "New website completed", "Writing project in progress"] },
];

export const contactProjectTypes = ["eBook Writing", "Copywriting", "Website", "AI Application", "Automation", "Digital Product", "Other"];

export const faqAssistant = [
  { q: "What does Joseph do?", a: "Joseph is a digital builder focused on software, AI, automation, writing, and creative technology. He learns by building real things and turns ideas into useful digital experiences." },
  { q: "What kind of projects has Joseph built?", a: "Independently developed digital products like Velvet & Fade, Northgate Properties, Ember & Spice, Adura Glow Oil, SupportIQ, ScrollTek, and an admin dashboard — plus AI and automation experiments." },
  { q: "What technologies does he use?", a: "JavaScript, TypeScript, React, Next.js, Python, and tools like Make.com, n8n, and various AI APIs. He's at an intermediate, practical level and learning continuously." },
  { q: "What services does Joseph offer?", a: "eBook writing & creation, copywriting, AI & automation solutions, and website development. His strongest, most confident services are writing and copywriting." },
  { q: "Can Joseph help with an eBook?", a: "Yes — eBook writing and creation is one of his strongest professional areas, including structure, chapter development, research-based content, and KDP-ready formatting." },
  { q: "Can Joseph build an AI-powered website?", a: "He can build modern, AI-powered web apps at a practical level using Next.js and AI APIs, and is actively developing this capability through real projects." },
];