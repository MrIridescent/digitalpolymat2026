/**
 * Single source of truth for David's public identity.
 *
 * Facts were cross-checked against:
 *  - linkedin.com/in/mriridescent
 *  - github.com/MrIridescent (41 public repositories, 34 original plus 7 forks,
 *    checked Nov 2026 — only the original repositories are represented)
 *  - orcid.org/0000-0002-6340-2782
 *  - Cisco Networking Academy / Credly public badges
 *  - the site's existing résumé, old portfolio, and supplied manifesto
 *
 * When a claim is uncertain, keep it qualitative rather than inventing a number.
 */

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mriridescent.africa',
  name: 'David Akpoviroro Oke',
  shortName: 'David Akpoviroro Oke',
  alias: 'Mr Iridescent',
  persona: 'The Creative Renaissance Man',
  positioning: 'Growth partner · Digital product architect',
  motto: 'Boundless Creativity Unleashed',
  role: 'Growth Partner & Digital Product Delivery Architect',
  roleLong:
    'Growth Hacker & Growth Partner · PR & Reputation Strategist · Digital Product Delivery Architect · Polymath Coder · Creative Director',
  location: 'Lagos, Nigeria',
  origin: 'Delta State, Nigeria',
  availability:
    'Open to growth partnerships, reputation mandates, and selected product builds',
  phone: '+234 904 125 8180',
  phoneE164: '2349041258180',
  email: 'me@mriridescent.africa',
  emailHref: 'mailto:me@mriridescent.africa',
  whatsapp: {
    number: '2349041258180',
    display: '+234 904 125 8180',
    defaultMessage:
      'Hi David — I found you through mriridescent.africa and would like to talk about a project.',
  },
  tagline: 'I find the angle, grow the brand, and build the product that proves it.',
  description:
    'David Akpoviroro Oke (Mr Iridescent) is a Lagos-based growth hacker, growth partner, public-relations and reputation strategist, and digital product delivery architect. He helps individuals, brands, and companies break into new networks and markets, protect the public record, and ship the products and stories that make the growth hold.',
} as const

/**
 * The header and footer brand mark.
 *
 * To change the logo, replace the file at `src` with a square PNG (512 × 512
 * recommended, 256 × 256 minimum). The artwork is displayed inside a circular
 * ivory plate at 32 px on mobile and 36 px in the header, and at 40 px in the
 * footer. Keep the important detail inside the central 80% so the circle crop
 * and the plate padding never clip it. Updating this one path changes both
 * placements; favicons are generated separately with `npm run generate:favicon`.
 */
export const brandMark = {
  src: '/media/brand/mr-iridescent-mark.png',
  width: 512,
  height: 512,
  headerSize: { mobile: 32, desktop: 36 },
  footerSize: 40,
} as const

export function whatsappLink(message: string = site.whatsapp.defaultMessage) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export const socials = [
  { label: 'GitHub', handle: '@MrIridescent', href: 'https://github.com/MrIridescent' },
  { label: 'LinkedIn', handle: 'in/mriridescent', href: 'https://www.linkedin.com/in/mriridescent' },
  { label: 'Linktree', handle: 'mriridescent_', href: 'https://linktr.ee/mriridescent_' },
  { label: 'X', handle: '@mriridescent_', href: 'https://x.com/mriridescent_' },
  { label: 'Instagram', handle: '@mriridescent', href: 'https://instagram.com/mriridescent' },
  { label: 'Threads', handle: '@mriridescent', href: 'https://www.threads.com/@mriridescent' },
  { label: 'ORCID', handle: '0000-0002-6340-2782', href: 'https://orcid.org/0000-0002-6340-2782' },
  { label: 'Medium', handle: '@iammriridescent', href: 'https://medium.com/@iammriridescent' },
] as const

export const languages = [
  {
    name: 'English',
    level: 'Professional',
    note: 'The working language for engineering, writing, delivery, and client communication.',
    code: 'en',
  },
  {
    name: 'French',
    level: 'Conversational',
    note: 'Conversational French for Francophone West African contexts.',
    code: 'fr',
  },
  {
    name: 'Yoruba',
    level: 'Conversational',
    note: 'Everyday conversation, humour, and cultural context.',
    code: 'yo',
  },
  {
    name: 'Hausa',
    level: 'Basic',
    note: 'Less than conversational — working basics, still learning.',
    code: 'ha',
  },
  {
    name: 'Urhobo',
    level: 'Basic',
    note: 'Less than conversational — family and community understanding.',
    code: 'urh',
  },
  {
    name: 'Okpe',
    level: 'Basic',
    note: 'Less than conversational — heritage language, actively learning.',
    code: 'okp',
  },
] as const

export const currentRoles = [
  {
    title: 'Founder, Growth Partner & Digital Product Delivery Architect',
    org: 'Iridescent Internet Solutions Limited',
    note:
      'Growth hacking, reputation strategy, creative direction, and product delivery for individuals, brands, and companies.',
  },
  {
    title: 'Founder & Chair, Board of Trustees',
    org: 'FEPAR.africa',
    note: 'Festac PanAfrican Renaissance Initiatives and/or diaspora foundations, under the brand FEPAR.africa.',
  },
] as const

/** Roles that have ended. Kept visible for an honest timeline, clearly marked. */
export const pastRoles = [
  {
    title: 'Full Stack Engineer',
    org: 'Zandbox',
    period: '2025',
    note: 'Delivered fintech product work for a global user base. The engagement has concluded.',
  },
  {
    title: 'Growth Partner',
    org: 'Helpman Analytics and Insights Limited',
    period: '2024 — 2025',
    note: 'Data, analytics, and growth partnerships for ambitious teams. Contract completed.',
  },
] as const

export const stats = [
  { value: '20+', label: 'years turning problems into shipped work' },
  { value: '34', label: 'repositories I authored on GitHub' },
  { value: '6', label: 'Cisco course badges & credentials' },
  { value: '6', label: 'languages spoken, at six levels' },
] as const

export const hero = {
  eyebrow:
    'Lagos, Nigeria · Growth hacker · Product architect · Creative director · Working worldwide',
  headline: 'I find the angle. I build the growth.',
  body:
    'I am David Akpoviroro Oke — Mr Iridescent, the Creative Renaissance Man. A growth partner to individuals, brands, and companies: I find the unfair angle, shape the reputation, direct the story, and build the digital product that makes the promise real. Twenty years across code, campaigns, cameras, and culture — from Lagos, for anywhere.',
  primaryCta: { label: 'Explore the growth room', href: '/growth' },
  secondaryCta: { label: 'Download résumé', href: '/documents/David-Oke-Resume-2026.pdf' },
  tertiaryCta: { label: 'Start a conversation', href: '/contact' },
  languageLine:
    'English (professional) · French & Yoruba (conversational) · basic Hausa, Urhobo, Okpe',
} as const

export type ServiceIcon =
  | 'compass'
  | 'code'
  | 'workflow'
  | 'growth'
  | 'shield'
  | 'sparkles'

export type Service = {
  slug: string
  name: string
  kicker: string
  summary: string
  outcomes: readonly string[]
  deliverables: readonly string[]
  engagement: string
  icon: ServiceIcon
  /** Optional dedicated page for a service. */
  href?: string
}

export const services: readonly Service[] = [
  {
    slug: 'growth-hacking',
    name: 'Growth hacking & market entry',
    kicker: 'Outside the room → inside the market',
    summary:
      'A growth partner for individuals, brands, and companies that need to enter a new network, market, or audience without a big agency budget. I find the wedge, build the narrative, and engineer the first repeatable pipeline.',
    outcomes: [
      'A clear, ownable position in the new market',
      'A route into the rooms that matter',
      'Content and referrals that compound',
      'A scorecard that tells the truth about what works',
    ],
    deliverables: [
      'Growth audit',
      'Market wedge map',
      'Positioning & offer',
      'Channel experiments',
      'Referral system',
      'Pipeline scorecard',
    ],
    engagement: 'Growth sprint · Monthly partnership',
    icon: 'growth',
  },
  {
    slug: 'reputation-pr',
    name: 'Public relations & reputation management',
    kicker: 'Public record → earned trust',
    summary:
      'Reputation is an asset with a maintenance cost. I shape the story, place it with the right media and communities, prepare the response before the bad day, and manage the search results people actually see.',
    outcomes: [
      'A public narrative people repeat correctly',
      'Relationships with the right media and communities',
      'A crisis playbook before the crisis',
      'A search footprint that reflects the work',
    ],
    deliverables: [
      'Narrative platform',
      'Media & community map',
      'Press materials',
      'Reputation monitoring',
      'Crisis playbook',
      'Executive voice',
    ],
    engagement: 'Monthly retainer · Crisis sprint',
    icon: 'shield',
  },
  {
    slug: 'content-studio',
    name: 'Content studio & creative direction',
    kicker: 'Concept → camera → cut',
    summary:
      'Film, photography, copy, and campaign systems made by one director who also writes and edits. The story stays coherent because it never leaves the same pair of hands — from the first idea to the final cut.',
    outcomes: [
      'A campaign idea worth watching',
      'Video and photography that feel directed, not assembled',
      'Copy that sounds like a person',
      'A content system the team can keep feeding',
    ],
    deliverables: [
      'Creative concept',
      'Script & copy',
      'Direction & shoot',
      'Edit & grade',
      'Campaign assets',
    ],
    engagement: 'Campaign sprint · Content retainer',
    icon: 'sparkles',
  },
  {
    slug: 'fractional-cto',
    name: 'Fractional CTO & systems partnership',
    kicker: 'Technical ownership → business outcomes',
    summary:
      'A senior technical owner for founders and growing businesses: architecture, vendor decisions, security, and delivery governance on a monthly retainer — without a full-time CTO salary.',
    outcomes: [
      'One accountable owner for technical strategy',
      'A 30-60-90 day plan tied to business outcomes',
      'Build-versus-buy and vendor decisions de-risked',
      'Targeted microservices instead of agency bloat',
    ],
    deliverables: [
      'Architecture audit',
      '30-60-90 day blueprint',
      'Vendor & spend review',
      'Delivery governance',
      'Microservice deployment',
    ],
    engagement: 'Monthly retainer · Fractional CTO',
    icon: 'compass',
    href: '/services/fractional-cto',
  },
  {
    slug: 'delivery-architecture',
    name: 'Digital product delivery architecture',
    kicker: 'Strategy → buildable system',
    summary:
      'Turn an ambitious business idea into a sequenced, buildable product system — with the architecture, decisions, and delivery rhythm to actually ship it.',
    outcomes: [
      'A clear product and technical architecture',
      'A delivery roadmap your team can execute',
      'Build-versus-buy and platform decisions',
      'Risk, security, and operational models',
    ],
    deliverables: [
      'Architecture map',
      'Delivery roadmap',
      'Decision record',
      'Team operating model',
      'Risk register',
    ],
    engagement: 'Advisory sprint · Fractional architect',
    icon: 'compass',
  },
  {
    slug: 'custom-software',
    name: 'Custom software development',
    kicker: 'Design → production',
    summary:
      'Web platforms, internal tools, APIs, fintech products, and AI-enabled features built end to end — with security and maintainability designed in from the first commit.',
    outcomes: [
      'A working product in real users’ hands',
      'A codebase your team can own',
      'Secure, tested, documented delivery',
      'A path from prototype to production',
    ],
    deliverables: [
      'Product build',
      'API & data layer',
      'Test suite',
      'Documentation',
      'Handover',
    ],
    engagement: 'Fixed-scope build · Dedicated squad',
    icon: 'code',
  },
  {
    slug: 'workflow-automation',
    name: 'Workflow automation & AI enablement',
    kicker: 'Repetition → leverage',
    summary:
      'Map the work that eats your week, then automate it with integrations, agents, and human-in-the-loop systems that your team can trust and inspect.',
    outcomes: [
      'Hours returned to the team every week',
      'Fewer manual handoff errors',
      'AI used where it measurably helps',
      'Automations that can be audited',
    ],
    deliverables: [
      'Workflow audit',
      'Automation architecture',
      'Agent & integration build',
      'Runbook',
      'Team training',
    ],
    engagement: 'Automation audit · Build & handover',
    icon: 'workflow',
  },
  {
    slug: 'security-devsecops',
    name: 'Security & DevSecOps',
    kicker: 'Threat model → hardened release',
    summary:
      'Security engineering that starts in the first design conversation: threat modelling, secure pipelines, vulnerability remediation, and cyber readiness for small teams.',
    outcomes: [
      'A threat model the whole team understands',
      'Security checks inside the pipeline',
      'A prioritised remediation plan',
      'Incident readiness, not incident panic',
    ],
    deliverables: [
      'Threat model',
      'Pipeline assessment',
      'Remediation plan',
      'Security runbook',
      'Team enablement',
    ],
    engagement: 'Assessment · Retainer',
    icon: 'shield',
  },
  {
    slug: 'creative-brand-systems',
    name: 'Brand systems & art direction',
    kicker: 'Identity → cultural weight',
    summary:
      'Identity, interface, motion, and story treated as one system — with a collector’s eye for the art, references, and cultural details that make a brand feel inevitable rather than assembled.',
    outcomes: [
      'A coherent visual and verbal identity',
      'A design system that scales',
      'A site or product experience with craft',
      'A visual world with real cultural references',
    ],
    deliverables: [
      'Brand direction',
      'Design system',
      'Art direction',
      'Motion language',
      'Web experience',
      'Asset library',
    ],
    engagement: 'Brand sprint · Retainer',
    icon: 'sparkles',
  },
] as const

export const capabilities = [
  {
    title: 'Growth hacking & market entry',
    summary:
      'Finding the wedge that lets a person, brand, or company enter a room it was not invited to.',
    items: [
      'Growth strategy',
      'Market entry',
      'Positioning',
      'Offer design',
      'Network expansion',
      'Referral systems',
      'Channel experiments',
      'Analytics',
    ],
  },
  {
    title: 'Public relations & reputation',
    summary:
      'The public record, treated like an asset: shaped, placed, monitored, and defended.',
    items: [
      'PR strategy',
      'Media relations',
      'Reputation management',
      'Crisis readiness',
      'Search reputation',
      'Executive voice',
      'Community trust',
      'Press materials',
    ],
  },
  {
    title: 'Delivery architecture',
    summary: 'Turning ambition into a sequenced, buildable, governable product system.',
    items: [
      'Product strategy',
      'Solution architecture',
      'Delivery roadmaps',
      'Team operating models',
      'Technical due diligence',
      'Stakeholder alignment',
    ],
  },
  {
    title: 'Polymath product engineering',
    summary:
      'Full-stack products that survive real users, real traffic, and real deadlines — across many languages.',
    items: [
      'TypeScript',
      'React / Next.js',
      'Node.js',
      'Rust',
      'Java',
      'Python',
      'PHP',
      'PostgreSQL',
      'REST / GraphQL',
    ],
  },
  {
    title: 'AI & automation',
    summary:
      'Applied AI that ships: agents, retrieval, machine learning, neural networks, and workflow automation.',
    items: [
      'Python',
      'PyTorch',
      'Machine learning',
      'Neural networks',
      'spaCy',
      'LangChain / CrewAI',
      'RAG',
      'MCP',
      'Agentic workflows',
      'YOLOv8',
    ],
  },
  {
    title: 'Security engineering',
    summary: 'Security as a default, not a phase at the end of the roadmap.',
    items: ['Threat detection', 'DevSecOps', 'SAST / DAST', 'Cloud security', 'Vulnerability remediation', 'CyberOps'],
  },
  {
    title: 'Content, film & direction',
    summary:
      'The story that carries the growth — written, shot, cut, and directed by the same person.',
    items: [
      'Directing',
      'Cinematography',
      'Video editing',
      'Scriptwriting',
      'Copywriting',
      'Photography',
      'Motion',
      'Sound & rhythm',
    ],
  },
  {
    title: 'Design, art & aesthetics',
    summary:
      'An eye trained across interface, image, space, and art — the difference between something that works and something that moves people.',
    items: [
      'UI / UX',
      'Art direction',
      'Typography',
      'Design systems',
      'Art appreciation',
      'Curatorial study',
      'Spatial composition',
      'Aesthetic direction',
    ],
  },
] as const

/**
 * Nine ways of seeing, written as capacities rather than labels.
 *
 * They deliberately do not name any theory of intelligence. Each lens is
 * evidenced by a practice: words, systems, images, movement, sound, people,
 * judgement, place, and meaning.
 */
export const lenses = [
  {
    name: 'Language',
    line: 'Words are the first interface.',
    practice:
      'Six languages, a public journal, scripts, press notes, and offers written so a stranger understands the value in one read.',
  },
  {
    name: 'Logic',
    line: 'The structure under the story.',
    practice:
      'Architecture diagrams, type systems, threat models, and code that has to survive real users.',
  },
  {
    name: 'Image',
    line: 'The frame before the sentence.',
    practice:
      'Brand systems, layouts, photography, and art direction built around one strong visual idea.',
  },
  {
    name: 'Movement',
    line: 'Timing is its own intelligence.',
    practice:
      'Shooting, directing scenes, cutting video, and storyboarding movement — including dance — into rhythm.',
  },
  {
    name: 'Sound',
    line: 'The ear behind the edit.',
    practice:
      'Voice, pacing, music cues, and spoken delivery tuned so the message lands before it is explained.',
  },
  {
    name: 'People',
    line: 'Growth is a relationship at scale.',
    practice:
      'Partnerships, PR, negotiation, referral networks, and rooms where being useful matters more than being loud.',
  },
  {
    name: 'Self',
    line: 'Taste is a discipline.',
    practice:
      'Knowing which problem is worth solving, when to say no, and how to stay clear while the brief changes.',
  },
  {
    name: 'Place',
    line: 'Everything is local before it is global.',
    practice:
      'Lagos, roads, climate, civic systems, and the cultural context that makes an idea believable.',
  },
  {
    name: 'Meaning',
    line: 'The long horizon.',
    practice:
      'Art, philosophy, curation, and the question of what a brand — or a life — is actually for.',
  },
] as const

/** How the growth work is reasoned, not just executed. */
export const growthThinking = [
  {
    title: 'Abstract first, tactical second',
    body:
      'Most briefs describe a tactic. I look for the underlying pattern — what the brand is really selling, who already holds the room, and which assumption is doing all the work. The abstract map is what makes the first move obvious.',
  },
  {
    title: 'Diverge before deciding',
    body:
      'I generate several genuinely different routes before choosing one: a network play, a narrative play, a product wedge, a partnership, a cultural intervention. The first idea is rarely the best one; it is just the loudest.',
  },
  {
    title: 'Constraint is material',
    body:
      'A small budget, a new market, a sceptical audience, or a damaged reputation is not a reason to lower ambition. It is the shape of the solution. The constraint tells you where the leverage is.',
  },
  {
    title: 'Narrative is infrastructure',
    body:
      'People do not buy the product first; they buy the explanation. Reputation, story, and proof are load-bearing systems, not decoration added after the build.',
  },
  {
    title: 'Taste is an advantage',
    body:
      'In a market of sameness, judgement is the differentiator. An eye trained on art, film, design, and culture can make a small brand feel inevitable and a large brand feel human again.',
  },
] as const

/**
 * Research and learning interests beyond the day job. These are stated as
 * interests, not as delivered services, so the record stays honest.
 */
export const interests = [
  {
    title: 'Applied sciences',
    body:
      'Physics, materials, and the applied science behind the tools we use. I follow the research and try to understand the mechanism, not just the API.',
    tags: ['Applied physics', 'Materials', 'Sensing', 'Research literacy'],
  },
  {
    title: 'Mechatronics',
    body:
      'The seam where mechanical systems, electronics, and software meet. Motors, sensors, control loops, and the firmware that keeps them honest.',
    tags: ['Control systems', 'Embedded', 'Sensors', 'Actuators'],
  },
  {
    title: 'Physical automation',
    body:
      'Software that moves something in the real world: conveyors, access systems, inspection rigs, and the safety logic that has to work every time.',
    tags: ['Industrial automation', 'PLC concepts', 'Robotics', 'Safety logic'],
  },
  {
    title: 'Drone technology',
    body:
      'Aerial sensing as a civic and industrial tool — survey, inspection, mapping, and the data pipeline that turns a flight into a decision.',
    tags: ['UAV systems', 'Aerial mapping', 'Photogrammetry', 'Edge vision'],
  },
  {
    title: 'Cyber-physical systems',
    body:
      'The place where code stops being an abstraction and starts opening valves, moving vehicles, and switching grids. I study the safety cases, the OT/ICS security models, and the failure modes that only appear when software and the physical world share a control loop.',
    tags: ['Cyber-physical', 'OT/ICS security', 'Digital twins', 'Safety cases'],
  },
  {
    title: 'Cybernetics',
    body:
      'Feedback, control, and the boundary between people and machines. The older discipline underneath autonomy: how a system senses itself, corrects itself, and decides what counts as an error.',
    tags: ['Feedback loops', 'Control theory', 'Human–machine systems', 'Autonomy'],
  },
  {
    title: 'Brain–computer interfaces',
    body:
      'Direct signal paths between neural activity and computation — assistive technology first, augmentation second. Followed with a serious interest in the signal processing, the latency budget, and the consent and dignity questions that arrive before the hardware is ready.',
    tags: ['BCI', 'Neurotechnology', 'Signal processing', 'Assistive systems'],
  },
  {
    title: 'Post-von-Neumann computing',
    body:
      'Quantum computing, neuromorphic architectures, and the search for models of computation that are not merely faster but differently shaped. Studied seriously as a frontier, stated honestly as an interest.',
    tags: ['Quantum computing', 'Neuromorphic', 'Beyond von Neumann', 'Unconventional computing'],
  },
] as const

export const principles = [
  {
    title: 'Clarity before code',
    body: 'Name the problem precisely before reaching for a framework. Most complexity is unresolved ambiguity wearing a technical costume.',
  },
  {
    title: 'Security is a default',
    body: 'Threat models belong in the first design conversation, not the last sprint. Secure systems are easier to reason about and cheaper to own.',
  },
  {
    title: 'Systems over silos',
    body: 'The best product decisions live where engineering, design, and business overlap. I work in that overlap on purpose.',
  },
  {
    title: 'Ship, measure, refine',
    body: 'A working system teaches you more than a perfect plan. Put it in front of people, watch what breaks, and make it better.',
  },
  {
    title: 'Leave the place better',
    body: 'Every system carries an environmental and social footprint. Build for climate action, cultural sovereignty, and the long horizon.',
  },
  {
    title: 'Narrative before noise',
    body: 'Attention is easy to rent and hard to keep. Earn it with a clear story, a real offer, and a reason to come back.',
  },
  {
    title: 'Taste is a discipline',
    body: 'Aesthetic judgement is trainable and it compounds. Study art, look longer, and edit harder than feels comfortable.',
  },
] as const

export type ExperienceEntry = {
  period: string
  role: string
  org: string
  detail: string
  current?: boolean
  ended?: boolean
}

export const experience: readonly ExperienceEntry[] = [
  {
    period: '2015 — present',
    role: 'Founder, Growth Partner & Digital Product Delivery Architect',
    org: 'Iridescent Internet Solutions Limited',
    detail:
      'Founded the studio in 2015 and incorporated it in 2017. Growth partner, architect, and delivery lead for full-stack products, AI systems, security work, brand platforms, campaigns, and the content that carries them.',
    current: true,
  },
  {
    period: '2025 — present',
    role: 'Founder & Chair, Board of Trustees',
    org: 'FEPAR.africa',
    detail:
      'Building Festac PanAfrican Renaissance Initiatives — a Pan-African creative-economy incubator — and leading its board through public fundraising and programme design.',
    current: true,
  },
  {
    period: '2024 — 2026',
    role: 'BSc Computer Science',
    org: 'University of the People',
    detail:
      'Computer science fundamentals alongside full-time engineering work: Java programming, digital electronics, operating systems, databases, computer networks, machine learning and AI, and big data. Dean’s List, Term 5, 2024–2025 (CGPA 3.50–3.84). Programme dates June 2024 – August 2026.',
  },
  {
    period: '2025',
    role: 'Full Stack Engineer',
    org: 'Zandbox',
    detail:
      'Delivered fintech product work for a global user base. The engagement has concluded; the work remains part of the record.',
    ended: true,
  },
  {
    period: '2024 — 2025',
    role: 'Growth Partner',
    org: 'Helpman Analytics and Insights Limited',
    detail:
      'Partnered with teams on data, analytics, positioning, and growth. The contract has ended; the growth discipline stayed.',
    ended: true,
  },
  {
    period: '2023 — 2024',
    role: 'Cybersecurity training',
    org: 'NITDA / Cisco Networking Academy',
    detail:
      'Cyber Threat Management, Ethical Hacking, Endpoint Security, Network Defense, and CyberOps Associate.',
  },
  {
    period: '2021 — 2022',
    role: 'SEO & Email Marketing',
    org: 'Trinitas Foundation',
    detail: 'Organic growth and fundraising campaigns for children’s education initiatives.',
  },
  {
    period: '2020 — 2022',
    role: 'SMS Marketing Specialist',
    org: 'Michel Holmes Properties',
    detail: 'Data-driven campaigns, A/B testing, and lead generation for real-estate clients.',
  },
  {
    period: '2017 — 2019',
    role: 'Digital Project Manager',
    org: 'ITChef Nigeria Ltd',
    detail: 'Turned client objectives into delivery plans and led cross-functional teams.',
  },
  {
    period: '2016 — 2017',
    role: 'Teaching service (NYSC)',
    org: 'Senior secondary school',
    detail: 'Taught biology and other science subjects, an early lesson in explaining complex ideas simply.',
  },
  {
    period: '2004 — 2016',
    role: 'Independent web developer',
    org: 'Freelance · Nigeria',
    detail:
      'Started building web pages professionally in 2004 and freelanced across Nigeria — static sites, client platforms, and the first years of learning by shipping. Online since 2002; the work became a practice in 2004.',
  },
]

export type EducationEntry = {
  school: string
  credential: string
  period: string
  /** Optional live status, e.g. a programme still in progress. */
  status?: string
  note: string
  location?: string
}

export const education: readonly EducationEntry[] = [
  {
    school: 'University of the People',
    credential: 'BSc Computer Science',
    period: 'Jun 2024 — Aug 2026',
    status: 'Still on-going',
    note: 'Programming (Java), digital electronics, operating systems, databases, and computer networks, with advanced coursework in machine learning and AI, and big data. Dean’s List, Term 5, 2024–2025 (CGPA 3.50–3.84). ORCID record 0000-0002-6340-2782.',
    location: 'Online · Pasadena, California',
  },
  {
    school: 'Yaba College of Technology (Yabatech)',
    credential: 'OND · City and Regional Planning',
    period: 'Sep 2007 — Sep 2009',
    note: 'A two-year foundation in spatial planning, land use, and urban systems — the origin of my interest in civic infrastructure.',
    location: 'Yaba, Lagos',
  },
  {
    school: 'Les Cours Sonou University (LCS University)',
    credential: 'Bachelor of Business Administration · Business Administration and Management',
    period: 'Jun 2012 — Sep 2015',
    note: 'Business, management, and people-systems foundations — the commercial literacy behind the delivery architecture work.',
    location: 'Cotonou, Benin Republic',
  },
  {
    school: 'Institute of Arts Management & Professional (I.A.M.P.S)',
    credential: 'Graduate Membership · Human Resources Management',
    period: 'Apr — Jul 2017',
    note: 'Graduate membership in personnel administration and human-resource practice. Teams are part of the system; this is where that discipline became formal.',
    location: 'Lagos, Nigeria',
  },
] as const

export type TrainingKind =
  | 'Certification'
  | 'Course badge'
  | 'Professional training'
  | 'Programme'
  | 'Diploma'

export type TrainingEntry = {
  name: string
  issuer: string
  year: string
  kind: TrainingKind
  note: string
  evidence?: string
  evidenceLabel?: string
  /** Publicly verified against the issuer or a credential registry. */
  verified?: boolean
  verifiedNote?: string
}

export const training: readonly TrainingEntry[] = [
  {
    name: 'CyberOps Associate',
    issuer: 'Cisco Networking Academy',
    year: '2021–22',
    kind: 'Certification',
    note:
      'Security operations, threat detection, incident response, vulnerability management, SOC support, and security documentation. Course October–December 2021; credential issued 2022.',
    evidence:
      'https://www.linkedin.com/posts/mriridescent_cyberops-associate-was-issued-by-cisco-to-activity-6974235569753063424-brbW',
    evidenceLabel: 'LinkedIn credential post',
    verified: true,
    verifiedNote: 'Verified Cisco CyberOps Associate credential, issued to David Akpoviroro Oke.',
  },
  {
    name: 'Ethical Hacking',
    issuer: 'Cisco Networking Academy · NITDA Nigeria',
    year: '2023',
    kind: 'Certification',
    note:
      'Selected through the NITDA–Cisco partnership for 2023 Cybersecurity Week. Reconnaissance, exploitation, risk-based vulnerability assessment, and IoT security — taught from the legal, defensive side.',
    evidence:
      'https://www.linkedin.com/posts/mriridescent_im-happy-to-share-that-ive-started-my-ethical-activity-7121189230139064320-duAT',
    evidenceLabel: 'LinkedIn training post',
    verified: true,
    verifiedNote: 'Verified Cisco Ethical Hacking credential, issued to David Akpoviroro Oke.',
  },
  {
    name: 'Network Defense',
    issuer: 'Cisco Networking Academy',
    year: '2026',
    kind: 'Certification',
    note:
      'Completed September–October 2026 with a pass. Hands-on labs, threat analysis simulations, and the defensive competencies of a junior cybersecurity analyst.',
    evidence:
      'https://www.linkedin.com/posts/mriridescent_network-defense-was-issued-by-cisco-to-david-activity-7511306892342919168-ISjo',
    evidenceLabel: 'Verify the Cisco credential',
    verified: true,
    verifiedNote: 'Verified Cisco Network Defense credential, issued to David Akpoviroro Oke.',
  },
  {
    name: 'Cyber Threat Management',
    issuer: 'Cisco Networking Academy · NITDA Nigeria',
    year: '2024',
    kind: 'Certification',
    note:
      'October–November 2024. Threat governance, risk analysis and mitigation, incident response, disaster recovery, evidence handling, attack attribution, CVSS, the Cyber Kill Chain, and the Diamond Model.',
    verified: true,
    verifiedNote: 'Verified Cisco Cyber Threat Management credential, issued to David Akpoviroro Oke.',
  },
  {
    name: 'Endpoint Security',
    issuer: 'Cisco Networking Academy · NITDA Nigeria',
    year: '2023',
    kind: 'Certification',
    note: 'Selected through the NITDA–Cisco 2023 Cybersecurity Week programme. Endpoint vulnerability assessment, hardening, and defence.',
    verified: true,
    verifiedNote: 'Verified Cisco Endpoint Security credential, issued to David Akpoviroro Oke.',
  },
  {
    name: 'CSS Essentials',
    issuer: 'Cisco Networking Academy',
    year: '2026',
    kind: 'Course badge',
    note: 'Cybersecurity support essentials, verified through a public Credly badge.',
    evidence:
      'https://www.credly.com/badges/18f92a18-ae03-4dcc-bec6-0dbcd06a7016',
    evidenceLabel: 'Verify on Credly',
    verified: true,
    verifiedNote: 'Verified Cisco CSS Essentials badge on Credly, issued to David Akpoviroro Oke.',
  },
  {
    name: 'CompTIA A+',
    issuer: 'New Horizons',
    year: '2017',
    kind: 'Professional training',
    note: 'June–August 2017. Computer hardware technology: repairs, maintenance, and replacement.',
  },
  {
    name: 'CompTIA Network+',
    issuer: 'New Horizons',
    year: '2017',
    kind: 'Professional training',
    note: 'July–October 2017. Networking fundamentals, LAN/WAN management, and systems support.',
  },
  {
    name: 'Web Development (LAMP stack)',
    issuer: 'Afrihub GDLI, Abuja',
    year: '2021',
    kind: 'Diploma',
    note:
      'July–September 2021. LAMP stack, MySQL, PHP, and the security fundamentals of web applications.',
  },
  {
    name: 'Python programming',
    issuer: 'Afrihub GDLI, Abuja',
    year: '2021',
    kind: 'Diploma',
    note:
      'October–December 2021. Python classes, variables, logic, libraries, and frameworks including Django and Kivy.',
  },
  {
    name: 'Graphics Design',
    issuer: 'Afrihub GDLI, Abuja',
    year: '2021',
    kind: 'Diploma',
    note:
      'June–August 2021. Principles and elements of design, in-class design work, and production practice.',
  },
  {
    name: 'Cisco CyberOps Associate training',
    issuer: 'Afrihub GDLI, Abuja',
    year: '2021',
    kind: 'Diploma',
    note:
      'October–December 2021. The complete Cisco CyberOps modules and labs: threat hunting, SOC tiers, SIEM, and packet analysis.',
  },
  {
    name: 'AWS Educate — Getting Started with Compute',
    issuer: 'Amazon Web Services',
    year: '2023',
    kind: 'Course badge',
    note: 'Cloud compute foundations and the AWS shared responsibility model.',
  },
  {
    name: 'Swift 1st Step & Desktop Publishing',
    issuer: 'N.I.I.T Fortesoft',
    year: '2004',
    kind: 'Programme',
    note: 'August–October 2004. Introduction to computers, desktop publishing, and my first formal IT training at the start of the web journey.',
  },
] as const

/** Flat list used by older pages and structured data. */
export const credentials = training.map(
  (item) => `${item.issuer} — ${item.name} (${item.year})`
)

export const values = [
  'Curiosity over certainty',
  'Craft over volume',
  'Clarity over cleverness',
  'Access over gatekeeping',
  'Long horizon over short hype',
] as const

export const now = [
  'Architecting digital product delivery and growth partnerships at Iridescent Internet Solutions.',
  'Founding FEPAR.africa and chairing its Board of Trustees.',
  'Computer science at University of the People (2024–2026) — Dean’s List, Term 5.',
  'Writing, shooting, editing, and directing content for brands that need a clearer story.',
  'Studying reputation, public narrative, and the mechanics of trust in new markets.',
  'Learning the art world properly — looking, collecting, and moving toward curation.',
  'Shipping open-source security, AI, and civic infrastructure on GitHub.',
  'Exploring green software, edge computing, and climate-positive infrastructure.',
  'Following post-von-Neumann computing: quantum, neuromorphic, and unconventional architectures.',
] as const

export type Initiative = {
  name: string
  fullName?: string
  role: string
  kind: string
  summary: string
  detail: string
  href: string
  linkLabel: string
  status: string
}

export const initiatives: readonly Initiative[] = [
  {
    name: 'FEPAR.africa',
    fullName:
      'Festac PanAfrican Renaissance Initiatives and/or diaspora foundations, under the brand FEPAR.africa',
    role: 'Founder & Chair, Board of Trustees',
    kind: 'Cultural infrastructure',
    summary:
      'A Pan-African creative-economy incubator: an Afro-futuristic ecosystem where art, community, and commerce converge, built to help African creators keep ownership of their work.',
    detail:
      'FEPAR.africa is being developed in Festac, Lagos as a digital incubator, agency, and community hub. The public fundraising campaign is the first step toward a self-sustaining platform for cultural sharing and economic empowerment.',
    href: 'https://www.naijafund.com/campaign/fepar-africa-non-profit-ngo-donations/',
    linkLabel: 'Public campaign',
    status: 'In development',
  },
  {
    name: 'ROADvision Lagos',
    role: 'Designer & engineer',
    kind: 'Civic infrastructure',
    summary:
      'An AI infrastructure sentinel for Nigerian roads: computer vision, satellite context, and flood-erosion signals combined into a maintenance-priority system.',
    detail:
      'The shipped core is a YOLOv8 detection pipeline and an operator dashboard. The repository also documents institutional extensions — a traffic-authority command link, a contractor verification ledger, and coordinated aerial mapping — as designed layers, not finished integrations.',
    href: '/case-studies#roadvision',
    linkLabel: 'Read the case study',
    status: 'Public repository',
  },
] as const

export const advocacy = {
  headline: 'Technology is only progress if it leaves the place better than it found it.',
  intro:
    'I am a supporter of Green Software, the United Nations Sustainable Development Goals — especially climate action — and the African Union’s Agenda 2063. This is not a badge on a page; it is a design constraint I bring to architecture, procurement, and delivery.',
  greenSoftware: {
    title: 'Green Software',
    body:
      'Software has an energy cost. I favour efficient architectures, right-sized infrastructure, local-first and edge patterns, longer device life, and measurement over assumption. The goal is useful software with the smallest reasonable footprint.',
    commitments: [
      'Measure energy and carbon where the data exists; be honest where it does not.',
      'Prefer efficient architectures over gratuitous compute.',
      'Design for lower-end devices, intermittent power, and African bandwidth realities.',
      'Keep hardware in service longer through maintainable, lightweight software.',
    ],
  },
  goals: [
    {
      code: 'SDG 13',
      name: 'Climate Action',
      body:
        'Green software, efficient infrastructure, and civic tools that help cities adapt to flooding and heat.',
    },
    {
      code: 'SDG 9',
      name: 'Industry, Innovation and Infrastructure',
      body:
        'Product delivery architecture, open-source engineering, and digital infrastructure that raise the floor for local teams.',
    },
    {
      code: 'SDG 11',
      name: 'Sustainable Cities and Communities',
      body:
        'ROADvision’s road-condition intelligence and FEPAR’s cultural infrastructure, both rooted in place.',
    },
    {
      code: 'SDG 4',
      name: 'Quality Education',
      body:
        'Teaching, mentoring, technical writing, and open learning resources — including my own ongoing computer science study.',
    },
    {
      code: 'SDG 17',
      name: 'Partnerships for the Goals',
      body:
        'Cross-border collaboration with founders, institutions, and diaspora networks who want durable outcomes.',
    },
  ],
  agenda2063: {
    title: 'African Union Agenda 2063',
    body:
      'Agenda 2063 is the continent’s long-horizon plan for inclusive growth, integration, cultural identity, and a globally influential Africa. My work connects to it through civic infrastructure, creative-economy ownership, open technology, and diaspora collaboration.',
    points: [
      'Inclusive growth and sustainable development through useful digital products.',
      'Cultural identity and heritage through FEPAR.africa and creator IP sovereignty.',
      'A globally influential Africa through open-source engineering and remote delivery.',
      'People-driven development through teaching, mentoring, and accessible tooling.',
    ],
  },
  commitments: [
    'Name the environmental cost of a build before proposing it.',
    'Design for the device and bandwidth people actually have.',
    'Prefer open standards and portable systems over lock-in.',
    'Leave documentation and capability behind, not dependency.',
  ],
} as const

export const manifesto = {
  eyebrow: 'The Renaissance Manifesto',
  headline: 'A growth partner with an engineer’s mind and a director’s eye.',
  statement:
    'I do not separate growth from the thing being grown. I find the angle, shape the reputation, direct the story, and then build the product that makes the promise real — joining narrative, code, design, security, and culture into one practice.',
  intro:
    'I work as a digital polymath and growth partner: someone who moves between strategy, code, design, film, security, art, and delivery without treating those as separate worlds. The Renaissance was not a style. It was a method — study widely, connect honestly, build things that last.',
  pillars: [
    {
      title: 'Systems architect',
      body:
        'First-principles design across software, data, infrastructure, and the human systems that adopt them. I look beneath the abstraction to the mechanics, then rebuild the abstraction so a team can operate it.',
    },
    {
      title: 'Digital polymath',
      body:
        'Engineering, design, security, growth, and storytelling are one practice. The range is not a lack of focus; it is how the hardest problems actually arrive.',
    },
    {
      title: 'Computational civic strategist',
      body:
        'Civic infrastructure is a product problem. ROADvision, FEPAR.africa, and green-software practice are attempts to treat public systems with the same rigour as commercial ones.',
    },
  ],
  daVinci: [
    {
      name: 'Curiosità',
      translation: 'Curiosity',
      body: 'Keep asking how the thing works, especially when everyone else has stopped asking.',
    },
    {
      name: 'Dimostrazione',
      translation: 'Demonstration',
      body: 'Prove it in production. A working system is a stronger argument than a confident slide.',
    },
    {
      name: 'Sensazione',
      translation: 'Sensation',
      body: 'Train the eye and the ear. Interface, rhythm, and tone are part of the architecture.',
    },
    {
      name: 'Sfumato',
      translation: 'Embracing ambiguity',
      body: 'Hold uncertainty without rushing to false clarity. Good decisions often arrive before certainty does.',
    },
    {
      name: 'Arte/Scienza',
      translation: 'Art and science',
      body: 'Balance analytical precision with creative intuition. Neither is sufficient alone.',
    },
    {
      name: 'Corporalità',
      translation: 'Craft and agility',
      body: 'Keep the body and the attention in condition for long, demanding work.',
    },
    {
      name: 'Connessione',
      translation: 'Connection',
      body: 'Look for the link between apparently unrelated systems. That is where the new thing lives.',
    },
  ],
  letter: [
    'To the founders, municipal leaders, and technological custodians of modern Africa:',
    'I have studied the systems that carry daily life — roads, payments, identity, culture, communication — and I have found them under-designed for the people who depend on them. I offer a practice that joins product delivery architecture, applied intelligence, security, and cultural infrastructure into one discipline.',
    'I can map a product from ambition to architecture; build the software and the team rhythm that carry it; harden the system before it meets the public; and leave behind documentation, capability, and a maintainable estate rather than dependency.',
    'I work with particular care on civic infrastructure, climate-conscious computing, and African creative ownership. Where the data is missing, I will say so. Where the risk is real, I will name it. Where the work can be measured, I will measure it.',
    'I ask for the difficult problems: the ones that cross departments, budgets, and disciplines; the ones that cannot be solved by a tool alone. Those are the problems worth a working life.',
    'David Akpoviroro Oke — Mr Iridescent, the Creative Renaissance Man',
  ],
} as const
