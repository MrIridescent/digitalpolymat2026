import { site } from './profile'

/**
 * Direct answers about the practice. Shared by the visible /faq page and the
 * FAQPage structured data so the markup always matches what a reader can see.
 */
export type FaqItem = {
  question: string
  answer: string
}

export const faqs: readonly FaqItem[] = [
  {
    question: 'Who is David Akpoviroro Oke?',
    answer:
      'David Akpoviroro Oke, also known as Mr Iridescent, is a Lagos-based growth hacker and growth partner, public-relations and reputation strategist, and digital product delivery architect. He works across growth, reputation, content and film, full-stack product development, applied AI, cybersecurity, and civic infrastructure.',
  },
  {
    question: 'What services does David Akpoviroro Oke offer?',
    answer:
      'Growth hacking and market entry, public relations and reputation management, content and creative direction, digital product delivery architecture, custom software development, workflow automation and AI enablement, security and DevSecOps, and brand systems and art direction.',
  },
  {
    question: 'What does David Akpoviroro Oke work on?',
    answer:
      'He builds full-stack web and fintech products, AI and agentic systems, workflow automation, security tooling and DevSecOps automation, and civic technology such as ROADvision Lagos and FEPAR.africa.',
  },
  {
    question: 'Which languages does David Akpoviroro Oke speak?',
    answer:
      'English at professional working proficiency, conversational French and Yoruba, and basic Hausa, Urhobo, and Okpe.',
  },
  {
    question: 'What training and credentials does David Akpoviroro Oke hold?',
    answer:
      'Six verified Cisco Networking Academy records — five credentials (CyberOps Associate, Ethical Hacking, Network Defense, Cyber Threat Management, Endpoint Security) and the CSS Essentials course badge — plus CompTIA A+ and Network+ training at New Horizons, Afrihub programmes, AWS Educate, and ongoing BSc Computer Science study at University of the People.',
  },
  {
    question: 'Is David still at Zandbox or Helpman?',
    answer:
      'No. The Zandbox engineering engagement has concluded, and the Helpman growth-partner contract has ended. He now works as a Digital Product Delivery Architect through Iridescent Internet Solutions and chairs the Board of Trustees of FEPAR.africa.',
  },
  {
    question: 'Is David available for remote work?',
    answer:
      'Yes. He is based in Lagos, Nigeria and works remotely with teams worldwide. He is open to growth partnerships, reputation mandates, and selected product builds.',
  },
  {
    question: 'How can I contact David Akpoviroro Oke?',
    answer: `Email ${site.email}, message him on WhatsApp at ${site.phone}, or use the contact form at mriridescent.africa/contact.`,
  },
  {
    question: 'Where can I see David Akpoviroro Oke’s code?',
    answer:
      'His public repositories are on GitHub at github.com/MrIridescent, and selected project write-ups are on this site under Projects and Case studies.',
  },
]

/** Questions specific to remote, cross-border engagements. */
export const globalFaqs: readonly FaqItem[] = [
  {
    question: 'Does David Akpoviroro Oke work with clients outside Nigeria?',
    answer:
      'Yes. The practice is remote-first. Clients and collaborators are spread across Africa, Europe, North America, the Middle East, Asia-Pacific, and Latin America, with work delivered asynchronously and through scheduled overlap calls.',
  },
  {
    question: 'Can he attend meetings in my time zone?',
    answer:
      'Usually, yes. Lagos runs on WAT (UTC+1) all year. Calls are scheduled inside a shared window — morning overlap with Europe, a narrower window with the Americas, and late-afternoon overlap with South and East Asia.',
  },
  {
    question: 'Does he have offices in the cities listed?',
    answer:
      'No. The list describes collaboration corridors and client markets, not physical offices. Work is delivered remotely, with selected on-site workshops, shoots, or launches by arrangement.',
  },
  {
    question: 'Can he help a brand enter Nigeria or the wider African market?',
    answer:
      'Yes. Market entry is one of the core offers: positioning for the new market, a route into relevant networks and media, a localised narrative, and a first repeatable pipeline rather than a one-off launch.',
  },
  {
    question: 'What language are engagements delivered in?',
    answer:
      'English, at professional working proficiency. French and Yoruba are conversational; basic Hausa, Urhobo, and Okpe are heritage-level and not used for professional delivery.',
  },
]

/** Both sets, used by the llms.txt files. */
export const allFaqs: readonly FaqItem[] = [...faqs, ...globalFaqs]
