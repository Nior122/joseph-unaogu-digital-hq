import previewManifest from "./preview-manifest.json";

// The single runtime source for site facts, projects, services and writing.
// Unconfirmed business facts are registered at the end, never presented as promises.

export const site = {
  name: "Joseph Unaogu",
  role: "Web developer, automation builder, and writer",
  email: "chinecheremjoseph39@gmail.com",
  location: "Nigeria · Working remotely worldwide",
  tagline: "Websites, automation, and writing for your business.",
  brand: "Chenar",
  resumeUrl: "/resume",
  socials: [
    {
      label: "WhatsApp",
      href: "https://wa.me/2347046118938",
      handle: "+234 704 611 8938",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/joseph-unaogu-72b2ba245/",
      handle: "in/joseph-unaogu",
    },
    {
      label: "X / Twitter",
      href: "https://x.com/Bigcherem",
      handle: "@Bigcherem",
    },
  ],
  whatsapp: "https://wa.me/2347046118938",
  whatsappLabel: "+234 704 611 8938",
  linkedin: "https://www.linkedin.com/in/joseph-unaogu-72b2ba245/",
  x: "https://x.com/Bigcherem",
};

export const navigation = [
  {
    href: "/work",
    label: "Work",
  },
  {
    href: "/services",
    label: "Services",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/writing",
    label: "Writing",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export const heroParagraph =
  "I'm Joseph Unaogu, founder of Chenar. I build simple websites, set up tools that save you time, and write eBooks and marketing copy. Tell me what you need and I'll tell you how I'd do it.";

export const homeCopy = {
  headline: "Websites, automation, and books for your business.",
  about:
    "I studied Computer Science, and my strongest areas are writing and content. I also build websites and tools that do repeat tasks for you, and I keep learning. I'll tell you plainly what I can do and what I can't.",
  location: "Based in Nigeria. Working with clients worldwide.",
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

export type ExploreStatus =
  "building" | "exploring" | "learning" | "experimenting";
export const currentlyExploring: { label: string; status: ExploreStatus }[] = [
  {
    label: "AI Applications",
    status: "building",
  },
  {
    label: "Automation Systems",
    status: "experimenting",
  },
  {
    label: "Next.js",
    status: "building",
  },
  {
    label: "AI Content Workflows",
    status: "exploring",
  },
  {
    label: "YouTube & Content",
    status: "exploring",
  },
  {
    label: "eBook Publishing",
    status: "building",
  },
  {
    label: "Copywriting",
    status: "learning",
  },
  {
    label: "Full-stack Web Dev",
    status: "building",
  },
  {
    label: "Local AI Experiments",
    status: "exploring",
  },
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
  "SOFTWARE DEVELOPMENT",
  "AI",
  "AUTOMATION",
  "WEB DEVELOPMENT",
  "eBOOKS",
  "COPYWRITING",
  "CONTENT",
  "YOUTUBE",
  "CREATIVE TECHNOLOGY",
  "DIGITAL PRODUCTS",
  "WRITING",
  "DESIGN",
  "SAAS",
  "DASHBOARDS",
  "AUTOMATION WORKFLOWS",
];

export const aboutParagraphs = [
  "I'm Joseph Unaogu, the founder of Chenar. I studied Computer Science, and I work in three areas: websites, automation, and writing.",
  "I learn by building real things. I try a tool, make something with it, and fix what breaks. That's how I built the projects you see on this site.",
  "My strongest area is writing and content. I'm also growing in web development and automation, and I use those skills in client-style work and in my own products. I'll always tell you honestly what I can do.",
];

export type TimelinePhase = { id: string; title: string; body: string };
export const journey: TimelinePhase[] = [
  {
    id: "foundation",
    title: "Foundation",
    body: "Studied Computer Science and developed a strong interest in technology and digital systems.",
  },
  {
    id: "exploration",
    title: "Exploration",
    body: "Started exploring software development, websites, AI tools, automation, content creation, and digital products.",
  },
  {
    id: "building",
    title: "Building",
    body: "Began turning ideas into actual projects, applications, websites, automations, and content systems.",
  },
  {
    id: "creating",
    title: "Creating",
    body: "Developed a deeper interest in eBook writing, copywriting, YouTube, digital content, and creative technology.",
  },
  {
    id: "now",
    title: "Now",
    body: "Continuing to learn, build, experiment, and develop stronger professional skills.",
  },
];

export type SkillLevel =
  | "Professional"
  | "Intermediate / Practical"
  | "AI / Practical"
  | "Automation / Practical"
  | "Creative / Exploring";
export type SkillCategory =
  "software" | "ai" | "automation" | "writing" | "creative";

export type SkillNode = {
  id: string;
  label: string;
  short: string;
  category: SkillCategory;
  level: SkillLevel;
  accent: string;
  blurb: string;
};

export const skillNodes: SkillNode[] = [
  // writing (professional)
  {
    id: "ebook",
    short: "eBook",
    label: "eBook Writing",
    category: "writing",
    level: "Professional",
    accent: "var(--skill-writing)",
    blurb:
      "Structuring long-form, reader-focused books from idea to finished draft.",
  },
  {
    id: "copy",
    short: "Copy",
    label: "Copywriting",
    category: "writing",
    level: "Professional",
    accent: "var(--skill-writing)",
    blurb:
      "Website, sales, product, and conversion-focused copy that communicates.",
  },
  {
    id: "content",
    short: "Content",
    label: "Content Writing",
    category: "writing",
    level: "Professional",
    accent: "var(--skill-writing)",
    blurb: "Articles, educational and technology content, digital publishing.",
  },
  // software
  {
    id: "html",
    short: "HTML",
    label: "HTML/CSS",
    category: "software",
    level: "Intermediate / Practical",
    accent: "var(--skill-software)",
    blurb: "Semantic, responsive markup and modern styling.",
  },
  {
    id: "js",
    short: "JS",
    label: "JavaScript",
    category: "software",
    level: "Intermediate / Practical",
    accent: "var(--skill-software)",
    blurb: "Hands-on JS for interactive web experiences.",
  },
  {
    id: "ts",
    short: "TS",
    label: "TypeScript",
    category: "software",
    level: "Intermediate / Practical",
    accent: "var(--skill-software)",
    blurb: "Typed development for more reliable apps.",
  },
  {
    id: "react",
    short: "React",
    label: "React",
    category: "software",
    level: "Intermediate / Practical",
    accent: "var(--skill-software)",
    blurb: "Component-based UI development.",
  },
  {
    id: "next",
    short: "Next",
    label: "Next.js",
    category: "software",
    level: "Intermediate / Practical",
    accent: "var(--skill-software)",
    blurb: "Full-stack React framework for real products.",
  },
  {
    id: "python",
    short: "Python",
    label: "Python",
    category: "software",
    level: "Intermediate / Practical",
    accent: "var(--skill-software)",
    blurb: "Scripting, automation, and backend experimentation.",
  },
  {
    id: "api",
    short: "API",
    label: "API Integration",
    category: "software",
    level: "Intermediate / Practical",
    accent: "var(--skill-software)",
    blurb: "Connecting services and data sources.",
  },
  {
    id: "db",
    short: "DB",
    label: "Database Concepts",
    category: "software",
    level: "Intermediate / Practical",
    accent: "var(--skill-software)",
    blurb: "PostgreSQL, Prisma, data modeling fundamentals.",
  },
  {
    id: "auth",
    short: "Auth",
    label: "Auth Systems",
    category: "software",
    level: "Intermediate / Practical",
    accent: "var(--skill-software)",
    blurb: "Authentication and user sessions.",
  },
  {
    id: "git",
    short: "Git",
    label: "Git / GitHub",
    category: "software",
    level: "Intermediate / Practical",
    accent: "var(--skill-software)",
    blurb: "Version control and collaboration.",
  },
  // ai
  {
    id: "aiapp",
    short: "AI Apps",
    label: "AI Applications",
    category: "ai",
    level: "AI / Practical",
    accent: "var(--skill-ai)",
    blurb: "Building AI-powered products and assistants.",
  },
  {
    id: "llm",
    short: "LLM",
    label: "LLM Integrations",
    category: "ai",
    level: "AI / Practical",
    accent: "var(--skill-ai)",
    blurb: "Wiring large language models into real workflows.",
  },
  {
    id: "chatbot",
    short: "Chatbot",
    label: "AI Chatbots",
    category: "ai",
    level: "AI / Practical",
    accent: "var(--skill-ai)",
    blurb: "Conversational assistants and support bots.",
  },
  {
    id: "prompt",
    short: "Prompt",
    label: "Prompt Engineering",
    category: "ai",
    level: "AI / Practical",
    accent: "var(--skill-ai)",
    blurb: "Designing effective prompts and templates.",
  },
  {
    id: "img",
    short: "AI Img",
    label: "AI Image Gen",
    category: "ai",
    level: "AI / Practical",
    accent: "var(--skill-ai)",
    blurb: "Image generation and visual experiments.",
  },
  {
    id: "aiauto",
    short: "AI Auto",
    label: "AI Automation",
    category: "ai",
    level: "AI / Practical",
    accent: "var(--skill-ai)",
    blurb: "Using AI to automate repetitive work.",
  },
  // automation
  {
    id: "make",
    short: "Make",
    label: "Make.com",
    category: "automation",
    level: "Automation / Practical",
    accent: "var(--skill-automation)",
    blurb: "Visual automation workflows.",
  },
  {
    id: "n8n",
    short: "n8n",
    label: "n8n",
    category: "automation",
    level: "Automation / Practical",
    accent: "var(--skill-automation)",
    blurb: "Self-hostable workflow automation.",
  },
  {
    id: "sheets",
    short: "Sheets",
    label: "Google Sheets Auto",
    category: "automation",
    level: "Automation / Practical",
    accent: "var(--skill-automation)",
    blurb: "Spreadsheet-driven automation.",
  },
  {
    id: "pub",
    short: "Publish",
    label: "Automated Publishing",
    category: "automation",
    level: "Automation / Practical",
    accent: "var(--skill-automation)",
    blurb: "Scheduled content publishing systems.",
  },
  // creative
  {
    id: "video",
    short: "Video",
    label: "Video Editing",
    category: "creative",
    level: "Creative / Exploring",
    accent: "var(--skill-creative)",
    blurb: "Editing and short-form video.",
  },
  {
    id: "anim",
    short: "Anim",
    label: "Animation",
    category: "creative",
    level: "Creative / Exploring",
    accent: "var(--skill-creative)",
    blurb: "Motion and visual storytelling.",
  },
  {
    id: "yt",
    short: "YouTube",
    label: "YouTube Content",
    category: "creative",
    level: "Creative / Exploring",
    accent: "var(--skill-creative)",
    blurb: "Planning educational and useful content.",
  },
  {
    id: "visual",
    short: "Visual",
    label: "Visual Storytelling",
    category: "creative",
    level: "Creative / Exploring",
    accent: "var(--skill-creative)",
    blurb: "Communicating ideas visually.",
  },
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
  "Available for Customization" | "Private Preview" | "Concept";
export type ProjectStatus = "available" | "concept" | "private-preview";
export type ProjectType =
  "website" | "ai-automation" | "web-app" | "3d-experience" | "dashboard";
export type ProjectHealth =
  "ONLINE" | "OFFLINE" | "AUTH_REQUIRED" | "ERROR" | "UNKNOWN";
export type Project = {
  slug: string;
  name: string;
  type: ProjectType;
  status: ProjectStatus;
  statusLabel: string;
  oneLiner: string;
  whatItIs: string;
  whoItsFor: string;
  whatsInside: string[];
  stack?: string[];
  liveUrl?: string;
  /** An empty src means no local screenshot exists. Render the labeled fallback. */
  image: { src: string; alt: string; fallbackSrc?: string };
  // Original case-study notes remain available from the same record.
  id: string;
  url: string;
  description: string;
  category: string;
  accent: string;
  availability: ProjectAvailability;
  featured?: boolean;
  tech: string[];
  role: string;
  problem: string;
  approach: string;
  lessons: string;
  health: ProjectHealth;
  lastChecked: string;
  lastPreview?: string;
  previewImage?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "human-brain",
    name: "3D Human Brain Explorer",
    type: "3d-experience",
    status: "concept",
    statusLabel: "Concept",
    oneLiner: "An interactive 3D brain model with labelled regions.",
    whatItIs:
      "An educational model of the human brain with detailed region information. You can rotate the model and explore its labelled regions.",
    whoItsFor: "Students and teachers.",
    whatsInside: [
      "Rotatable 3D model",
      "Region labels",
      "Detailed region information",
    ],
    stack: ["WebGL", "Three.js", "React Three Fiber", "Next.js"],
    liveUrl: "https://3d-human-brain-explorer.vercel.app/",
    image: {
      src: "/projects/human-brain.png",
      alt: "Screenshot of the 3D Human Brain Explorer interactive learning experience",
    },
    id: "human-brain",
    url: "https://3d-human-brain-explorer.vercel.app/",
    description:
      "An interactive, educational 3D model of the human brain with detailed region analysis and labels.",
    category: "Experiments",
    accent: "var(--accent)",
    availability: "Concept",
    featured: true,
    tech: ["WebGL", "Three.js", "React Three Fiber", "Next.js"],
    role: "Creative Developer",
    problem:
      "Providing a detailed, intuitive, and interactive educational tool for exploring complex neuroanatomy.",
    approach:
      "Built a fully interactive WebGL model with clickable regions, an informational HUD, and smooth camera transitions.",
    lessons:
      "Balancing high-poly model rendering with smooth interactive performance is key for educational 3D tools.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
    previewImage: "/projects/human-brain.png",
  },
  {
    slug: "solar-system",
    name: "Solar System Explorer",
    type: "3d-experience",
    status: "concept",
    statusLabel: "Concept",
    oneLiner: "An interactive 3D model of the solar system.",
    whatItIs:
      "A simulation that shows planet orbits, sizes, and how they move. You can explore planet orbits and scale views.",
    whoItsFor: "Students, teachers, and curious visitors.",
    whatsInside: ["Planet orbits", "Scale views", "Planet movement"],
    stack: ["WebGL", "Three.js", "React Three Fiber"],
    liveUrl: "https://solar-system-explorer-silk.vercel.app/",
    image: {
      src: "/projects/solar-system.png",
      alt: "Screenshot of the Solar System Explorer interactive learning experience",
    },
    id: "solar-system",
    url: "https://solar-system-explorer-silk.vercel.app/",
    description:
      "An interactive 3D solar system simulation visualizing planetary orbits, scales, and celestial mechanics.",
    category: "Experiments",
    accent: "var(--accent)",
    availability: "Concept",
    featured: true,
    tech: ["WebGL", "Three.js", "React Three Fiber"],
    role: "Creative Developer",
    problem:
      "Visualizing the vast scale and mechanics of our solar system in an interactive browser experience.",
    approach:
      "Developed a 3D simulation with accurate orbital speeds, interactive camera controls, and dynamic lighting from the sun.",
    lessons:
      "Managing scene complexity and lighting in 3D space requires careful balancing between visual fidelity and performance.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
    previewImage: "/projects/solar-system.png",
  },
  {
    slug: "deep-ocean",
    name: "Deep Ocean Observatory",
    type: "3d-experience",
    status: "concept",
    statusLabel: "Concept",
    oneLiner: "An interactive 3D trip into the deep ocean.",
    whatItIs:
      "An experience that explores ocean depths and marine life. It brings depth exploration and marine life into a browser experience.",
    whoItsFor: "Students and anyone curious about the ocean.",
    whatsInside: ["Depth exploration", "Marine life", "Interactive 3D views"],
    stack: ["WebGL", "React Three Fiber", "Next.js", "Tailwind"],
    liveUrl: "https://deep-ocean-observatory.vercel.app/",
    image: {
      src: "",
      alt: "",
    },
    id: "deep-ocean",
    url: "https://deep-ocean-observatory.vercel.app/",
    description:
      "An immersive 3D interactive experience exploring the depths of the ocean and marine life.",
    category: "Experiments",
    accent: "var(--accent)",
    availability: "Concept",
    featured: true,
    tech: ["WebGL", "React Three Fiber", "Next.js", "Tailwind"],
    role: "Creative Developer",
    problem:
      "Conveying the scale, mystery, and data of the deep ocean in an engaging educational format.",
    approach:
      "Built a fully interactive 3D WebGL simulation with dynamic depth mapping, lighting, and an atmospheric HUD.",
    lessons:
      "Performance optimization and state management in browser-based 3D requires careful management of draw calls.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
  },
  {
    slug: "drape",
    name: "Drape",
    type: "website",
    status: "available",
    statusLabel: "Available for customization",
    oneLiner: "A marketplace that connects clients with tailors and designers.",
    whatItIs:
      "A marketplace for fully custom-made clothing and accessories. It connects clients with tailors and designers.",
    whoItsFor:
      "Clients who want custom fashion, and tailors who want customers.",
    whatsInside: [
      "Tailor and designer listings",
      "Custom-made clothing",
      "Custom-made accessories",
    ],
    stack: ["Next.js", "React", "Marketplace UI", "E-commerce"],
    liveUrl: "https://drape-fzs.pages.dev/",
    image: {
      src: "",
      alt: "",
    },
    id: "drape",
    url: "https://drape-fzs.pages.dev/",
    description:
      "A bespoke fashion marketplace connecting discerning clients with talented tailors and designers for fully custom-made clothing and accessories.",
    category: "E-commerce",
    accent: "var(--accent)",
    availability: "Available for Customization",
    featured: true,
    tech: ["Next.js", "React", "Marketplace UI", "E-commerce"],
    role: "Designer & Developer",
    problem:
      "Finding reliable tailors and designers for custom clothing is difficult, and the commission process is often disorganized.",
    approach:
      "Designed a premium marketplace experience to streamline discovery, communication, and commissions between clients and fashion creators.",
    lessons:
      "In premium e-commerce, the visual interface and trust signals are just as important as the functional transaction flow.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
  },
  {
    slug: "eduflow",
    name: "EduFlow",
    type: "ai-automation",
    status: "available",
    statusLabel: "Available for customization",
    oneLiner: "A school management system with AI help.",
    whatItIs:
      "An AI-powered system that digitizes school tasks, from attendance to report comments and lesson plans. It brings routine school tasks into one place.",
    whoItsFor: "Schools and teachers.",
    whatsInside: ["Attendance", "AI-written report comments", "Lesson plans"],
    stack: ["Next.js", "React", "AI Integrations", "Role-Based Auth"],
    liveUrl: "https://eduflow-five-psi.vercel.app/",
    image: {
      src: "",
      alt: "",
    },
    id: "eduflow",
    url: "https://eduflow-five-psi.vercel.app/",
    description:
      "An AI-powered school operating system that digitizes everything from attendance to AI-generated report comments and lesson plans.",
    category: "SAAS",
    accent: "var(--accent)",
    availability: "Available for Customization",
    featured: true,
    tech: ["Next.js", "React", "AI Integrations", "Role-Based Auth"],
    role: "Builder & Developer",
    problem:
      "School administration involves tedious manual tasks like report writing, attendance tracking, and lesson planning that take time away from students.",
    approach:
      "Built a comprehensive dashboard platform featuring student management, role-based access, and AI tools for generating educational content.",
    lessons:
      "Automating routine administrative tasks with AI can save hundreds of hours, making educational software highly impactful.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
  },
  {
    slug: "hireflows",
    name: "HireFlow",
    type: "ai-automation",
    status: "available",
    statusLabel: "Available for customization",
    oneLiner: "A job tracker and hiring tool with AI help.",
    whatItIs:
      "A platform for tracking applications, improving resumes, and managing hiring steps. It supports both job seekers and recruiters.",
    whoItsFor: "Job seekers and recruiters.",
    whatsInside: [
      "Application tracking",
      "Resume improvement",
      "Hiring pipeline",
    ],
    stack: ["Next.js", "Clerk", "Prisma", "Groq AI", "shadcn/ui"],
    liveUrl: "https://hireflows.vercel.app/",
    image: {
      src: "",
      alt: "",
    },
    id: "hireflows",
    url: "https://hireflows.vercel.app/",
    description:
      "An AI-powered job tracker and recruitment platform for tracking applications, optimizing resumes, and managing hiring pipelines.",
    category: "SAAS",
    accent: "var(--accent)",
    availability: "Available for Customization",
    featured: true,
    tech: ["Next.js", "Clerk", "Prisma", "Groq AI", "shadcn/ui"],
    role: "Builder & Developer",
    problem:
      "Managing the recruitment process and tracking job applications is often manual and tedious for both job seekers and employers.",
    approach:
      "Built a comprehensive platform featuring an AI-powered Kanban board for application tracking and smart candidate pipelines.",
    lessons:
      "Integrating AI directly into workflows (like email scanning and reply drafting) delivers the most immediate value to users.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
  },
  {
    slug: "velvet-fade",
    name: "Velvet & Fade",
    type: "website",
    status: "available",
    statusLabel: "Available for customization",
    oneLiner: "A website for a modern salon and beauty business.",
    whatItIs:
      "A site that presents the salon's services, atmosphere, and brand, and helps visitors become customers. Visitors can explore services and find a way to book or get in touch.",
    whoItsFor: "Salons, barbers, and beauty businesses.",
    whatsInside: [
      "Services",
      "Brand and atmosphere",
      "Customer contact and booking path",
    ],
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    liveUrl: "https://velvet-and-fade-salon.vercel.app/",
    image: {
      src: "/projects/velvet-fade.webp",
      alt: "Screenshot of the Velvet & Fade website",
    },
    id: "velvet-fade",
    url: "https://velvet-and-fade-salon.vercel.app/",
    description:
      "A premium digital experience for a modern salon and beauty business — presenting services, atmosphere, brand identity, and customer conversion through an elegant web experience.",
    category: "Websites",
    accent: "var(--accent)",
    availability: "Available for Customization",
    featured: true,
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    role: "Designer & Developer",
    problem:
      "A salon needed an online presence that felt as polished as its in-person experience.",
    approach:
      "I built an elegant, brand-led site focused on atmosphere, services, and conversion.",
    lessons:
      "Strong visual hierarchy and restraint communicate premium far better than decoration.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
    previewImage: "/projects/velvet-fade.webp",
  },
  {
    slug: "northgate",
    name: "Northgate Properties",
    type: "website",
    status: "available",
    statusLabel: "Available for customization",
    oneLiner: "A property website for showing listings to buyers.",
    whatItIs:
      "A polished browsing experience for real estate listings. It gives buyers a clear way to browse properties.",
    whoItsFor: "Estate agents and property companies.",
    whatsInside: [
      "Property listings",
      "Easy browsing for buyers and clients",
      "Real estate presentation",
    ],
    stack: ["Next.js", "Tailwind", "Maps UI"],
    liveUrl: "https://northgate-properties.vercel.app/",
    image: {
      src: "",
      alt: "",
    },
    id: "northgate",
    url: "https://northgate-properties.vercel.app/",
    description:
      "A modern property-focused digital experience presenting real estate listings with a polished browsing experience for buyers and clients.",
    category: "Websites",
    accent: "var(--accent)",
    availability: "Available for Customization",
    featured: true,
    tech: ["Next.js", "Tailwind", "Maps UI"],
    role: "Designer & Developer",
    problem: "Property browsing needed to feel trustworthy and easy to scan.",
    approach:
      "A clean, listing-first layout with strong imagery and clear calls to action.",
    lessons:
      "Information architecture matters more than color for real-estate usability.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
  },
  {
    slug: "ember-spice",
    name: "Ember & Spice",
    type: "website",
    status: "available",
    statusLabel: "Available for customization",
    oneLiner:
      "A restaurant website that shows the food and the feel of the place.",
    whatItIs:
      "A site that communicates atmosphere, food, and brand personality. Visitors can see the food and get a feel for the restaurant.",
    whoItsFor: "Restaurants and food businesses.",
    whatsInside: [
      "Food and menu presentation",
      "Brand personality",
      "Customer appeal",
    ],
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    liveUrl: "https://ember-and-spice-kohl.vercel.app/",
    image: {
      src: "",
      alt: "",
    },
    id: "ember-spice",
    url: "https://ember-and-spice-kohl.vercel.app/",
    description:
      "A modern restaurant digital experience communicating atmosphere, food, brand personality, and customer appeal through an engaging web interface.",
    category: "Websites",
    accent: "var(--accent)",
    availability: "Available for Customization",
    featured: true,
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    role: "Designer & Developer",
    problem:
      "A restaurant needed warmth and personality online, not a generic template.",
    approach: "A warm, imagery-led design that sells the feeling of the place.",
    lessons: "Mood and typography do most of the selling for food brands.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
  },
  {
    slug: "adura-glow",
    name: "Adura Glow Oil",
    type: "website",
    status: "available",
    statusLabel: "Available for customization",
    oneLiner: "An online store for a beauty and botanical oil brand.",
    whatItIs:
      "A visual storefront that presents products in a polished shopping experience. The focus is on beauty and botanical products.",
    whoItsFor: "Beauty and natural product sellers.",
    whatsInside: [
      "Beauty and botanical products",
      "Product presentation",
      "Visual-first shopping",
    ],
    stack: ["Next.js", "Tailwind", "Product UI"],
    liveUrl: "https://adura-glow-oil-store.vercel.app/",
    image: {
      src: "/projects/adura-glow.webp",
      alt: "Screenshot of the Adura Glow Oil website",
    },
    id: "adura-glow",
    url: "https://adura-glow-oil-store.vercel.app/",
    description:
      "A digital storefront for a beauty and botanical product brand, presenting products through a polished, visually focused shopping experience.",
    category: "E-commerce",
    accent: "var(--accent)",
    availability: "Available for Customization",
    featured: true,
    tech: ["Next.js", "Tailwind", "Product UI"],
    role: "Designer & Developer",
    problem:
      "A product brand needed a storefront that felt premium and focused on the product.",
    approach:
      "A clean product experience with strong visuals and simple purchase flow.",
    lessons: "Reducing friction at every step increases perceived quality.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
    previewImage: "/projects/adura-glow.webp",
  },
  {
    slug: "kirvon",
    name: "Kirvon Store",
    type: "website",
    status: "available",
    statusLabel: "Available for customization",
    oneLiner:
      "An online store for gadgets in Nigeria, with delivery nationwide.",
    whatItIs:
      "A premium e-commerce site that sells audio gear, wearables, and power equipment. It shows pay-on-delivery and a 12-month warranty clearly.",
    whoItsFor: "Shop owners who want a clean online store.",
    whatsInside: [
      "Product categories (audio, wearables, power gear)",
      "Nationwide delivery information",
      "Pay on delivery",
      "12-month warranty details",
    ],
    stack: ["HTML/CSS", "JavaScript", "E-commerce UI", "Product Catalog"],
    liveUrl: "https://kirvonstore.vercel.app/",
    image: {
      src: "/projects/kirvon.webp",
      alt: "Screenshot of the Kirvon Store website",
    },
    id: "kirvon",
    url: "https://kirvonstore.vercel.app/",
    description:
      "A premium Nigerian gadget e-commerce experience — selling audio, wearables, and power gear with nationwide delivery, pay-on-delivery, and a 12-month warranty.",
    category: "E-commerce",
    accent: "var(--accent)",
    availability: "Available for Customization",
    featured: true,
    tech: ["HTML/CSS", "JavaScript", "E-commerce UI", "Product Catalog"],
    role: "Designer & Developer",
    problem:
      "A consumer gadget brand needed a storefront that felt as premium as the products, while supporting practical local commerce needs like pay-on-delivery, nationwide shipping, and warranty trust signals.",
    approach:
      "Built a focused, brand-led shopping experience with strong product imagery, clear category browsing (audio, wearables, power & desk), spotlight sections, and trust messaging around delivery, warranty, and returns.",
    lessons:
      "Local e-commerce succeeds when the international feel of a premium store is balanced with the practical trust signals buyers in that market actually look for — delivery, warranty, and payment flexibility.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
    previewImage: "/projects/kirvon.webp",
  },
  {
    slug: "supportiq",
    name: "SupportIQ",
    type: "ai-automation",
    status: "private-preview",
    statusLabel: "Private preview",
    oneLiner:
      "An AI customer support tool built around your own business information.",
    whatItIs:
      "A platform concept that helps businesses create smart support chats using their own knowledge. The answers are based on information about the business.",
    whoItsFor: "Businesses that answer the same customer questions often.",
    whatsInside: [
      "Business-specific answers",
      "AI-powered conversations",
      "Uses your business information",
    ],
    stack: ["Next.js", "TypeScript", "LLM APIs", "Auth", "PostgreSQL"],
    liveUrl: "https://supportiq-two.vercel.app/",
    image: {
      src: "",
      alt: "",
    },
    id: "supportiq",
    url: "https://supportiq-two.vercel.app/",
    description:
      "An AI-powered customer support platform concept helping businesses create intelligent support experiences using business-specific knowledge and AI-powered conversations.",
    category: "AI",
    accent: "var(--accent)",
    availability: "Private Preview",
    featured: true,
    tech: ["Next.js", "TypeScript", "LLM APIs", "Auth", "PostgreSQL"],
    role: "Builder & Designer",
    problem:
      "Small businesses struggle to give fast, consistent support without a full team.",
    approach:
      "A chatbot that reads uploaded business documents and answers from that context.",
    lessons:
      "Retrieval and source quality matter more than the model alone — chunking and source handling decide real quality.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
  },
  {
    slug: "master-prompter",
    name: "Master Prompter",
    type: "ai-automation",
    status: "available",
    statusLabel: "Available for customization",
    oneLiner: "A tool that turns your goal into a well-structured AI prompt.",
    whatItIs:
      "A workspace where you enter a goal, a role, and an output type, and get a structured prompt for any AI model. It has a saveable prompt library.",
    whoItsFor: "Anyone who uses AI tools and wants better results.",
    whatsInside: [
      "Goal, role, and output inputs",
      "Structured prompt output",
      "Saved prompt library",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Prompt Engineering",
      "Local Storage",
      "Tailwind",
    ],
    liveUrl: "https://masterprompter.vercel.app/",
    image: {
      src: "",
      alt: "",
    },
    id: "master-prompter",
    url: "https://masterprompter.vercel.app/",
    description:
      "A prompt-engineering workspace that turns a goal, role, and output type into a structured master prompt you can paste into any LLM — complete with a saveable prompt library.",
    category: "AI",
    accent: "var(--accent)",
    availability: "Available for Customization",
    featured: true,
    tech: [
      "Next.js",
      "TypeScript",
      "Prompt Engineering",
      "Local Storage",
      "Tailwind",
    ],
    role: "Builder & Designer",
    problem:
      "Most people get mediocre AI output because they start with a vague request. Crafting a structured prompt from scratch is repetitive work that interrupts the actual task.",
    approach:
      "Built a focused builder that takes goal + role + output type, applies structure and quality rules, and outputs a paste-ready prompt. Added a categorized, searchable prompt library with import/export so good prompts compound over time.",
    lessons:
      "Good AI tools reduce the gap between intention and output. Constraining the inputs (role, output type) is what turns a generic chatbot interaction into a reliable workflow.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
  },
  {
    slug: "flowsource",
    name: "Flowsource",
    type: "ai-automation",
    status: "available",
    statusLabel: "Available for customization",
    oneLiner: "A visual workflow builder that runs entirely in your browser.",
    whatItIs:
      "A drag-and-drop canvas where you connect steps to build workflows. Nothing leaves the browser and no API keys are needed.",
    whoItsFor: "People who want to design or demonstrate workflows.",
    whatsInside: [
      "144 node types",
      "90+ simulated integrations",
      "AI Agent runs you can inspect",
      "Infinite canvas",
    ],
    stack: [
      "TypeScript",
      "Topological Scheduling",
      "Canvas UI",
      "AI Agent Nodes",
      "localStorage",
    ],
    liveUrl: "https://flowsource.vercel.app/",
    image: {
      src: "/projects/flowsource.webp",
      alt: "Screenshot of the Flowsource website",
    },
    id: "flowsource",
    url: "https://flowsource.vercel.app/",
    description:
      "A 100% client-side visual workflow builder — 144 node types, 90+ simulated integrations, and inspectable AI Agent runs on an infinite canvas, with no API keys and nothing leaving the browser.",
    category: "AI",
    accent: "var(--accent)",
    availability: "Available for Customization",
    featured: true,
    tech: [
      "TypeScript",
      "Topological Scheduling",
      "Canvas UI",
      "AI Agent Nodes",
      "localStorage",
    ],
    role: "Builder & Designer",
    problem:
      "Real automation tools (n8n, Make) require accounts, API keys, and a backend — too much friction to think through a workflow. Most prototyping never happens.",
    approach:
      "Built an in-browser workflow engine with topological wave scheduling, branching, switches, loops, and AI Agent nodes — all simulated, all inspectable. Every payload is logged in a live console; workflows save to localStorage and share as a single encoded link.",
    lessons:
      "Removing the backend is what makes a builder actually usable for thinking. When the cost of trying an idea is zero, people explore further and ship more interesting workflows.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
    previewImage: "/projects/flowsource.webp",
  },
  {
    slug: "scrolltek",
    name: "ScrollTek",
    type: "website",
    status: "available",
    statusLabel: "Available for customization",
    oneLiner:
      "A news and magazine site about tech, AI tools, phone tips, and lifestyle.",
    whatItIs:
      "A content platform covering technology, digital culture, AI tools, phone tips, lifestyle, productivity, and trending topics. Readers can browse articles by topic.",
    whoItsFor: "Publishers and bloggers.",
    whatsInside: [
      "Article categories",
      "Content-focused layout",
      "Tech, AI tools, and lifestyle topics",
    ],
    stack: ["Next.js", "Tailwind", "CMS-style"],
    liveUrl: "https://newsz-delta.vercel.app/",
    image: {
      src: "",
      alt: "",
    },
    id: "scrolltek",
    url: "https://newsz-delta.vercel.app/",
    description:
      "A digital publication platform covering technology, digital culture, AI tools, phone tips, lifestyle, productivity, and trending topics — a content-driven media experience.",
    category: "Media",
    accent: "var(--accent)",
    availability: "Available for Customization",
    featured: false,
    tech: ["Next.js", "Tailwind", "CMS-style"],
    role: "Builder & Editor",
    problem:
      "A content platform needed to feel current, readable, and easy to browse.",
    approach:
      "A media layout built around fast reading and clear topic structure.",
    lessons:
      "Content systems live or die by how easy it is to publish consistently.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
  },
  {
    slug: "aduke-admin",
    name: "Aduke Studio Admin Panel",
    type: "dashboard",
    status: "available",
    statusLabel: "Available for customization",
    oneLiner: "An admin dashboard for managing content and business systems.",
    whatItIs:
      "A structured dashboard for controlling digital content and business operations. It brings management screens into a clear layout.",
    whoItsFor: "Small businesses and studios.",
    whatsInside: [
      "Content management screens",
      "Business management screens",
      "Structured admin layout",
    ],
    stack: ["Next.js", "Tailwind", "Dashboard UI"],
    liveUrl: "https://admin-dashboard-ashy-tau-44.vercel.app/",
    image: {
      src: "",
      alt: "",
    },
    id: "aduke-admin",
    url: "https://admin-dashboard-ashy-tau-44.vercel.app/",
    description:
      "A dashboard interface for managing and controlling digital content and business systems through a structured administrative experience.",
    category: "Dashboards",
    accent: "var(--accent)",
    availability: "Available for Customization",
    featured: false,
    tech: ["Next.js", "Tailwind", "Dashboard UI"],
    role: "Designer & Developer",
    problem:
      "Managing content and systems needed a clear, structured control surface.",
    approach: "A dashboard focused on clarity, density, and quick actions.",
    lessons: "Admin tools succeed when the most common task is one click away.",
    health: "UNKNOWN",
    lastChecked: "Not verified",
  },
];

type CapturedPreview = {
  src: string;
  sourceUrl: string;
  sha256: string;
  capturedAt: string;
};
const homepageCaptures = previewManifest.projects as Record<
  string,
  CapturedPreview
>;
// Generated assets only override images when they belong to this exact public demo URL.
// Keep the six original screenshots as fallbacks; never rewrite their files.
for (const project of projects) {
  const capture = homepageCaptures[project.slug];
  if (
    capture?.sourceUrl === project.liveUrl &&
    new RegExp(`^/projects/previews/${project.slug}-[a-f0-9]{12}\\.webp$`).test(
      capture.src,
    )
  ) {
    project.image = {
      src: capture.src,
      alt: `Homepage screenshot of ${project.name}`,
      ...(project.image.src ? { fallbackSrc: project.image.src } : {}),
    };
  }
}

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "websites", label: "Websites" },
  { id: "ai-automation", label: "AI and automation" },
  { id: "apps", label: "Apps and dashboards" },
  { id: "3d-experiences", label: "3D experiences" },
] as const;
export type ProjectFilter = (typeof projectFilters)[number]["id"];

export function projectCategoryFromParam(
  param: string | null | undefined,
): ProjectFilter {
  const aliases: Record<string, ProjectFilter> = {
    website: "websites",
    "web-development": "websites",
    "e-commerce": "websites",
    "digital-products": "websites",
    "content-systems": "websites",
    media: "websites",
    ai: "ai-automation",
    saas: "ai-automation",
    dashboards: "apps",
    "web-app": "apps",
    dashboard: "apps",
    experiments: "3d-experiences",
    "3d-experience": "3d-experiences",
  };
  if (!param) return "all";
  if (projectFilters.some((filter) => filter.id === param))
    return param as ProjectFilter;
  return aliases[param] ?? "all";
}
export function projectMatchesFilter(
  project: Pick<Project, "type">,
  filter: string,
): boolean {
  const normalized = projectCategoryFromParam(filter);
  if (normalized === "all") return true;
  if (normalized === "websites") return project.type === "website";
  if (normalized === "ai-automation") return project.type === "ai-automation";
  if (normalized === "apps")
    return project.type === "web-app" || project.type === "dashboard";
  return project.type === "3d-experience";
}
export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
export function getMoreProjects(slug: string) {
  const current = getProject(slug);
  return projects
    .filter((project) => project.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.type === current?.type) - Number(a.type === current?.type),
    )
    .slice(0, 3);
}
export const selectedProjectSlugs = [
  "kirvon",
  "velvet-fade",
  "northgate",
  "eduflow",
  "hireflows",
  "flowsource",
];
export const selectedProjects = selectedProjectSlugs.map((slug) =>
  projects.find((project) => project.slug === slug)!,
);

export type Service = {
  id: string;
  title: string;
  group: "main" | "extra" | "supporting";
  accent: string;
  summary: string;
  cardSummary: string;
  audience: string;
  highlights: string[];
  examples: string[];
  cta: string;
  ctaHref: string;
  ctaLabel: string;
  contactType: string;
};

export const services: Service[] = [
  {
    id: "web",
    title: "Websites",
    group: "main",
    summary:
      "A website that explains what you do, looks good on a phone, and makes it easy for people to contact you or buy.",
    cardSummary:
      "A clear, fast website for your business, shop, or personal brand. It works well on phones and is easy to read.",
    audience:
      "Small businesses, shops, salons, restaurants, property sellers, personal brands, and schools.",
    highlights: [
      "A clean, mobile-friendly website",
      "Pages for your services, products, or listings",
      "A contact or order option",
      "Text and layout that are easy to read for all ages",
    ],
    examples: ["velvet-fade", "northgate", "ember-spice", "kirvon"],
    cta: "Ask about a website",
    ctaHref: "/work?type=websites",
    ctaLabel: "See website work",
    contactType: "Website",
    accent: "var(--accent)",
  },
  {
    id: "ai-automation",
    title: "AI and automation",
    group: "main",
    summary:
      "Tools that take over repeat work: posting content, handling forms, organizing data, or answering common questions. I use tools such as Make.com, n8n, and AI models.",
    cardSummary:
      "Tools that do repeat jobs for you, such as posting content, sorting messages, or answering common customer questions.",
    audience:
      "Business owners and creators who repeat the same tasks every day.",
    highlights: [
      "A plan for what can be automated and what should stay manual",
      "A working workflow connected to the tools you already use",
      "Simple instructions for how to run it",
    ],
    examples: ["flowsource", "supportiq", "master-prompter", "hireflows"],
    cta: "Ask about automation",
    ctaHref: "/work?type=ai-automation",
    ctaLabel: "See automation work",
    contactType: "AI automation",
    accent: "var(--accent)",
  },
  {
    id: "ebooks",
    title: "Writing and eBooks",
    group: "main",
    summary: "Clear writing, from a full eBook to the text on your website.",
    cardSummary:
      "eBooks, website copy, and product descriptions that are clear and easy to follow. I can also design the cover.",
    audience:
      "Authors, coaches, small businesses, and anyone with knowledge worth sharing.",
    highlights: [
      "eBook writing, from outline to final draft",
      "Website, landing page, and product copy",
      "Editing and formatting for Amazon KDP, Amazon’s book-publishing service",
    ],
    examples: [],
    cta: "Ask about writing",
    ctaHref: "/writing",
    ctaLabel: "See writing work",
    contactType: "eBook or writing",
    accent: "var(--accent)",
  },
  {
    id: "copywriting",
    title: "Copywriting",
    group: "supporting",
    summary:
      "Website text, product descriptions, emails, and brand voice. Written for the reader, in plain words.",
    cardSummary: "Clear words for your website, products, and marketing.",
    audience: "Small businesses, shops, and personal brands.",
    highlights: [
      "Website and landing page text",
      "Product descriptions",
      "Emails and brand voice",
    ],
    examples: [],
    cta: "Ask about copywriting",
    ctaHref: "/writing/copywriting-portfolio",
    ctaLabel: "See copywriting samples",
    contactType: "eBook or writing",
    accent: "var(--accent)",
  },
  {
    id: "ebook-cover",
    title: "eBook cover design",
    group: "extra",
    summary:
      "A cover that fits the book's topic and its readers, in print and digital sizes.",
    cardSummary:
      "A cover that fits the book's topic and its readers, in print and digital sizes.",
    audience: "Authors and publishers.",
    highlights: [
      "Cover ideas and direction",
      "Typography and layout",
      "Print and digital formats",
    ],
    examples: [],
    cta: "Ask about a cover",
    ctaHref: "/writing#cover-design",
    ctaLabel: "See book covers",
    contactType: "Cover design",
    accent: "var(--accent)",
  },
  {
    id: "youtube",
    title: "YouTube and content support",
    group: "extra",
    summary:
      "Scripts, ideas, faceless video content, Shorts, thumbnails, and video editing.",
    cardSummary:
      "Scripts, ideas, faceless video content, Shorts, thumbnails, and video editing.",
    audience: "Creators and businesses.",
    highlights: [
      "YouTube channel development",
      "Faceless YouTube content",
      "YouTube Shorts",
      "Scriptwriting",
      "Content ideation",
      "Visual storytelling",
      "AI-assisted production",
      "Video editing",
      "Animation",
      "Thumbnail concepts",
      "Content repurposing",
      "Social media content systems",
    ],
    examples: [],
    cta: "Ask about content",
    ctaHref: "/content",
    ctaLabel: "See content services",
    contactType: "YouTube content",
    accent: "var(--accent)",
  },
  {
    id: "custom-ai",
    title: "Custom AI web apps",
    group: "extra",
    summary: "Small web apps with AI features, built to your needs.",
    cardSummary: "Small web apps with AI features, built to your needs.",
    audience: "Businesses and creators with a specific task to solve.",
    highlights: [
      "A focused web app",
      "AI features for your task",
      "A clear, usable interface",
    ],
    examples: ["eduflow", "hireflows"],
    cta: "Ask about a web app",
    ctaHref: "/work?type=ai-automation",
    ctaLabel: "See AI web apps",
    contactType: "AI automation",
    accent: "var(--accent)",
  },
];

export const mainServices = services.filter(
  (service) => service.group === "main",
);
export const extraServices = services.filter(
  (service) => service.group === "extra",
);

export const serviceGroups = [
  {
    key: "build",
    label: "BUILD",
    blurb: "AI, automation, websites, and digital products.",
    accent: "var(--accent)",
  },
  {
    key: "write",
    label: "WRITE",
    blurb: "Fiction, nonfiction, eBooks, copywriting, and publishing.",
    accent: "var(--accent)",
  },
  {
    key: "design",
    label: "DESIGN",
    blurb: "eBook covers, digital interfaces, and visual experiences.",
    accent: "var(--accent)",
  },
  {
    key: "create",
    label: "CREATE",
    blurb: "YouTube, video, animation, storytelling, and AI-assisted content.",
    accent: "var(--accent)",
  },
];

export const contentSkills: { label: string }[] = [
  {
    label: "YouTube",
  },
  {
    label: "YouTube Shorts",
  },
  {
    label: "Faceless Content",
  },
  {
    label: "Video Editing",
  },
  {
    label: "Animation",
  },
  {
    label: "Visual Storytelling",
  },
  {
    label: "Scriptwriting",
  },
  {
    label: "Content Strategy",
  },
  {
    label: "AI Content Creation",
  },
  {
    label: "Thumbnail Design",
  },
  {
    label: "Content Automation",
  },
  {
    label: "Social Media Systems",
  },
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
  status:
    | "Published"
    | "In Development"
    | "Researching"
    | "Concept"
    | "Idea"
    | "Draft"
    | "Planning";
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
    description:
      "Practical time management and productivity strategies designed specifically for mothers juggling family, work, and personal goals.",
    summary:
      "Modern motherhood often comes with an overwhelming number of responsibilities competing for the same limited hours of the day.\n\nThis book explores practical ways busy mothers can create more manageable systems for everyday life without chasing unrealistic versions of productivity.\n\nIt focuses on simplifying routines, organizing responsibilities, reducing mental overload, planning more effectively, and creating systems that work within the realities of family life.\n\nRather than promoting the idea that a mother must do everything perfectly, the book focuses on practical organization, realistic routines, and creating more breathing room in a busy life.",
    themes: [
      "Time management",
      "Daily routines",
      "Home organization",
      "Planning",
      "Mental overload",
      "Productivity",
      "Family responsibilities",
      "Practical systems",
    ],
    status: "In Development",
    coverColor: "#b6ff3d",
    coverImage:
      "https://cdn.phototourl.com/free/2026-07-20-a627c161-6b67-4b6d-a6d0-c9dfea2b9be5.png",
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
    description:
      "A practical guide to the AI tools and workflows that virtual assistants can use to work faster, communicate better, and deliver more value to their clients.",
    summary:
      "Artificial intelligence is changing the way many digital professionals work.\n\nAI Tools for Virtual Assistants explores practical ways virtual assistants can use modern AI tools to support their daily work, improve productivity, reduce repetitive tasks, and deliver better services to clients.\n\nThe book explores applications such as research, writing assistance, document creation, communication, organization, content support, and workflow automation.\n\nRather than presenting AI as a replacement for human skill, the book focuses on how virtual assistants can use AI as a practical tool to work more efficiently and expand the value they provide.",
    themes: [
      "AI tools",
      "Virtual assistance",
      "Productivity",
      "Research",
      "Content support",
      "Workflow automation",
      "Client services",
      "Digital work",
    ],
    status: "In Development",
    coverColor: "#3df0ff",
    coverImage:
      "https://cdn.phototourl.com/free/2026-07-20-b2bb80a8-51e3-4ae6-a589-58947759ffa8.jpg",
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
    description:
      "A grounded, practical guide for freelancers looking to integrate AI tools into their workflow — without the hype, without the fluff.",
    summary:
      "Freelancers are constantly balancing client work, communication, marketing, research, administration, and the actual delivery of their services.\n\nAI for Freelancers explores how modern AI tools can support freelancers across these different areas.\n\nThe book focuses on practical applications such as research, writing, brainstorming, client communication, proposals, task organization, content creation, and workflow improvement.\n\nIt presents AI as a tool that can help freelancers reduce repetitive work, improve their processes, and spend more time focusing on valuable creative and professional work.",
    themes: [
      "Freelancing",
      "AI tools",
      "Productivity",
      "Client work",
      "Research",
      "Writing",
      "Automation",
      "Business workflows",
    ],
    status: "Researching",
    coverColor: "#4d8bff",
    coverImage:
      "https://cdn.phototourl.com/free/2026-07-20-28987222-0532-4b14-8b9b-3519d09ec73c.jpg",
  },
  {
    id: "the-trust-factor",
    title: "The Trust Factor: Rebuilding Love After Betrayal",
    subtitle: "Building, Breaking, and Restoring Trust in Relationships",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "Relationships",
    subcategory: "Relationship Dynamics",
    description:
      "An exploration of what trust really means in relationships — how it's built, how it's broken, and how it's restored.",
    summary:
      "Betrayal can change the way people experience love, trust, vulnerability, and emotional safety.\n\nThe Trust Factor: Rebuilding Love After Betrayal explores the difficult and often complicated process of rebuilding trust after a relationship has been damaged by betrayal.\n\nThe book examines communication, accountability, emotional honesty, forgiveness, boundaries, and the difficult question of whether trust can truly be rebuilt.\n\nIt also recognizes that rebuilding a relationship is not always the right choice for everyone.\n\nAt its heart, the book explores what it takes to create emotional safety again — whether that means rebuilding the relationship or finding the strength to move forward.",
    themes: [
      "Betrayal",
      "Trust",
      "Relationships",
      "Communication",
      "Accountability",
      "Forgiveness",
      "Emotional safety",
      "Boundaries",
    ],
    status: "Concept",
    coverColor: "#ffb13d",
    coverImage:
      "https://cdn.phototourl.com/free/2026-07-20-9ccbd65a-6d96-4825-8396-1f13f69c2dfb.jpg",
  },
  {
    id: "dark-psychology",
    title: "Dark Psychology and Emotional Control",
    subtitle: "Understanding Manipulation and Protecting Your Mind",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "Psychology",
    subcategory: "Self-Awareness",
    description:
      "An examination of psychological manipulation tactics, emotional influence, and the awareness needed to recognize and respond to them.",
    summary:
      "People are influenced by the words, behaviors, emotions, and psychological tactics of others every day.\n\nDark Psychology and Emotional Control explores the darker side of psychological influence, manipulation, persuasion, and emotional control.\n\nThe purpose of the book is not to teach readers how to exploit other people.\n\nInstead, it focuses on awareness.\n\nThe book explores how people may recognize unhealthy manipulation, understand psychological influence, identify emotional control, become more aware of harmful patterns, and protect their emotional independence.\n\nUnderstanding these dynamics can help people make more informed decisions about the relationships and situations they find themselves in.",
    themes: [
      "Psychological influence",
      "Emotional manipulation",
      "Persuasion",
      "Emotional control",
      "Self-awareness",
      "Boundaries",
      "Psychological protection",
      "Emotional independence",
    ],
    status: "Researching",
    coverColor: "#ff4dcb",
    coverImage:
      "https://cdn.phototourl.com/free/2026-07-20-5080ebbf-88bc-43ba-9a6d-7e3cfdfca445.jpg",
  },
  {
    id: "boundary-mastery",
    title: "Boundary Mastery: How to Protect Your Heart Without Closing It",
    subtitle: "The Art of Setting and Keeping Healthy Boundaries",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "Personal Development",
    subcategory: "Self-Improvement",
    description:
      "A practical guide to understanding, setting, and maintaining healthy boundaries in relationships, work, and daily life.",
    summary:
      "Protecting yourself does not mean becoming cold.\n\nSetting boundaries does not mean pushing everyone away.\n\nBoundary Mastery: How to Protect Your Heart Without Closing It explores how people can develop healthier boundaries while remaining open to connection, love, trust, and meaningful relationships.\n\nThe book explores the difference between healthy self-protection and emotional isolation.\n\nIt examines how to say no, communicate personal limits, protect emotional energy, recognize unhealthy relationship patterns, and maintain self-respect without completely closing yourself off from others.\n\nThe central idea is simple: You can protect your heart without building a wall around it.",
    themes: [
      "Emotional boundaries",
      "Self-respect",
      "Communication",
      "Relationships",
      "Emotional protection",
      "Vulnerability",
      "Trust",
      "Personal growth",
    ],
    status: "Concept",
    coverColor: "#a974ff",
    coverImage:
      "https://cdn.phototourl.com/free/2026-07-20-244c6ae9-3f0d-48cf-a58f-d2b880c044fb.jpg",
  },
  {
    id: "male-female-dynamic",
    title: "Female Mind / Male Mind Dynamic",
    subtitle: "Understanding Communication, Emotion, and Connection",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "Relationships",
    subcategory: "Gender Dynamics",
    description:
      "A thoughtful exploration of communication styles, emotional needs, and relationship dynamics between men and women.",
    summary:
      "Relationships are often affected by differences in communication, expectations, emotional expression, personality, experience, and cultural conditioning.\n\nFemale Mind / Male Mind Dynamic explores common patterns that can influence how men and women may communicate, process emotions, understand relationships, and respond to conflict.\n\nThe book should not present men and women as rigidly identical or completely different.\n\nInstead, it should encourage readers to explore relationship dynamics with nuance and curiosity.\n\nIndividual personality, life experience, culture, and personal values all play an important role in how people think and behave.\n\nThe goal is not to create stereotypes.\n\nThe goal is to encourage better understanding, communication, and awareness between people.",
    themes: [
      "Communication",
      "Relationships",
      "Emotional expression",
      "Expectations",
      "Conflict",
      "Gender dynamics",
      "Personality",
      "Human behavior",
    ],
    status: "Concept",
    coverColor: "#ff5d6c",
    coverImage:
      "https://cdn.phototourl.com/free/2026-07-20-a3461d4f-8a59-4871-a1c6-13c506783cf4.jpg",
  },
  {
    id: "shadows-of-tomorrow",
    title: "Shadows of Tomorrow",
    subtitle: "A Novel About Choice, Consequence, and the Paths Not Taken",
    author: "Joseph Unaogu",
    genre: "fiction",
    category: "Literary Fiction",
    subcategory: "Speculative Science Fiction",
    description:
      "A literary fiction concept exploring choice, consequence, and the paths not taken.",
    summary:
      "The Shadows of Tomorrow is a speculative psychological science-fiction story about the uncertainty of the future and the hidden consequences of the choices people make today.\n\nSet against a world increasingly shaped by technology, surveillance, artificial intelligence, and rapidly changing societies, the story explores what happens when humanity begins to encounter possibilities of the future that were never meant to be seen.\n\nAs the boundary between prediction and reality begins to disappear, the characters are forced to confront difficult questions about identity, memory, free will, and the nature of destiny. Is the future something that can truly be changed, or are people simply moving toward events that have already been set in motion?\n\nThe story explores the psychological weight of knowing what may come next and the danger of allowing fear of the future to control the present. As hidden truths begin to surface, the shadows of tomorrow become more than distant possibilities — they become reflections of the choices, fears, and secrets people have carried with them all along.\n\nThe Shadows of Tomorrow is a story about technology, uncertainty, human nature, and the consequences of looking too far into the future. It combines mystery, psychological tension, speculative science fiction, and emotional storytelling into a journey through the possibilities of what humanity may become.",
    themes: [
      "choice",
      "consequence",
      "memory",
      "identity",
      "technology",
      "surveillance",
      "artificial intelligence",
      "free will",
      "human nature",
      "uncertainty",
    ],
    status: "Concept",
    coverColor: "#a974ff",
    coverImage:
      "https://cdn.phototourl.com/free/2026-07-20-88da20e4-a052-42bd-bf58-96f106089675.jpg",
  },
  {
    id: "the-last-archive",
    title: "The Last Archive",
    subtitle: "When Memory Becomes Currency — A Speculative Tale",
    author: "Joseph Unaogu",
    genre: "fiction",
    category: "Speculative Fiction",
    subcategory: "Science-Fiction Mystery",
    description:
      "A speculative fiction concept set in a world where memory is currency.",
    summary:
      "The Last Archives is a science-fiction mystery about the final surviving repository of humanity's knowledge after the world as it was once known has disappeared.\n\nIn a future shaped by technological advancement, conflict, environmental change, and the collapse of systems that once connected civilization, the remains of humanity's history are scattered, corrupted, or forgotten.\n\nSomewhere beyond the ruins of the old world lies the Last Archive — a mysterious repository believed to contain the final complete record of human civilization. Within its vast chambers are records of forgotten discoveries, lost cultures, abandoned technologies, hidden conflicts, and truths that powerful forces may have spent generations trying to erase.\n\nWhen the archive is finally discovered, the search for knowledge becomes something far more dangerous. The records do not simply explain the past. They reveal secrets about how the present world came to exist and raise unsettling questions about what may happen next.\n\nAs the truth begins to emerge, the characters must decide whether every truth deserves to be recovered, whether knowledge can truly save humanity, and whether some parts of history were deliberately forgotten for a reason.\n\nThe Last Archives explores the relationship between memory and power, the preservation of knowledge, the fragility of civilization, and humanity's desire to understand where it came from.\n\nIt is a story about forgotten history, lost knowledge, discovery, secrets, and the final question that remains when almost everything else has been lost:\n\nWhat will humanity choose to remember?",
    themes: [
      "memory",
      "identity",
      "dystopia",
      "humanity",
      "technology",
      "lost knowledge",
      "discovery",
      "secrets",
      "civilization",
      "power",
    ],
    status: "Idea",
    coverColor: "#4d8bff",
    coverImage:
      "https://cdn.phototourl.com/free/2026-07-20-d4aba4f2-93c8-45f4-8a5d-53f710f069f5.jpg",
  },
  {
    id: "copywriting-portfolio",
    title: "Copywriting Portfolio",
    subtitle: "Web Copy, Product Descriptions, and Marketing Content",
    author: "Joseph Unaogu",
    genre: "nonfiction",
    category: "Copywriting",
    subcategory: "Professional Writing",
    description:
      "Samples and case studies from professional copywriting work — website copy, product descriptions, email campaigns, and marketing content.",
    summary:
      "Copywriter Portfolio is a curated collection of writing, messaging, and creative communication work designed to demonstrate the power of words in digital spaces.\n\nThe portfolio explores how strong copy can transform ideas into clear messages, turn attention into interest, and help brands communicate with the people they want to reach.\n\nIt showcases different approaches to writing, including website copy, landing page messaging, brand communication, product descriptions, service descriptions, marketing content, social media copy, and other forms of digital communication.\n\nAt its core, the portfolio reflects an approach to copywriting built around clarity, psychology, creativity, and purpose. Every piece of copy should do more than simply fill a page. It should communicate an idea, create interest, build trust, guide attention, and encourage the reader to take the next step.\n\nCopywriter Portfolio represents Joseph Unaogu's ability to take complex ideas and turn them into clear, engaging, and purposeful communication.\n\nIt is a collection of words written to inform, persuade, connect, and move people.",
    themes: [
      "copywriting",
      "marketing",
      "brand voice",
      "digital content",
      "clarity",
      "psychology",
      "creativity",
      "communication",
    ],
    status: "In Development",
    coverColor: "#3df0ff",
    coverImage:
      "https://cdn.phototourl.com/member/2026-07-20-bb53c054-fd9b-4237-9280-0062fe345c87.jpg",
  },
];

/** A cached copy of the same original cover; the writing record itself is never changed. */
export function writingCoverSource(
  book: Pick<Writing, "id" | "coverImage">,
): string | undefined {
  const capture = (previewManifest.writing as Record<string, CapturedPreview>)[
    book.id
  ];
  return capture?.sourceUrl === book.coverImage &&
    new RegExp(
      `^/writing/covers/${book.id}-[a-f0-9]{12}\\.(jpg|png|webp|avif|gif)$`,
    ).test(capture.src)
    ? capture.src
    : undefined;
}

export const nowFocus = [
  "Building small AI-powered web projects and shipping them publicly.",
  "Improving my full-stack development with Next.js and TypeScript.",
  "Exploring automation with Make.com and n8n for real workflows.",
  "Creating written content — eBooks, articles, and sharper copy.",
  "Preparing YouTube content around AI tools and practical building.",
];

export const ideaToBuild = [
  {
    step: "01",
    title: "IDEA",
    body: "I start with a problem, opportunity, or idea.",
  },
  {
    step: "02",
    title: "EXPLORE",
    body: "I research the concept and explore possible tools.",
  },
  {
    step: "03",
    title: "BUILD",
    body: "I turn the idea into a functional digital experience.",
  },
  {
    step: "04",
    title: "LEARN",
    body: "I test, troubleshoot, improve, and learn from the process.",
  },
  {
    step: "05",
    title: "REFINE",
    body: "I continue improving the product and the skills behind it.",
  },
];

export const activityLog = [
  {
    year: "2026",
    items: [
      "New project added",
      "Portfolio updated",
      "AI application experiment started",
      "New website completed",
      "Writing project in progress",
    ],
  },
];

export const contactProjectTypes = [
  "Website",
  "AI automation",
  "eBook or writing",
  "Cover design",
  "YouTube content",
  "Not sure",
];

export const workSteps = [
  {
    title: "You tell me what you need.",
    body: "Send a short message by email, WhatsApp, or the form. No technical words needed.",
  },
  {
    title: "I make a plan and build it.",
    body: "I explain what I'll do and what I need from you.",
  },
  {
    title: "You review and launch.",
    body: "You check the work, ask for changes, and we put it live.",
  },
];

export const faq = [
  {
    q: "What kinds of work do you take on?",
    a: "Websites, automation setups, eBook writing, copywriting, eBook cover design, and YouTube content support.",
  },
  {
    q: "I'm not technical. Is that a problem?",
    a: "No. I explain things in plain words and I'll ask only what I need.",
  },
  {
    q: "Do you work with people outside Nigeria?",
    a: "Yes. I work remotely by email, WhatsApp, and video calls.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on the size of the job. Send a short description and I'll give you a quote.",
  },
  {
    q: "Can I buy or customize one of the projects on your site?",
    a: "Many of them are available for customization. They can be adapted to your business or used as a starting point. Ask about a specific project from its page.",
  },
  {
    q: "How long does a project take?",
    a: "Timing depends on what you need. Send a short brief so we can discuss the scope and next steps.",
  },
  {
    q: "How do I get started?",
    a: "Press “Hire me,” or message me on WhatsApp.",
  },
];

export const faqAssistant = faq;

export const ebookProcess = [
  {
    title: "Brief",
    body: "We agree on the topic, readers, and goal.",
  },
  {
    title: "Research and outline",
    body: "I plan every chapter.",
  },
  {
    title: "First draft",
    body: "I write the full book.",
  },
  {
    title: "Edit",
    body: "I tighten the structure and wording.",
  },
  {
    title: "Cover and layout",
    body: "Cover design and interior formatting.",
  },
  {
    title: "Final check",
    body: "Proofreading before release.",
  },
  {
    title: "Publishing",
    body: "Amazon KDP setup, details, and launch steps. KDP is Amazon’s book-publishing service.",
  },
];

export const coverStyles = [
  "Minimalist",
  "Bold type",
  "Dark and moody",
  "Natural",
  "Tech",
  "Editorial",
];

export const plainSkills = [
  {
    title: "Writing",
    body: "eBooks, copywriting, and content writing.",
  },
  {
    title: "Websites",
    body: "HTML, CSS, JavaScript, TypeScript, React, and Next.js.",
  },
  {
    title: "AI and automation",
    body: "AI chatbots, prompt writing, Make.com, n8n, connections between apps, and Google Sheets automation.",
  },
  {
    title: "Content and media",
    body: "YouTube content, video editing, animation, and visual storytelling.",
  },
  {
    title: "Tools",
    body: "Python, Git, and GitHub.",
  },
];

// Editorial placeholders only: do not publish an unconfirmed price or promise.
export const contentConfirmations = [
  {
    id: "reply-time",
    placeholder: "{{CONFIRM: typical reply time}}",
    usedOn: ["Home", "Contact"],
    treatment: "No response-time promise is published.",
  },
  {
    id: "quote-policy",
    placeholder:
      "{{CONFIRM: whether you quote a price and timeline before starting}}",
    usedOn: ["Home"],
    treatment:
      "The process describes making a plan without inventing a quoting policy.",
  },
  {
    id: "starting-prices",
    placeholder: "{{CONFIRM: optional starting prices}}",
    usedOn: ["Home FAQ"],
    treatment: "No prices or suggested budget ranges are published.",
  },
  {
    id: "timelines",
    placeholder: "{{CONFIRM: typical project timelines}}",
    usedOn: ["Home FAQ"],
    treatment: "No days/weeks estimate is published.",
  },
];
