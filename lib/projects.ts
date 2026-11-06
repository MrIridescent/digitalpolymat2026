/**
 * Real, public work from github.com/MrIridescent.
 * Only repositories created by Mr Iridescent himself are listed here; forks of
 * other people's work are excluded. Descriptions are adapted from the repository
 * descriptions, not invented. Star counts are deliberately omitted because they
 * would be noise at this stage.
 */

export type ProjectCategory =
  | 'Security'
  | 'AI & data'
  | 'Civic tech'
  | 'Developer tools'
  | 'Product'
  | 'Client work'

export type Project = {
  slug: string
  name: string
  tagline: string
  description: string
  category: ProjectCategory
  stack: string[]
  language?: string
  license?: string
  repo: string
  live?: string
  featured?: boolean
  accent: string
}

export const projects: Project[] = [
  {
    slug: 'devsecops-agent',
    name: 'Iridescent DevSecOps Platform',
    tagline: 'An AI orchestrator for code review and vulnerability remediation.',
    description:
      'A unified AI orchestrator and turnkey security system for automated code review and intelligent vulnerability remediation.',
    category: 'Security',
    stack: ['TypeScript', 'AI orchestration', 'DevSecOps', 'SAST'],
    language: 'TypeScript',
    license: 'MIT',
    repo: 'https://github.com/MrIridescent/DevSecOps-Agent',
    featured: true,
    accent: 'from-violet-500 to-cyan-400',
  },
  {
    slug: 'threat-detection-platform',
    name: 'Threat Detection Platform',
    tagline: 'Specialised agents that detect, analyse, and respond in real time.',
    description:
      'An enterprise-grade threat detection ecosystem where multiple specialised AI agents work together to detect, analyse, and respond to security threats in real time.',
    category: 'Security',
    stack: ['Java', 'Multi-agent systems', 'Observability', 'Threat intelligence'],
    language: 'Java',
    repo: 'https://github.com/MrIridescent/threat-detection-platform',
    featured: true,
    accent: 'from-rose-500 to-amber-400',
  },
  {
    slug: 'roadvision-lagos',
    name: 'ROADvision Lagos',
    tagline: 'An AI infrastructure sentinel for Nigerian roads.',
    description:
      'An AI infrastructure sentinel for Nigeria. The repository documents five layers — YOLOv8 pothole detection, satellite macro-analysis, flood-erosion correlation, a contractor verification ledger, and a traffic-authority command link — with the vision pipeline and operator dashboard as the working core.',
    category: 'Civic tech',
    stack: ['Python', 'FastAPI', 'Next.js', 'YOLOv8', 'WebSockets', 'Geospatial'],
    language: 'Python + TypeScript',
    repo: 'https://github.com/MrIridescent/ROADvision_Lagos',
    featured: true,
    accent: 'from-emerald-500 to-sky-400',
  },
  {
    slug: 'ats-matcher',
    name: 'ATS Résumé Matcher',
    tagline: 'High-precision candidate matching without the hype.',
    description:
      'An AI-powered applicant tracking system with multi-format parsing, skill-weightage analysis, and intelligent ranking built on FastAPI, spaCy, and agentic AI.',
    category: 'AI & data',
    stack: ['Python', 'FastAPI', 'spaCy', 'CrewAI', 'LangChain'],
    language: 'Python',
    repo: 'https://github.com/MrIridescent/mriridescent-ats-matcher',
    featured: true,
    accent: 'from-indigo-500 to-fuchsia-400',
  },
  {
    slug: 'ochuko-ai',
    name: 'OchukoAi',
    tagline: 'A multi-agent framework for real enterprise work.',
    description:
      'A Python framework for orchestrating multiple AI agents across tools, MCP servers, multimodal inputs, and forensic analysis workflows.',
    category: 'AI & data',
    stack: ['Python', 'CrewAI', 'MCP', 'Multi-agent', 'Multimodal'],
    language: 'Python',
    repo: 'https://github.com/MrIridescent/OchukoAi',
    accent: 'from-violet-400 to-emerald-400',
  },
  {
    slug: 'rezilient-js',
    name: 'Rezilient.JS',
    tagline: 'An offline-first framework built for unreliable reality.',
    description:
      'A principle-driven, offline-first JavaScript framework with AI-awareness, carbon-conscious computing, and self-healing capabilities.',
    category: 'Developer tools',
    stack: ['JavaScript', 'Offline-first', 'Accessibility', 'Self-healing'],
    language: 'JavaScript',
    license: 'MIT',
    repo: 'https://github.com/MrIridescent/Rezilient.JS',
    featured: true,
    accent: 'from-teal-400 to-lime-300',
  },
  {
    slug: 'online-banking-demo',
    name: 'Online Banking Demo',
    tagline: 'A fintech interface built with a security-first lens.',
    description:
      'A TypeScript banking demo exploring account flows, transaction surfaces, and the front-end patterns behind financial products.',
    category: 'Product',
    stack: ['TypeScript', 'Fintech', 'Web application'],
    language: 'TypeScript',
    repo: 'https://github.com/MrIridescent/online-banking-demo',
    accent: 'from-blue-500 to-emerald-400',
  },
  {
    slug: 'icryptex',
    name: 'iCryptex Exchange',
    tagline: 'A full-stack build around authenticated exchange records.',
    description:
      'A Next.js and TypeScript application with authentication, account and billing surfaces, and typed create/read/update flows for exchange records.',
    category: 'Product',
    stack: ['TypeScript', 'Next.js', 'Drizzle', 'tRPC'],
    language: 'TypeScript',
    repo: 'https://github.com/MrIridescent/icryptex.exchange',
    accent: 'from-yellow-400 to-orange-500',
  },
  {
    slug: 'olawestern',
    name: 'Ola Western',
    tagline: 'A client site built for clarity and speed.',
    description:
      'A TypeScript client website for Ola Western, built with a focus on fast loads, clean structure, and a confident visual system.',
    category: 'Client work',
    stack: ['TypeScript', 'Next.js', 'Content'],
    language: 'TypeScript',
    repo: 'https://github.com/MrIridescent/olawestern.ng',
    accent: 'from-sky-400 to-blue-500',
  },
  {
    slug: 'olmash',
    name: 'Olmash Consulting',
    tagline: 'A consulting presence with a practical edge.',
    description:
      'The website for Olmash Consulting, built to present services clearly and turn interest into conversations.',
    category: 'Client work',
    stack: ['PHP', 'Web', 'Content'],
    language: 'PHP',
    repo: 'https://github.com/MrIridescent/olmash',
    live: 'https://www.olmashconsulting.com',
    accent: 'from-stone-300 to-amber-300',
  },
  {
    slug: 'eduteller-network',
    name: 'Eduteller Network',
    tagline: 'Education infrastructure for a connected generation.',
    description:
      'A PHP platform for an education network, connecting learners and the people building around them.',
    category: 'Product',
    stack: ['PHP', 'Web platform', 'EdTech'],
    language: 'PHP',
    repo: 'https://github.com/MrIridescent/eduteller-network',
    accent: 'from-lime-300 to-emerald-400',
  },
  {
    slug: 'facial-attendance',
    name: 'Facial Attendance System',
    tagline: 'Computer vision applied to a daily operational problem.',
    description:
      'A Jupyter Notebook project that uses facial recognition to automate attendance capture.',
    category: 'AI & data',
    stack: ['Jupyter', 'Computer vision', 'Face recognition'],
    language: 'Jupyter Notebook',
    license: 'MIT',
    repo: 'https://github.com/MrIridescent/Facial_Attendance_System',
    accent: 'from-fuchsia-400 to-rose-400',
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export const projectCategories: Array<'All' | ProjectCategory> = [
  'All',
  'Security',
  'AI & data',
  'Civic tech',
  'Developer tools',
  'Product',
  'Client work',
]

export const projectCount = projects.length
