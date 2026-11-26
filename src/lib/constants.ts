export const BRAND = {
  name: "Brothers_Friends_Families",
  shortName: "BFF",
  tagline: "BELIEVE. BUILD. BECOME.",
  description: "A premier international digital business ecosystem combining corporate innovation, an elite member network, project collaboration, and systemic social impact.",
  email: "contact@bff-ecosystem.org",
  phone: "+1 (800) 829-4233",
  address: "International Technology District, Global Operations Hub",
};

export const PILLARS = [
  {
    id: "mindset",
    name: "Mindset",
    tagline: "Unleash Human Potential & Internal Fortitude",
    href: "/pillars/mindset",
    color: "from-purple-500 to-indigo-600",
    accent: "#8B5CF6",
    summary: "Personal breakthrough, executive mental conditioning, leadership resilience, and habit architecture.",
    features: [
      "Executive Mental Conditioning & Resilience Protocols",
      "One-on-One Master Mentorship Pairings",
      "Habit Engineering & Cognitive Peak Performance",
      "Interactive Breakthrough Masterclasses",
    ],
  },
  {
    id: "solutions",
    name: "Solutions",
    tagline: "Architect Cutting-Edge Digital & Industrial Infrastructure",
    href: "/pillars/solutions",
    color: "from-cyan-500 to-blue-600",
    accent: "#06B6D4",
    summary: "Systemic problem-solving, modern cloud software, artificial intelligence, and digital transformation.",
    features: [
      "Enterprise Cloud & Distributed Systems Architecture",
      "Applied AI & Autonomous Agent Pipelines",
      "Cybersecurity, Cryptography & Data Sovereignty",
      "Open-Source Collaborative Engineering",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "Catalyze Sustainable Ventures & Economic Prosperity",
    href: "/pillars/business",
    color: "from-blue-600 to-indigo-700",
    accent: "#2563EB",
    summary: "Venture incubation, angel matchmaking, B2B dealmaking, and cross-border commercial acceleration.",
    features: [
      "Curated Pre-Seed & Angel Syndicate Deal Rooms",
      "Cross-Border Commercial Partnerships",
      "Founder GTM & Unit Economics Advisory",
      "Strategic Enterprise Pilot Matchmaking",
    ],
  },
  {
    id: "social-impact",
    name: "Social Impact",
    tagline: "Deliver Verifiable Grassroots Transformation",
    href: "/pillars/social-impact",
    color: "from-emerald-500 to-teal-600",
    accent: "#10B981",
    summary: "Community empowerment, technology education, clean water initiatives, and sustainable development.",
    features: [
      "Transparent Real-Time IoT Impact Telemetry",
      "Global STEM & Leadership Fellowships",
      "Clean Water & Renewable Rural Infrastructure",
      "Grassroots Community Leadership Incubation",
    ],
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Pillars",
    href: "#",
    children: [
      { label: "Mindset", href: "/pillars/mindset", desc: "Personal & Leadership Mastery" },
      { label: "Solutions", href: "/pillars/solutions", desc: "Technology & Infrastructure" },
      { label: "Business", href: "/pillars/business", desc: "Ventures & Partnerships" },
      { label: "Social Impact", href: "/pillars/social-impact", desc: "Grassroots Transformation" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MODERATOR: "MODERATOR",
  PROJECT_MANAGER: "PROJECT_MANAGER",
  MEMBER: "MEMBER",
  GUEST: "GUEST",
} as const;

