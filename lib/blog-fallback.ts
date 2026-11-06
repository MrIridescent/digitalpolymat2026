/**
 * Local journal essays.
 *
 * These render whenever Contentful is not configured or cannot be reached, so
 * the journal is never an empty page and the static build never depends on a
 * third party being available. Once CONTENTFUL_SPACE_ID and
 * CONTENTFUL_ACCESS_TOKEN are set in the build environment, published entries
 * replace these automatically.
 */

import type { BlogPost, RichTextDocument, RichTextNode } from './contentful'

const text = (value: string, marks: RichTextNode['marks'] = []): RichTextNode => ({
  nodeType: 'text',
  value,
  marks,
  data: {},
})

const italic = (value: string) => text(value, [{ type: 'italic' }])

const p = (...content: Array<string | RichTextNode>): RichTextNode => ({
  nodeType: 'paragraph',
  data: {},
  content: content.map((item) => (typeof item === 'string' ? text(item) : item)),
})

const h2 = (value: string): RichTextNode => ({
  nodeType: 'heading-2',
  data: {},
  content: [text(value)],
})

const h3 = (value: string): RichTextNode => ({
  nodeType: 'heading-3',
  data: {},
  content: [text(value)],
})

const quote = (value: string): RichTextNode => ({
  nodeType: 'blockquote',
  data: {},
  content: [p(value)],
})

const ul = (...items: Array<string | RichTextNode>): RichTextNode => ({
  nodeType: 'unordered-list',
  data: {},
  content: items.map((item) => ({
    nodeType: 'list-item',
    data: {},
    content: [typeof item === 'string' ? p(item) : item],
  })),
})

const doc = (...content: RichTextNode[]): RichTextDocument => ({
  nodeType: 'document',
  data: {},
  content,
})

export const fallbackPosts: BlogPost[] = [
  {
    slug: 'the-polymath-is-a-systems-engineer',
    title: 'The polymath is a systems engineer',
    excerpt:
      'Why a wide range of skills is a systems discipline, not a lack of focus — and the tax that comes with it.',
    publishedAt: '2026-09-18T09:00:00.000Z',
    tags: ['Practice', 'Systems thinking'],
    readingMinutes: 6,
    featured: true,
    cover: {
      url: '/media/blog/systems.webp',
      title: 'Macro photograph of gold connector pins on a circuit board',
      width: 1600,
      height: 900,
    },
    source: 'local',
    body: doc(
      p(
        '“Polymath” is a dangerous word. It suggests a finished person with a wall of certificates and an answer for everything. The real practice is closer to the opposite: a permanent admission that you do not yet understand the system in front of you.'
      ),
      p(
        'I started building for the web in the early 2000s, when a page was still a small act of craft. Since then the work has moved through front end, back end, infrastructure, design, marketing, and security. None of those transitions felt like a career change. They felt like following the same problem into the next room.'
      ),
      p(
        'That is the useful definition of range: not knowing many things, but refusing to stop at the boundary of one discipline when the problem crosses it. A fintech product is not a front-end problem or a security problem. It is a trust problem, a latency problem, a regulatory problem, and a design problem wearing one interface.'
      ),
      h2('Range is a systems skill'),
      p(
        'The most expensive failures I have seen were not caused by a lack of specialists. They were caused by a missing translation between specialists. The security team names a risk the product team cannot price. The design team ships a flow the data model cannot support. The infrastructure team owns a failure mode nobody measured. Nobody is incompetent; the interfaces between them are.'
      ),
      p(
        'Working across domains gives you something narrow expertise cannot: you learn to hear the same constraint in different vocabularies. A threat model, a user journey, and a database schema can all be describing the same missing assumption. The value is not that you can do every job. It is that you can tell when two jobs are actually one job.'
      ),
      h2('The tax nobody mentions'),
      p(
        'There is a cost, and it is real. Depth compounds faster than breadth. While you are learning the third domain, someone else is becoming the person the market calls first for the first one. Switching costs are not a myth, and context switching will quietly erode your best work if you let it.'
      ),
      p(
        'My answer is not balance. It is sequencing. I go deep enough in a domain to ship something real and to recognise quality, then I carry the pattern forward instead of carrying the identity. The stack changes. The questions do not: what is the constraint, what will break first, who carries the risk, and what does ',
        italic('done'),
        ' actually mean?'
      ),
      h2('What I optimise for'),
      p(
        'Not the widest list of skills. The shortest path between a real problem and a working system that someone can trust. Sometimes that path is a single afternoon of boring code. Sometimes it is a week of learning a domain well enough to know which obvious answer is wrong.'
      ),
      quote(
        'The Renaissance ideal was never about knowing everything. It was about refusing the artificial split between thinking and making.'
      ),
      p('That is still the job — and it is still unfinished.')
    ),
  },
  {
    slug: 'security-is-a-design-material',
    title: 'Security is a design material',
    excerpt:
      'Threat modelling belongs in the first sketch, not the last sprint. What changes when you treat security like a material instead of a gate.',
    publishedAt: '2026-08-02T09:00:00.000Z',
    tags: ['Security', 'Engineering'],
    readingMinutes: 6,
    cover: {
      url: '/media/blog/security.webp',
      title: 'Concrete tower facade against a pale blue sky',
      width: 1600,
      height: 900,
    },
    source: 'local',
    body: doc(
      p(
        'Most teams treat security as a gate at the end of a project. The build is finished, the launch date is fixed, and someone arrives to ask whether the thing is safe. By then the honest answer is usually: it is as safe as the architecture allows, which is not the same as safe.'
      ),
      p(
        'I prefer to treat security as a material, like load-bearing steel or the weight of a font. You do not add it afterwards. You design with it, and the design changes as a result. The earlier that happens, the cheaper and more elegant the system becomes.'
      ),
      h2('A threat model is an interface'),
      p(
        'A useful threat model is not a document listing every attack in existence. It is a short, specific argument about who wants what, what they can reach, and what happens when they get it. That argument belongs next to the user journey, because both are describing the same system from different angles.'
      ),
      p(
        'When I model a banking flow, I am not only asking “can this be exploited?” I am asking what the interface promises. If the screen says a transfer is complete, the system must be able to prove that it is. If a session looks active, the server must agree. Security problems often begin as broken promises between layers.'
      ),
      h2('Make the safe path the easy path'),
      p(
        'Controls that fight the way people work get bypassed, and rightly so. The engineering goal is not to add friction; it is to move the friction away from the user and into the defaults. Input validation at the boundary. Least privilege that is actually least. Secrets that cannot be pasted into a chat. A deploy pipeline that fails closed.'
      ),
      p(
        'This is where DevSecOps stops being a slogan. If the secure route is slower than the insecure one, the insecure one wins at 2 a.m. before a release. Automation is not about replacing judgement; it is about making the safe choice the one that requires the least heroism.'
      ),
      h2('What I ask for on day one'),
      ul(
        'A data-flow sketch, including the boring internal calls.',
        'A list of trust boundaries and who sits on each side.',
        'A named owner for every risk — a person, not a team.',
        'An explicit definition of what “acceptable” means for this system.'
      ),
      p(
        'None of those require a security team of fifty. They require someone in the room who is willing to ask the awkward question before the architecture hardens.'
      ),
      p(
        'The result is not a system that cannot be attacked. No such system exists. It is a system whose failure modes are understood, whose operators are not surprised, and whose users were not asked to pay for a shortcut they never chose.'
      )
    ),
  },
  {
    slug: 'twenty-years-of-the-web',
    title: 'Twenty years of the web, and what it taught me about AI',
    excerpt:
      'Every abstraction leaks, the demo is not the system, and the human in the loop is not decoration.',
    publishedAt: '2026-06-14T09:00:00.000Z',
    tags: ['Engineering', 'Artificial intelligence'],
    readingMinutes: 7,
    cover: {
      url: '/media/blog/web.webp',
      title: 'Engineer working at a vintage mainframe computer console',
      width: 1600,
      height: 900,
    },
    source: 'local',
    body: doc(
      p(
        'Every generation of technology arrives with the same promise: this time the complexity will be handled for you. In the early 2000s it was table layouts and “works best in one browser.” Later it was frameworks that would make state simple. Now it is models that will make reasoning simple. The promise is always partly true, which is what makes it persuasive.'
      ),
      p(
        'The web taught me that abstractions are useful precisely because they hide something. The engineering skill is knowing what was hidden, and what it will cost when it comes back. That is not cynicism. It is how you build on top of a tool without being surprised by it in production.'
      ),
      h2('The demo is not the system'),
      p(
        'A demo shows the happy path with clean inputs and an audience that wants to believe. A system has to survive malformed data, partial failure, hostile users, expired credentials, and the ordinary chaos of a Tuesday. The distance between the two is where most of the engineering lives.'
      ),
      p(
        'With AI, that distance is easy to underestimate because the output is fluent. Fluency reads as confidence. But a model that produces a convincing answer is not the same as a system that produces a correct one, and neither is the same as a system whose errors are detectable. Before adding intelligence, I want the boring parts: observability, evaluation, fallbacks, and a clear definition of failure.'
      ),
      h2('Boring infrastructure wins'),
      p(
        'The web rewarded teams that invested in unglamorous things: caching, logging, migrations, tests, and a deploy process nobody has to think about. AI systems reward the same investments. Retrieval quality, data hygiene, latency budgets, and permission boundaries matter more than the model name on the slide.'
      ),
      p(
        'This is also why I care about offline-first and resilience. The real world is not a reliable API. Networks drop, providers rate limit, and users keep working. A system that degrades honestly is more trustworthy than one that performs beautifully until the first interruption.'
      ),
      h2('The human in the loop is not decoration'),
      p(
        'Automation changes the shape of responsibility; it does not remove it. Someone still decides what the system is allowed to do, what it must explain, and when a person has to sign off. The most useful AI products I have built or studied are the ones that make that boundary visible instead of pretending it disappeared.'
      ),
      p(
        'Twenty years in, the lesson is almost embarrassingly plain: the technology is never the whole system. The people, the incentives, the failure modes, and the maintenance are the system. Build for those, and the new thing has a chance to last longer than the excitement around it.'
      )
    ),
  },
  {
    slug: 'the-interface-is-a-promise',
    title: 'The interface is a promise',
    excerpt:
      'Every screen makes a claim about what the system will do next. Most product bugs are broken promises between layers.',
    publishedAt: '2026-04-27T09:00:00.000Z',
    tags: ['Design', 'Product'],
    readingMinutes: 4,
    cover: {
      url: '/media/blog/interface.webp',
      title: 'Hand-drawn mobile wireframes on paper beside a phone',
      width: 1600,
      height: 900,
    },
    source: 'local',
    body: doc(
      p(
        'A button is a promise. A spinner is a promise with a deadline. A green checkmark is a promise that the server has already agreed. When those promises disagree with the state underneath, users do not experience a “bug” — they experience a system that lied to them, and they stop trusting the whole product.'
      ),
      p(
        'This is why I keep interface work and systems work in the same room. The design language and the state machine are two descriptions of one contract. If the interface can say something the data model cannot prove, the interface is wrong, no matter how beautiful it looks.'
      ),
      h2('Design the states, not the screen'),
      p(
        'The polished mockup usually shows the best state: data loaded, permissions correct, network healthy, balance positive. Real products spend most of their life in the other states. What does the screen say while the request is in flight? What does it say when the request succeeded but the confirmation failed? What does it say when the user has permission to view but not to act?'
      ),
      ul(
        'Name the state before you style it.',
        'Give every optimistic update an honest rollback.',
        'Never let a disabled control be the only explanation.',
        'Make the empty state teach the next action.'
      ),
      p(
        'A system that handles those questions feels calm. Not because it is simple, but because it is not pretending. Calm is a design outcome produced by engineering discipline.'
      ),
      h2('Latency is part of the copy'),
      p(
        'A 400ms transition and a 4s wait are different products, even if the final screen is identical. Perceived performance belongs in the design review alongside typography. Skeleton screens, optimistic updates, and honest progress are not decorations; they are the copy the system writes while it works.'
      ),
      p(
        'The test I use is simple: if I removed every animation and label, would the user still understand what the system is doing? If not, the motion is covering for a missing state. Animation should clarify a promise, not replace it.'
      )
    ),
  },
  {
    slug: 'green-software-is-a-design-constraint',
    title: 'Green software is a design constraint, not a badge',
    excerpt:
      'Efficiency is not a quarterly initiative. It is a set of decisions about payloads, queries, and how long a device is allowed to work.',
    publishedAt: '2026-02-09T09:00:00.000Z',
    tags: ['Climate', 'Engineering'],
    readingMinutes: 5,
    cover: {
      url: '/media/blog/green.webp',
      title: 'Solar panel array above a garden at golden hour',
      width: 1600,
      height: 900,
    },
    source: 'local',
    body: doc(
      p(
        'Sustainability in software is often presented as a reporting exercise: measure emissions, publish a number, add a badge. The more useful version is smaller and more technical. Every unnecessary kilobyte, query, and wake-up has a physical cost, and most of that cost is decided long before anyone writes a sustainability report.'
      ),
      p(
        'I work in Lagos, where bandwidth is expensive, power is intermittent, and devices are often older than the ones in the design review. That context makes green software less abstract. Efficiency is not an optimisation for a distant future; it is respect for the person on the other side of the connection.'
      ),
      h2('Where the weight actually lives'),
      ul(
        'Images shipped at three times their display size.',
        'Client bundles that hydrate components nobody interacts with.',
        'Polling loops where an event would do.',
        'Queries that fetch a table to render four fields.',
        'Animations that keep a phone awake after the screen is idle.'
      ),
      p(
        'None of these are exotic. They are ordinary defaults, which is exactly why they persist. A green software practice is mostly the discipline of questioning defaults early, while they are still cheap to change.'
      ),
      h2('Efficiency is a user feature'),
      p(
        'The same decisions that reduce energy also reduce waiting. A smaller payload loads faster on a 3G connection. A cached response survives a flaky network. A page that respects reduced-motion settings is usable by more people. Green engineering and inclusive engineering keep arriving at the same answer: do less work, on purpose.'
      ),
      quote(
        'The most sustainable feature is the one the user needed, delivered once, and never recomputed.'
      ),
      p(
        'That is the standard I try to hold: not a badge, but a set of constraints that show up in the architecture, the build output, and the way the product behaves on a slow day.'
      )
    ),
  },
]
