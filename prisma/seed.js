const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Luxury BFF Ecosystem database...");

  // 1. Roles
  const roles = [
    { name: "SUPER_ADMIN", description: "Full system administration and root controls" },
    { name: "ADMIN", description: "Platform management, user approvals, and operational oversight" },
    { name: "CONTENT_MANAGER", description: "CMS content, announcements, and editorial management" },
    { name: "MODERATOR", description: "Community forum moderation and standards enforcement" },
    { name: "PROJECT_MANAGER", description: "Workspace project lead and collaboration supervisor" },
    { name: "MEMBER", description: "Verified ecosystem member with access to community, academy, and events" },
    { name: "GUEST", description: "Public portal visitor" },
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: {},
      create: r,
    });
  }

  // 2. Default Super Admin User
  const hashedPassword = await bcrypt.hash("Admin@BFF2026!", 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@bff.com" },
    update: { passwordHash: hashedPassword },
    create: {
      email: "admin@bff.com",
      name: "BFF Executive Admin",
      passwordHash: hashedPassword,
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      isVerified: true,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      profile: {
        create: {
          headline: "Executive Director & Technology Architect @ BFF",
          bio: "Championing the BFF credo: Believe, Build, Become. Spearheading ecosystem architecture, luxury digital curation, and cross-border innovation networks.",
          location: "San Francisco / Global",
          company: "Brothers_Friends_Families Global",
          occupation: "Executive Director",
          pillarFocus: "ALL",
          membershipTier: "EXECUTIVE",
          memberCode: "BFF-GL-001",
          completionRate: 100,
          skills: "Leadership, Venture Building, Strategic Architecture, AI Transformation",
          interests: "Global Scaling, Technology Impact, Mindset Mastery, Youth Empowerment",
        },
      },
    },
  });

  // Assign user role
  const adminRole = await prisma.role.findUnique({ where: { name: "SUPER_ADMIN" } });
  if (adminRole) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: superAdmin.id, roleId: adminRole.id } },
      update: {},
      create: { userId: superAdmin.id, roleId: adminRole.id },
    });
  }

  // 3. Verified Fellows & Project Leads
  const demoUsers = [
    {
      email: "marcus.vance@bff.org",
      name: "Marcus Vance",
      role: "PROJECT_MANAGER",
      memberCode: "BFF-GL-002",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      headline: "Mindset Lead & High-Performance Executive Coach",
      bio: "Over 14 years empowering leaders, entrepreneurs, and high-growth founders to unlock peak human potential through disciplined mindset training.",
      location: "London, UK",
      company: "Vance Performance Lab",
      pillarFocus: "MINDSET",
      membershipTier: "FOUNDER",
      skills: "Executive Coaching, Behavioral Psychology, Habit Engineering, Public Speaking",
    },
    {
      email: "elena.rostova@bff.org",
      name: "Elena Rostova",
      role: "PROJECT_MANAGER",
      memberCode: "BFF-GL-003",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      headline: "Chief Solutions Architect & Systems Engineer",
      bio: "Cloud infrastructure architect and distributed systems pioneer. Passionate about applying modern software paradigms to solve real humanitarian and industrial bottlenecks.",
      location: "Berlin, Germany",
      company: "Nexus Systems Core",
      pillarFocus: "SOLUTIONS",
      membershipTier: "FELLOW",
      skills: "Distributed Systems, AI Infrastructure, Cloud Architecture, Scalable Databases",
    },
    {
      email: "david.chen@bff.org",
      name: "David Chen",
      role: "MEMBER",
      memberCode: "BFF-GL-004",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      headline: "Venture Partner & Angel Investor",
      bio: "Backing early-stage tech, clean-energy, and community-first startups. Co-founded two successful B2B SaaS companies.",
      location: "Singapore",
      company: "Apex Horizon Ventures",
      pillarFocus: "BUSINESS",
      membershipTier: "FOUNDER",
      skills: "Venture Capital, Seed Fundraising, GTM Strategy, Financial Modeling",
    },
    {
      email: "amara.okafor@bff.org",
      name: "Amara Okafor",
      role: "MODERATOR",
      memberCode: "BFF-GL-005",
      avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80",
      headline: "Global Social Impact Director & Education Reformer",
      bio: "Bridging the digital divide for underserved communities across 18 countries through open learning initiatives and grassroots mentorship pipelines.",
      location: "Nairobi, Kenya",
      company: "Horizon Impact Foundation",
      pillarFocus: "SOCIAL_IMPACT",
      membershipTier: "FELLOW",
      skills: "Non-Profit Strategy, Community Organizing, STEM Education, Grant Operations",
    },
    {
      email: "priya.sharma@bff.org",
      name: "Priya Sharma",
      role: "CONTENT_MANAGER",
      memberCode: "BFF-GL-006",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
      headline: "Editorial Director & Applied AI Researcher",
      bio: "Overseeing intellectual capital, publications, and curriculum across the BFF Academy.",
      location: "Bengaluru, India",
      company: "Synapse Intelligence",
      pillarFocus: "SOLUTIONS",
      membershipTier: "FELLOW",
      skills: "Editorial Publishing, Next.js, Python, LLM Orchestration",
    },
  ];

  const createdUserEntities = [];

  for (const du of demoUsers) {
    const userHashedPassword = await bcrypt.hash("Member@BFF2026!", 10);
    const u = await prisma.user.upsert({
      where: { email: du.email },
      update: {},
      create: {
        email: du.email,
        name: du.name,
        passwordHash: userHashedPassword,
        role: du.role,
        status: "ACTIVE",
        avatarUrl: du.avatarUrl,
        isVerified: true,
        profile: {
          create: {
            headline: du.headline,
            bio: du.bio,
            location: du.location,
            company: du.company,
            pillarFocus: du.pillarFocus,
            membershipTier: du.membershipTier,
            memberCode: du.memberCode,
            completionRate: 90,
            skills: du.skills,
            interests: "Innovation, Peer Mentorship, Global Networking",
          },
        },
      },
    });
    createdUserEntities.push(u);
  }

  // 4. Featured Curated Luxury Programs
  const luxuryPrograms = [
    {
      title: "The Sovereign Leadership Continuum",
      slug: "sovereign-leadership-continuum",
      pillar: "MINDSET",
      summary: "An intensive executive accelerator combining behavioral psychology, cognitive priming, and stress resilience for high-growth operators.",
      description: "Designed for chief executives, founders, and community stewards who navigate extreme volatility. Includes private advisory with master coaches, biometric flow tracking, and executive retreats.",
      duration: "10 Weeks",
      cohort: "Quarterly • 25 Fellows",
      status: "ACTIVE",
      isFeatured: true,
      bannerUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "Planetary Systems & Applied AI Architecture",
      slug: "planetary-systems-applied-ai",
      pillar: "SOLUTIONS",
      summary: "Enterprise engineering sprint architecting resilient multi-agent orchestration, cryptographic privacy, and cloud infrastructure.",
      description: "Hands-on collaborative architecture program taking technical fellows from concept to production-deployed multi-region software.",
      duration: "12 Weeks",
      cohort: "Bi-Annual • 30 Architects",
      status: "ACTIVE",
      isFeatured: true,
      bannerUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "Venture Deal Room & Angel Syndicate Guild",
      slug: "venture-deal-room-angel-guild",
      pillar: "BUSINESS",
      summary: "Curated deal matchmaking connecting capital-efficient founders with accredited family offices and strategic angels.",
      description: "Master the art of founder governance, unit economic defense, cap table architecture, and cross-border commercial pilot negotiations.",
      duration: "8 Weeks",
      cohort: "Monthly Deal Rooms",
      status: "ACTIVE",
      isFeatured: true,
      bannerUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "Verifiable Humanitarian Telemetry & Water Grid",
      slug: "verifiable-humanitarian-telemetry",
      pillar: "SOCIAL_IMPACT",
      summary: "Deploying solar and IoT telemetry sensor networks delivering clean water accountability to underserved clinical hubs.",
      description: "Grassroots engineering deploying durable telemetry nodes with real-time public open-ledger streaming across four continents.",
      duration: "Continuous",
      cohort: "Year-Round Field Action",
      status: "ACTIVE",
      isFeatured: true,
      bannerUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80",
    },
  ];

  for (const prog of luxuryPrograms) {
    await prisma.program.upsert({
      where: { slug: prog.slug },
      update: {},
      create: prog,
    });
  }

  // 5. BFF Academy Courses
  const academyCourses = [
    {
      title: "Mastering Cognitive Resilience Under Capital Pressure",
      slug: "mastering-cognitive-resilience",
      pillar: "MINDSET",
      category: "Executive Performance",
      description: "Scientific methodologies for emotional stabilization, high-stakes decision making, and cognitive endurance during rapid venture expansion.",
      duration: "6 Master Sessions",
      level: "Executive",
      mentorName: "Marcus Vance",
      mentorBio: "Executive Performance Director @ BFF Vance Lab",
      mentorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      isPublished: true,
    },
    {
      title: "Enterprise Multi-Agent LLM Orchestration & Security",
      slug: "enterprise-multi-agent-orchestration",
      pillar: "SOLUTIONS",
      category: "Artificial Intelligence",
      description: "Architecting autonomous reasoning workflows, deterministic safety rails, and sovereign vector stores with zero data leakage.",
      duration: "8 Technical Labs",
      level: "Advanced",
      mentorName: "Dr. Elena Rostova",
      mentorBio: "Chief Systems Architect @ Nexus Core",
      mentorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      isPublished: true,
    },
    {
      title: "Early-Stage Term Sheet Architecture & Cap Table Defense",
      slug: "term-sheet-architecture-cap-table",
      pillar: "BUSINESS",
      category: "Venture Finance",
      description: "Navigating liquidation preferences, anti-dilution covenants, investor information rights, and founder-aligned governance.",
      duration: "5 Intensive Clinics",
      level: "Founders",
      mentorName: "David Chen",
      mentorBio: "Venture Partner @ Apex Horizon",
      mentorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      isPublished: true,
    },
    {
      title: "Grassroots Telemetry & Autonomous Community Governance",
      slug: "grassroots-telemetry-community-governance",
      pillar: "SOCIAL_IMPACT",
      category: "Civic Engineering",
      description: "Installing low-power telemetry sensors and training local community members to manage civic infrastructure autonomously.",
      duration: "4 Field Modules",
      level: "Practitioners",
      mentorName: "Amara Okafor",
      mentorBio: "Social Impact Director @ Horizon Impact",
      mentorAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=80",
      isPublished: true,
    },
  ];

  for (const c of academyCourses) {
    const course = await prisma.academyCourse.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });

    // Enroll admin into course
    await prisma.academyEnrollment.upsert({
      where: { courseId_userId: { courseId: course.id, userId: superAdmin.id } },
      update: {},
      create: {
        courseId: course.id,
        userId: superAdmin.id,
        progressPercentage: 50,
        status: "IN_PROGRESS",
      },
    });
  }

  // 6. Community Groups
  const communityGroups = [
    {
      name: "Mindset & Executive Fortitude",
      slug: "mindset-leadership",
      pillar: "MINDSET",
      description: "Dedicated to personal breakthrough, psychological resilience, executive coaching, and sustainable habit development.",
      memberCount: 420,
    },
    {
      name: "Engineering & Applied Solutions",
      slug: "engineering-solutions",
      pillar: "SOLUTIONS",
      description: "Deep technical exchanges on AI systems, scalable infrastructure, web applications, and hardware-software integration.",
      memberCount: 380,
    },
    {
      name: "Founders & Venture Guild",
      slug: "founders-venture-guild",
      pillar: "BUSINESS",
      description: "Where founders, angel investors, operators, and growth leaders discuss deals, unit economics, and go-to-market strategies.",
      memberCount: 512,
    },
    {
      name: "Global Social Impact Alliance",
      slug: "social-impact-alliance",
      pillar: "SOCIAL_IMPACT",
      description: "Collaborative action for sustainable development, clean water, tech education in emerging economies, and community resilience.",
      memberCount: 295,
    },
  ];

  for (const g of communityGroups) {
    await prisma.communityGroup.upsert({
      where: { slug: g.slug },
      update: {},
      create: g,
    });
  }

  // 7. Signature Projects Across Pillars
  const projects = [
    {
      title: "Nexus Core: Sovereign Identity Mesh",
      slug: "nexus-core-sovereign-identity",
      summary: "A high-performance cryptographic identity protocol empowering community members with decentralized data sovereignty.",
      description: "Nexus Core solves the fragmentation of digital credentials across disparate institutions. Designed with zero-knowledge proofs and modern cryptographic primitives.",
      pillar: "SOLUTIONS",
      category: "Cybersecurity & Web3",
      status: "IN_PROGRESS",
      progressPercentage: 68,
      featured: true,
      ownerId: createdUserEntities[1]?.id || superAdmin.id,
      repositoryUrl: "https://github.com/bff-ecosystem/nexus-core",
      liveUrl: "https://nexus-demo.bff-ecosystem.org",
      budget: "$85,000",
    },
    {
      title: "BFF Global Mindset Academy & Peer Mentorship Platform",
      slug: "bff-mindset-academy",
      summary: "Interactive digital incubator providing structured mental conditioning, goal engineering, and master mentor pairing.",
      description: "Equipping young professionals and community leaders with the emotional agility and strategic thinking necessary to tackle systemic challenges.",
      pillar: "MINDSET",
      category: "Education & Coaching",
      status: "APPROVED",
      progressPercentage: 45,
      featured: true,
      ownerId: createdUserEntities[0]?.id || superAdmin.id,
      budget: "$50,000",
    },
    {
      title: "Synergy Ventures: Cross-Border Founder Seed Incubator",
      slug: "synergy-ventures-incubator",
      summary: "Cohort-based venture preparation engine matching bootstrapped innovators with pre-seed capital and corporate pilot programs.",
      description: "Connecting grassroots entrepreneurial talent across emerging markets with global capital allocators, technical co-founders, and legal advisory networks.",
      pillar: "BUSINESS",
      category: "Venture Building",
      status: "IN_PROGRESS",
      progressPercentage: 82,
      featured: true,
      ownerId: createdUserEntities[2]?.id || superAdmin.id,
      budget: "$120,000",
    },
    {
      title: "AquaFlow Clean Water Autonomous Sensor Grid",
      slug: "aquaflow-clean-water-grid",
      summary: "Solar-powered IoT sensors monitoring drinking water quality and flow pressure across 34 rural community clinics.",
      description: "A grassroots social engineering project utilizing low-power LoRaWAN telemetry to detect micro-contaminants in municipal wells in real time.",
      pillar: "SOCIAL_IMPACT",
      category: "Humanitarian Tech",
      status: "COMPLETED",
      progressPercentage: 100,
      featured: true,
      ownerId: createdUserEntities[3]?.id || superAdmin.id,
      budget: "$40,000",
    },
  ];

  for (const p of projects) {
    const proj = await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });

    const ms1 = await prisma.projectMilestone.create({
      data: {
        projectId: proj.id,
        title: "Phase 1: Architecture & Technical Validation",
        description: "Core specifications, stakeholder interviews, and initial security audits.",
        status: "COMPLETED",
        order: 1,
      },
    });

    const ms2 = await prisma.projectMilestone.create({
      data: {
        projectId: proj.id,
        title: "Phase 2: Alpha Rollout & Pilot Testing",
        description: "Deploying to closed user group and stress testing edge scenarios.",
        status: p.status === "COMPLETED" ? "COMPLETED" : "IN_PROGRESS",
        order: 2,
      },
    });

    await prisma.projectTask.createMany({
      data: [
        {
          projectId: proj.id,
          milestoneId: ms1.id,
          title: "Complete protocol security specification",
          priority: "HIGH",
          status: "DONE",
          assigneeId: superAdmin.id,
        },
        {
          projectId: proj.id,
          milestoneId: ms2.id,
          title: "Integrate telemetry logging and edge fallbacks",
          priority: "MEDIUM",
          status: p.status === "COMPLETED" ? "DONE" : "IN_PROGRESS",
          assigneeId: createdUserEntities[4]?.id || superAdmin.id,
        },
      ],
    });
  }

  // 8. Upcoming & Completed Events
  const now = new Date();
  const events = [
    {
      title: "BFF Global Leadership & Mindset Summit 2026",
      slug: "bff-global-leadership-summit-2026",
      pillar: "MINDSET",
      category: "Summit",
      description: "Join international thought leaders, executive coaches, and high-performance strategists for a transformative multi-day conference on vision mastery, resilience, and personal expansion.",
      locationType: "HYBRID",
      venue: "Grand Horizon Center, San Francisco & Live Stream",
      meetingLink: "https://bff-ecosystem.org/live/summit2026",
      startDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 16 * 24 * 60 * 60 * 1000),
      capacity: 500,
      registeredCount: 184,
      status: "UPCOMING",
      isFeatured: true,
      bannerUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "Applied AI & Solutions Hackathon: Tech for Good",
      slug: "applied-ai-solutions-hackathon",
      pillar: "SOLUTIONS",
      category: "Hackathon",
      description: "A 48-hour collaborative engineering sprint solving mission-critical bottlenecks in healthcare accessibility, renewable power management, and educational equity.",
      locationType: "ONLINE",
      meetingLink: "https://meet.bff-ecosystem.org/hackathon-2026",
      startDate: new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      capacity: 350,
      registeredCount: 142,
      status: "UPCOMING",
      isFeatured: true,
      bannerUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "Venture Capital & Angel Investor Matchmaking Evening",
      slug: "venture-capital-matchmaking-evening",
      pillar: "BUSINESS",
      category: "Networking",
      description: "Exclusive curated pitch sessions and deal rooms connecting high-growth startups with vetted angel syndicates and institutional investors.",
      locationType: "IN_PERSON",
      venue: "The Penthouse, Marina Bay Financial Tower, Singapore",
      startDate: new Date(now.getTime() + 42 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 42 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000),
      capacity: 120,
      registeredCount: 96,
      status: "UPCOMING",
      isFeatured: false,
      bannerUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "Community Social Action & Clean River Restoration Drive",
      slug: "social-action-clean-river-drive",
      pillar: "SOCIAL_IMPACT",
      category: "Community Action",
      description: "Hands-on environmental restoration, telemetry sensor installation, and educational outreach for 400 local families.",
      locationType: "IN_PERSON",
      venue: "Riverside Eco Sanctuary, Nairobi",
      startDate: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() - 19 * 24 * 60 * 60 * 1000),
      capacity: 250,
      registeredCount: 248,
      status: "COMPLETED",
      isFeatured: false,
      bannerUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80",
    },
  ];

  for (const ev of events) {
    const createdEvent = await prisma.event.upsert({
      where: { slug: ev.slug },
      update: {},
      create: ev,
    });

    await prisma.eventRegistration.upsert({
      where: {
        eventId_userId: {
          eventId: createdEvent.id,
          userId: superAdmin.id,
        },
      },
      update: {},
      create: {
        eventId: createdEvent.id,
        userId: superAdmin.id,
        status: "CONFIRMED",
      },
    });
  }

  // 9. Digital Membership Certificate for Admin
  await prisma.certificate.upsert({
    where: { code: "BFF-CERT-2026-001" },
    update: {},
    create: {
      code: "BFF-CERT-2026-001",
      title: "Executive Fellowship & Systems Architecture Charter",
      recipientName: "BFF Executive Admin",
      recipientEmail: "admin@bff.com",
      userId: superAdmin.id,
      verificationUrl: "https://verify.bff-ecosystem.org/cert/BFF-CERT-2026-001",
      status: "ACTIVE",
    },
  });

  // 10. System Settings
  const defaultSettings = [
    { key: "SITE_NAME", value: "Brothers_Friends_Families", description: "Platform official corporate name", isPublic: true },
    { key: "BRAND_TAGLINE", value: "BELIEVE. BUILD. BECOME.", description: "Brand official motto", isPublic: true },
    { key: "HERO_SUBTITLE", value: "Bringing People, Ideas and Opportunities Together.", description: "Cinematic hero supporting statement", isPublic: true },
    { key: "HERO_DESCRIPTION", value: "Brothers_Friends_Families is a collaborative ecosystem built around mindset, innovative solutions, business opportunities and meaningful social impact.", description: "Cinematic hero mission narrative", isPublic: true },
    { key: "CONTACT_EMAIL", value: "concierge@bff-ecosystem.org", description: "Public corporate inquiries desk", isPublic: true },
    { key: "ENABLE_MEMBERSHIP_REGISTRATION", value: "true", description: "Allow public membership admissions", isPublic: true },
    { key: "MAINTENANCE_MODE", value: "false", description: "Global maintenance mode flag", isPublic: true },
  ];

  for (const s of defaultSettings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  // 11. Initial Audit Log
  await prisma.auditLog.create({
    data: {
      userId: superAdmin.id,
      userEmail: superAdmin.email,
      action: "LUXURY_PLATFORM_INITIALIZED",
      module: "SYSTEM",
      details: "BFF luxury digital ecosystem initialized with full 4 pillars, academy curricula, and executive governance.",
    },
  });

  console.log("Luxury BFF Ecosystem database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
