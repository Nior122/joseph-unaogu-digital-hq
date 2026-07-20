export const site = {
  name: "Joseph Unaogu",
  role: "Digital Builder",
  email: "chinecheremjoseph39@gmail.com",
  location: "Remote · Working worldwide",
  tagline: "A digital builder in motion — exploring the intersection of technology, AI, automation, writing, and creativity.",
  brand: "BUILD. EXPLORE. CREATE.",
  resumeUrl: "#",
  socials: [
    { label: "GitHub", href: "https://github.com/", handle: "@josephunaogu" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/joseph-unaogu-72b2ba245/", handle: "in/joseph-unaogu" },
    { label: "YouTube", href: "https://youtube.com/", handle: "Coming soon" },
    { label: "X / Twitter", href: "https://x.com/Bigcherem", handle: "@Bigcherem" },
    { label: "Fiverr", href: "https://fiverr.com/", handle: "Coming soon" },
    { label: "Contra", href: "https://contra.com/", handle: "Coming soon" },
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
  { id: "creative", label: "CREATIVE" },
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

export type Service = { id: string; title: string; accent: string; summary: string; highlights: string[]; cta: string };
export const services: Service[] = [
  { id: "ebooks", title: "eBook Writing & Creation", accent: "#ff4dcb", summary: "Turn ideas into structured, engaging, professionally written eBooks — ready for publishing.", highlights: ["Complete eBook writing", "Structure & chapter development", "Research-based nonfiction", "Editing & KDP-ready formatting"], cta: "Start an eBook project" },
  { id: "copywriting", title: "Copywriting", accent: "#ff4dcb", summary: "Compelling copy for websites, landing pages, products, and campaigns that actually communicate.", highlights: ["Website & landing copy", "Sales & product descriptions", "Marketing & social copy", "Conversion-focused writing"], cta: "Get copy that converts" },
  { id: "ai-automation", title: "AI & Automation Solutions", accent: "#a974ff", summary: "Practical AI-powered workflows and automation for repetitive digital tasks — a growing area I build in.", highlights: ["AI workflow design", "Make.com & n8n workflows", "API integrations", "Content & chatbot automation"], cta: "Explore an automation" },
  { id: "web", title: "Website Development", accent: "#3df0ff", summary: "Modern, responsive websites and interfaces — from personal sites to AI-powered web apps.", highlights: ["Business & portfolio sites", "Landing pages", "SaaS-style interfaces", "AI-powered web apps"], cta: "Build a website" },
];

export type Writing = { id: string; title: string; category: string; description: string; status: string; link?: string };
export const writing: Writing[] = [
  { id: "ebook-systems", title: "The Practical Builder's Field Notes", category: "eBook · Nonfiction", description: "A nonfiction eBook about learning technology by building small, real things instead of waiting to feel ready.", status: "In Development", link: "#" },
  { id: "ai-automation-guide", title: "AI Automation, Without the Hype", category: "eBook · Guide", description: "A grounded guide to setting up useful automations with AI — written for non-technical creators.", status: "Planning", link: "#" },
  { id: "article-ai-tools", title: "How I Use AI Tools to Ship Faster", category: "Article · Technology", description: "A practical look at the AI coding and writing tools I use weekly, and where they genuinely help.", status: "Draft", link: "#" },
  { id: "article-copy", title: "Writing Copy That Sounds Like a Human", category: "Article · Copywriting", description: "Notes on clarity, voice, and persuasion for founders writing their own marketing.", status: "Draft", link: "#" },
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