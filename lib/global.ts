/**
 * Collaboration corridors, not offices.
 *
 * The practice is remote-first from Lagos. These hubs are where clients,
 * collaborators, media, and communities tend to come from — the places a
 * city-specific search should be able to find this practice without pretending
 * that it keeps a desk there.
 */
export type Hub = {
  city: string
  country: string
  /** Optional line explaining why this hub matters to the practice. */
  note?: string
}

export type HubRegion = {
  id: string
  name: string
  kicker: string
  blurb: string
  hubs: readonly Hub[]
}

export const hubRegions: readonly HubRegion[] = [
  {
    id: 'africa',
    name: 'Africa & the diaspora',
    kicker: 'Home market',
    blurb:
      'The deepest network. Lagos is the base; the rest of the continent is a short flight or a same-day call away. Growth, reputation, civic technology, and market entry are shaped here first.',
    hubs: [
      { city: 'Lagos', country: 'Nigeria', note: 'Home base for growth, PR, and product delivery.' },
      { city: 'Abuja', country: 'Nigeria' },
      { city: 'Accra', country: 'Ghana' },
      { city: 'Nairobi', country: 'Kenya', note: 'East African product, climate, and civic networks.' },
      { city: 'Kigali', country: 'Rwanda', note: 'Public-sector innovation and civic systems.' },
      { city: 'Cape Town', country: 'South Africa', note: 'Design, media, and product teams.' },
      { city: 'Johannesburg', country: 'South Africa' },
      { city: 'Cairo', country: 'Egypt' },
      { city: 'Casablanca', country: 'Morocco' },
      { city: 'Dakar', country: 'Senegal' },
      { city: 'Addis Ababa', country: 'Ethiopia' },
      { city: 'Dar es Salaam', country: 'Tanzania' },
      { city: 'Kampala', country: 'Uganda' },
      { city: 'Lusaka', country: 'Zambia' },
      { city: 'Abidjan', country: 'Côte d’Ivoire' },
      { city: 'Rabat', country: 'Morocco' },
      { city: 'Tunis', country: 'Tunisia' },
      { city: 'Algiers', country: 'Algeria' },
      { city: 'Douala', country: 'Cameroon' },
      { city: 'Gaborone', country: 'Botswana' },
      { city: 'Windhoek', country: 'Namibia' },
      { city: 'Maputo', country: 'Mozambique' },
    ],
  },
  {
    id: 'europe',
    name: 'Europe',
    kicker: 'Narrative & capital',
    blurb:
      'Media, finance, and startup ecosystems where an African growth story is often misread. The work is to make it legible on European terms without flattening it.',
    hubs: [
      { city: 'London', country: 'United Kingdom', note: 'Media, finance, and the diaspora conversation.' },
      { city: 'Berlin', country: 'Germany', note: 'Startup and creative-technology rooms.' },
      { city: 'Munich', country: 'Germany' },
      { city: 'Paris', country: 'France' },
      { city: 'Amsterdam', country: 'Netherlands' },
      { city: 'Lisbon', country: 'Portugal' },
      { city: 'Dublin', country: 'Ireland' },
      { city: 'Stockholm', country: 'Sweden' },
      { city: 'Copenhagen', country: 'Denmark' },
      { city: 'Barcelona', country: 'Spain' },
      { city: 'Madrid', country: 'Spain' },
      { city: 'Zurich', country: 'Switzerland' },
      { city: 'Tallinn', country: 'Estonia' },
      { city: 'Warsaw', country: 'Poland' },
      { city: 'Oslo', country: 'Norway' },
      { city: 'Helsinki', country: 'Finland' },
      { city: 'Milan', country: 'Italy' },
      { city: 'Prague', country: 'Czechia' },
      { city: 'Vienna', country: 'Austria' },
      { city: 'Brussels', country: 'Belgium' },
      { city: 'Istanbul', country: 'Türkiye' },
      { city: 'Athens', country: 'Greece' },
      { city: 'Bucharest', country: 'Romania' },
      { city: 'Kyiv', country: 'Ukraine' },
    ],
  },
  {
    id: 'north-america',
    name: 'North America',
    kicker: 'Media & product',
    blurb:
      'Where distribution, capital, and product expectations are set. Engagements tend to be asynchronous, with a deliberate overlap window for the decisions that need a room.',
    hubs: [
      { city: 'New York', country: 'United States', note: 'Media, fintech, and cultural distribution.' },
      { city: 'San Francisco Bay Area', country: 'United States', note: 'AI, product, and venture networks.' },
      { city: 'Seattle', country: 'United States' },
      { city: 'Austin', country: 'United States', note: 'Early-stage product and growth teams.' },
      { city: 'Boston', country: 'United States' },
      { city: 'Los Angeles', country: 'United States' },
      { city: 'Miami', country: 'United States' },
      { city: 'Toronto', country: 'Canada', note: 'Diaspora and cross-border product teams.' },
      { city: 'Montreal', country: 'Canada' },
      { city: 'Vancouver', country: 'Canada' },
      { city: 'Chicago', country: 'United States' },
      { city: 'Washington, D.C.', country: 'United States' },
      { city: 'Atlanta', country: 'United States' },
      { city: 'Denver', country: 'United States' },
      { city: 'Waterloo', country: 'Canada' },
      { city: 'Calgary', country: 'Canada' },
    ],
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    kicker: 'Trade & events',
    blurb:
      'A short flight from Lagos and a frequent bridge for capital, trade, and conferences. Useful when a brand needs a second market before it needs a second office.',
    hubs: [
      { city: 'Dubai', country: 'United Arab Emirates', note: 'Trade, capital, and event-led market entry.' },
      { city: 'Abu Dhabi', country: 'United Arab Emirates' },
      { city: 'Riyadh', country: 'Saudi Arabia' },
      { city: 'Doha', country: 'Qatar' },
      { city: 'Tel Aviv', country: 'Israel' },
      { city: 'Manama', country: 'Bahrain' },
      { city: 'Muscat', country: 'Oman' },
      { city: 'Amman', country: 'Jordan' },
      { city: 'Beirut', country: 'Lebanon' },
    ],
  },
  {
    id: 'asia-pacific',
    name: 'Asia-Pacific',
    kicker: 'Engineering & scale',
    blurb:
      'Engineering depth, manufacturing, and distribution. The overlap is tighter, so engagements lean on written decisions and recorded walkthroughs.',
    hubs: [
      { city: 'Bengaluru', country: 'India', note: 'Engineering depth and delivery partnerships.' },
      { city: 'Hyderabad', country: 'India' },
      { city: 'Mumbai', country: 'India' },
      { city: 'Singapore', country: 'Singapore', note: 'Market entry and regional headquarters.' },
      { city: 'Jakarta', country: 'Indonesia' },
      { city: 'Ho Chi Minh City', country: 'Vietnam' },
      { city: 'Tokyo', country: 'Japan' },
      { city: 'Seoul', country: 'South Korea' },
      { city: 'Shenzhen', country: 'China' },
      { city: 'Taipei', country: 'Taiwan' },
      { city: 'Sydney', country: 'Australia', note: 'Late-overlap product and media calls.' },
      { city: 'Melbourne', country: 'Australia' },
      { city: 'Auckland', country: 'New Zealand' },
      { city: 'Hong Kong', country: 'Hong Kong SAR' },
      { city: 'Beijing', country: 'China' },
      { city: 'Shanghai', country: 'China' },
      { city: 'Kuala Lumpur', country: 'Malaysia' },
      { city: 'Bangkok', country: 'Thailand' },
      { city: 'Manila', country: 'Philippines' },
      { city: 'Osaka', country: 'Japan' },
      { city: 'Brisbane', country: 'Australia' },
      { city: 'Perth', country: 'Australia' },
      { city: 'Wellington', country: 'New Zealand' },
    ],
  },
  {
    id: 'latin-america',
    name: 'Latin America',
    kicker: 'Culture & growth',
    blurb:
      'Fast-growing digital markets with their own narrative codes. The work is usually brand translation, growth experiments, and product delivery with a local team.',
    hubs: [
      { city: 'São Paulo', country: 'Brazil' },
      { city: 'Mexico City', country: 'Mexico' },
      { city: 'Bogotá', country: 'Colombia' },
      { city: 'Santiago', country: 'Chile' },
      { city: 'Buenos Aires', country: 'Argentina' },
      { city: 'Rio de Janeiro', country: 'Brazil' },
      { city: 'Brasília', country: 'Brazil' },
      { city: 'Medellín', country: 'Colombia' },
      { city: 'Lima', country: 'Peru' },
      { city: 'Montevideo', country: 'Uruguay' },
      { city: 'Quito', country: 'Ecuador' },
      { city: 'Panama City', country: 'Panama' },
    ],
  },
]

export const allHubs: readonly Hub[] = hubRegions.flatMap((region) => region.hubs)

export type Corridor = {
  from: string
  to: string
  body: string
  overlap: string
}

export const corridors: readonly Corridor[] = [
  {
    from: 'Lagos',
    to: 'London',
    body:
      'Media, finance, and the diaspora conversation. A brand entering the UK often needs a Nigerian story that reads as an asset, not a curiosity.',
    overlap: 'Same-day overlap through the London afternoon.',
  },
  {
    from: 'Lagos',
    to: 'Nairobi',
    body:
      'East African product, climate, and civic networks. Useful for pan-African launches that need more than a Lagos-only frame.',
    overlap: 'Two-hour morning overlap; async by default.',
  },
  {
    from: 'Lagos',
    to: 'Berlin',
    body:
      'European startup and creative-technology rooms. The work is positioning, product narrative, and a credible route into the ecosystem.',
    overlap: 'Morning overlap; written decisions carry the rest.',
  },
  {
    from: 'Lagos',
    to: 'New York',
    body:
      'Media, fintech, and cultural distribution. The New York morning meets the Lagos afternoon, which makes same-day decisions possible.',
    overlap: 'Four to five hours of shared working time.',
  },
  {
    from: 'Lagos',
    to: 'Dubai',
    body:
      'Trade, capital, and event-led market entry. A practical second market for brands testing demand before committing to a presence.',
    overlap: 'Three-hour offset; easy same-day calls.',
  },
  {
    from: 'Lagos',
    to: 'Bengaluru',
    body:
      'Engineering depth and product delivery. Best used when a growth plan needs a technical partner who can ship, not just advise.',
    overlap: 'Late Lagos afternoon overlaps the Bengaluru evening.',
  },
]

export const remoteSteps = [
  {
    step: '01',
    title: 'Diagnose remotely',
    body:
      'Discovery, audits, and stakeholder interviews happen over calls and shared documents. No travel is required to find the real problem.',
  },
  {
    step: '02',
    title: 'Build in the open',
    body:
      'A shared workspace, weekly demos, and written decision records. You can see the work moving instead of waiting for a reveal.',
  },
  {
    step: '03',
    title: 'Travel when it earns its place',
    body:
      'Workshops, shoots, and launches can happen on site when being in the room changes the outcome. Arranged case by case, not as a default.',
  },
  {
    step: '04',
    title: 'Leave a system',
    body:
      'Documentation, handover, and an operating rhythm the team can keep. The point is capability that remains after the engagement.',
  },
] as const
