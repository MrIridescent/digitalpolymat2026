/**
 * Organization identity registry.
 *
 * Logos are used only to identify the organizations named in David's record.
 * They remain the trademarks of their respective owners. Where no official
 * mark could be sourced, the registry falls back to a designed monogram so the
 * page never invents a logo or leaves a broken image.
 */

export type OrgShape = 'square' | 'wide'

export type Organization = {
  /** Full public name. */
  name: string
  /** Optional shorter name used on chips or alt text. */
  shortName?: string
  /** Public path to the official mark, when one exists. */
  src?: string
  /** Designed fallback when no official mark is available. */
  monogram: string
  /** Wordmarks get a wider tile; marks stay square. */
  shape: OrgShape
  /** Full-bleed square artwork, such as a coloured logo block. */
  bleed?: boolean
  /** Canonical site, kept for documentation and attribution. */
  domain?: string
}

export const organizations = {
  iridescent: {
    name: 'Iridescent Internet Solutions Limited',
    shortName: 'Iridescent Internet Solutions',
    monogram: 'IR',
    shape: 'square',
    domain: 'iridescent.africa',
  },
  fepar: {
    name: 'FEPAR.africa',
    monogram: 'F',
    shape: 'square',
    domain: 'fepar.africa',
  },
  zandbox: {
    name: 'Zandbox',
    monogram: 'Z',
    shape: 'square',
  },
  helpman: {
    name: 'Helpman Analytics and Insights Limited',
    shortName: 'Helpman Analytics',
    monogram: 'H',
    shape: 'square',
  },
  uopeople: {
    name: 'University of the People',
    src: '/media/orgs/university-of-the-people.webp',
    monogram: 'UoP',
    shape: 'square',
    domain: 'uopeople.edu',
  },
  nitda: {
    name: 'NITDA',
    src: '/media/orgs/nitda.webp',
    monogram: 'N',
    shape: 'square',
    domain: 'nitda.gov.ng',
  },
  cisco: {
    name: 'Cisco Networking Academy',
    shortName: 'Cisco',
    src: '/media/orgs/cisco.svg',
    monogram: 'C',
    shape: 'wide',
    domain: 'netacad.com',
  },
  trinitas: {
    name: 'Trinitas Foundation',
    monogram: 'T',
    shape: 'square',
  },
  michelHolmes: {
    name: 'Michel Holmes Properties',
    src: '/media/orgs/michel-holmes-properties.webp',
    monogram: 'MH',
    shape: 'square',
    bleed: true,
    domain: 'michelholmes.com',
  },
  itchef: {
    name: 'ITChef Nigeria Ltd',
    monogram: 'iT',
    shape: 'square',
  },
  school: {
    name: 'Senior secondary school',
    monogram: 'SS',
    shape: 'square',
  },
  freelance: {
    name: 'Freelance',
    monogram: 'FL',
    shape: 'square',
  },
  yabatech: {
    name: 'Yaba College of Technology (Yabatech)',
    shortName: 'Yabatech',
    src: '/media/orgs/yabatech.webp',
    monogram: 'Y',
    shape: 'square',
    domain: 'yabatech.edu.ng',
  },
  lcs: {
    name: 'Les Cours Sonou University (LCS University)',
    shortName: 'Les Cours Sonou',
    src: '/media/orgs/les-cours-sonou.webp',
    monogram: 'LCS',
    shape: 'square',
    domain: 'lcs-edu.com',
  },
  newHorizons: {
    name: 'New Horizons',
    src: '/media/orgs/new-horizons.webp',
    monogram: 'NH',
    shape: 'wide',
    domain: 'newhorizonsnigeria.com',
  },
  afrihub: {
    name: 'Afrihub GDLI',
    shortName: 'Afrihub',
    src: '/media/orgs/afrihub-gdli.webp',
    monogram: 'A',
    shape: 'square',
    domain: 'afrihub.com',
  },
  iamps: {
    name: 'Institute of Arts Management Professionals (I.A.M.P.S)',
    shortName: 'I.A.M.P.S',
    src: '/media/orgs/institute-of-arts-management.webp',
    monogram: 'IA',
    shape: 'square',
  },
  aws: {
    name: 'Amazon Web Services',
    src: '/media/orgs/amazon-web-services.svg',
    monogram: 'AWS',
    shape: 'wide',
    domain: 'aws.amazon.com',
  },
  niit: {
    name: 'N.I.I.T',
    src: '/media/orgs/niit.webp',
    monogram: 'N',
    shape: 'wide',
    domain: 'niit.com',
  },
  roadvision: {
    name: 'ROADvision Lagos',
    monogram: 'RV',
    shape: 'square',
  },
  credly: {
    name: 'Credly',
    src: '/media/orgs/credly.svg',
    monogram: 'CR',
    shape: 'wide',
    domain: 'credly.com',
  },
  orcid: {
    name: 'ORCID',
    src: '/media/orgs/orcid.svg',
    monogram: 'iD',
    shape: 'square',
    domain: 'orcid.org',
  },
  github: {
    name: 'GitHub',
    src: '/media/orgs/github.svg',
    monogram: 'GH',
    shape: 'square',
    domain: 'github.com',
  },
  linkedin: {
    name: 'LinkedIn',
    src: '/media/orgs/linkedin.svg',
    monogram: 'in',
    shape: 'square',
    domain: 'linkedin.com',
  },
  x: {
    name: 'X',
    src: '/media/orgs/x.svg',
    monogram: 'X',
    shape: 'square',
    domain: 'x.com',
  },
  instagram: {
    name: 'Instagram',
    src: '/media/orgs/instagram.svg',
    monogram: 'IG',
    shape: 'square',
    domain: 'instagram.com',
  },
  threads: {
    name: 'Threads',
    src: '/media/orgs/threads.svg',
    monogram: 'TH',
    shape: 'square',
    domain: 'threads.com',
  },
  linktree: {
    name: 'Linktree',
    src: '/media/orgs/linktree.svg',
    monogram: 'LT',
    shape: 'square',
    domain: 'linktr.ee',
  },
  medium: {
    name: 'Medium',
    src: '/media/orgs/medium.svg',
    monogram: 'M',
    shape: 'square',
    domain: 'medium.com',
  },
} as const satisfies Record<string, Organization>

export type OrganizationKey = keyof typeof organizations

type Alias = { match: string; key: OrganizationKey }

/**
 * Ordered deliberately: Cisco is the issuer for combined Cisco · NITDA
 * credentials, while a leading NITDA resolves to the agency.
 */
const aliases: readonly Alias[] = [
  { match: 'Cisco Networking Academy', key: 'cisco' },
  { match: 'NITDA', key: 'nitda' },
  { match: 'Amazon Web Services', key: 'aws' },
  { match: 'New Horizons', key: 'newHorizons' },
  { match: 'Afrihub', key: 'afrihub' },
  { match: 'Institute of Arts Management', key: 'iamps' },
  { match: 'N.I.I.T', key: 'niit' },
  { match: 'University of the People', key: 'uopeople' },
  { match: 'Yaba College', key: 'yabatech' },
  { match: 'Les Cours Sonou', key: 'lcs' },
  { match: 'Michel Holmes', key: 'michelHolmes' },
  { match: 'Iridescent Internet', key: 'iridescent' },
  { match: 'FEPAR', key: 'fepar' },
  { match: 'Zandbox', key: 'zandbox' },
  { match: 'Helpman', key: 'helpman' },
  { match: 'Trinitas', key: 'trinitas' },
  { match: 'ITChef', key: 'itchef' },
  { match: 'ROADvision', key: 'roadvision' },
  { match: 'Credly', key: 'credly' },
  { match: 'ORCID', key: 'orcid' },
  { match: 'GitHub', key: 'github' },
  { match: 'LinkedIn', key: 'linkedin' },
  { match: 'Instagram', key: 'instagram' },
  { match: 'Threads', key: 'threads' },
  { match: 'Linktree', key: 'linktree' },
  { match: 'Linktr.ee', key: 'linktree' },
  { match: 'Medium', key: 'medium' },
  { match: 'X', key: 'x' },
  { match: 'Senior secondary school', key: 'school' },
  { match: 'Freelance', key: 'freelance' },
]

function initials(name: string) {
  const skip = new Set(['of', 'the', 'and', 'for', 'at', 'in', 'a', 'an'])
  const words = name
    .replace(/\([^)]*\)/g, ' ')
    .split(/[\s/·,]+/)
    .map((word) => word.replace(/[^A-Za-z0-9.]/g, ''))
    .filter((word) => word && !skip.has(word.toLowerCase()))

  if (words.length === 0) return '·'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return `${words[0][0]}${words[1][0]}`.toUpperCase()
}

export function orgKeyFor(name: string): OrganizationKey | undefined {
  const clean = name.trim()
  const lower = clean.toLowerCase()

  const exact = aliases.find((alias) => alias.match.toLowerCase() === lower)
  if (exact) return exact.key

  return aliases.find(
    (alias) =>
      alias.match.length > 1 && lower.startsWith(alias.match.toLowerCase())
  )?.key
}

export function organizationFor(name: string): Organization {
  const key = orgKeyFor(name)
  if (key) return organizations[key]

  return {
    name,
    monogram: initials(name),
    shape: 'square',
  }
}
