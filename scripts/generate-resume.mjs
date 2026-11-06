/**
 * Generates the downloadable résumé PDF from the same verified facts used on
 * the site. Run with: npm run generate:resume
 *
 * Playwright is a dev dependency; the Chromium executable is resolved from
 * PLAYWRIGHT_CHROMIUM_PATH or the installed Playwright browser cache.
 */
import { chromium } from 'playwright'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const outFile = path.join(root, 'public', 'documents', 'David-Oke-Resume-2026.pdf')

const chromeCandidates = [
  process.env.PLAYWRIGHT_CHROMIUM_PATH,
  'C:/Users/C0sm0s/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe',
].filter(Boolean)
const executablePath = chromeCandidates.find((candidate) => existsSync(candidate))

const experience = [
  ['2015 — present', 'Founder & Digital Product Delivery Architect', 'Iridescent Internet Solutions Limited', 'Architect and delivery lead for full-stack products, AI systems, security work, and brand platforms. Founded 2015; incorporated 2017.', 'now'],
  ['2025 — present', 'Founder & Chair, Board of Trustees', 'FEPAR.africa', 'Festac PanAfrican Renaissance Initiatives and/or diaspora foundations, under the brand FEPAR.africa. Public fundraising and programme design.', 'now'],
  ['2024 — 2026', 'BSc Computer Science', 'University of the People', 'Java programming, digital electronics, operating systems, databases, networks, machine learning and AI, and big data. Dean’s List, Term 5, 2024–2025 (CGPA 3.50–3.84).'],
  ['2025', 'Full Stack Engineer', 'Zandbox', 'Fintech product work for a global user base. The engagement has concluded.', 'ended'],
  ['2024 — 2025', 'Growth Partner', 'Helpman Analytics and Insights Limited', 'Data, analytics, and growth partnerships. Contract completed.', 'ended'],
  ['2021 — 2026', 'Cybersecurity Training', 'NITDA / Cisco Networking Academy', 'CyberOps, Ethical Hacking, Endpoint Security, Cyber Threat Management, and Network Defense.'],
  ['2021 — 2022', 'SEO & Email Marketing', 'Trinitas Foundation', 'Organic growth and fundraising campaigns for children’s education initiatives.'],
  ['2020 — 2022', 'SMS Marketing Specialist', 'Michel Holmes Properties', 'Data-driven campaigns, A/B testing, and lead generation for real-estate clients.'],
  ['2017 — 2019', 'Digital Project Manager', 'ITChef Nigeria Ltd', 'Turned client objectives into delivery plans and led cross-functional teams.'],
  ['2004 — 2016', 'Independent Web Developer', 'Freelance · Nigeria', 'Built web pages professionally and freelanced across Nigeria. Online since 2002; the practice began in 2004.'],
]

const projects = [
  ['Iridescent DevSecOps Platform', 'Security', 'An AI orchestrator for code review and vulnerability remediation.'],
  ['Threat Detection Platform', 'Security', 'Specialised agents that detect, analyse, and respond in real time.'],
  ['ROADvision Lagos', 'Civic tech', 'The vision pipeline and operator dashboard behind an infrastructure sentinel.'],
  ['OchukoAi', 'AI & data', 'A multi-agent framework for tools, MCP servers, and multimodal workflows.'],
  ['ATS Résumé Matcher', 'AI & data', 'High-precision candidate matching without the hype.'],
]

const capabilities = [
  ['Product engineering', 'TypeScript · React / Next.js · Node.js · Java · PHP · PostgreSQL · REST / GraphQL'],
  ['AI & automation', 'Python · PyTorch · spaCy · LangChain / CrewAI · RAG · Agentic workflows · YOLOv8'],
  ['Security engineering', 'Threat detection · DevSecOps · SAST / DAST · Cloud security · Vulnerability remediation · CyberOps'],
  ['Design & communication', 'UI / UX · Brand systems · Motion · Video editing · Technical writing · Systems thinking'],
]

const education = [
  ['BSc Computer Science', 'University of the People', 'Jun 2024 — Aug 2026 · still on-going'],
  ['OND · City and Regional Planning', 'Yaba College of Technology, Lagos', 'Sep 2007 — Sep 2009'],
  ['Bachelor of Business Administration', 'Les Cours Sonou University', 'Jun 2012 — Sep 2015'],
  ['Graduate Membership · Human Resources Management', 'Institute of Arts Management & Professional', 'Apr — Jul 2017'],
]

const training = [
  ['CyberOps Associate', 'Cisco Networking Academy', '2021–22'],
  ['Ethical Hacking', 'Cisco Networking Academy · NITDA', '2023'],
  ['Network Defense', 'Cisco Networking Academy', '2026'],
  ['Cyber Threat Management', 'Cisco Networking Academy · NITDA', '2024'],
  ['Endpoint Security', 'Cisco Networking Academy · NITDA', '2023'],
  ['CSS Essentials', 'Cisco Networking Academy', '2026'],
  ['CompTIA A+', 'New Horizons', '2017'],
  ['CompTIA Network+', 'New Horizons', '2017'],
  ['Web Development (LAMP stack)', 'Afrihub GDLI, Abuja', '2021'],
  ['Python programming', 'Afrihub GDLI, Abuja', '2021'],
  ['Graphics Design', 'Afrihub GDLI, Abuja', '2021'],
  ['Cisco CyberOps Associate training', 'Afrihub GDLI, Abuja', '2021'],
  ['AWS Educate — Getting Started with Compute', 'Amazon Web Services', '2023'],
  ['Swift 1st Step & Desktop Publishing', 'N.I.I.T Fortesoft', '2004'],
]

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>David Akpoviroro Oke — Résumé</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #ffffff; color: #14181f; }
  body { font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif; font-size: 9.2pt; line-height: 1.48; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { padding: 13mm 15mm 12mm; }
  a { color: inherit; text-decoration: none; }

  .masthead { border-bottom: 2px solid #14181f; padding-bottom: 7mm; }
  .name { font-family: Georgia, "Times New Roman", serif; font-size: 30pt; line-height: 1.02; letter-spacing: -0.015em; margin: 0; font-weight: 400; }
  .name em { font-style: italic; color: #0e7490; }
  .role { margin: 2.5mm 0 0; font-size: 8.4pt; letter-spacing: 0.14em; text-transform: uppercase; color: #4b5563; }
  .contact { margin-top: 4mm; display: flex; flex-wrap: wrap; gap: 1.6mm 5mm; font-size: 8.4pt; color: #303845; }
  .contact span::before { content: ""; display: inline-block; width: 1.2mm; height: 1.2mm; border-radius: 50%; background: #0e7490; margin-right: 2mm; vertical-align: 0.35mm; }

  .lede { margin: 5mm 0 0; font-size: 9.6pt; line-height: 1.55; color: #2a3240; max-width: 168mm; }

  section { margin-top: 6mm; }
  .section-head { display: flex; align-items: baseline; gap: 3mm; border-bottom: 1px solid #d7dce3; padding-bottom: 1.6mm; margin-bottom: 0.6mm; }
  .section-head h2 { margin: 0; font-size: 8pt; letter-spacing: 0.18em; text-transform: uppercase; color: #0e7490; font-weight: 600; }
  .section-head .note { margin-left: auto; font-size: 7.2pt; letter-spacing: 0.1em; text-transform: uppercase; color: #8a94a1; }

  .entry { display: grid; grid-template-columns: 31mm 1fr; gap: 4mm; padding: 3mm 0; border-bottom: 1px solid #edf0f4; break-inside: avoid; }
  .entry:last-child { border-bottom: 0; }
  .period { font-size: 7.6pt; letter-spacing: 0.06em; text-transform: uppercase; color: #6b7583; padding-top: 0.6mm; }
  .entry h3 { margin: 0; font-size: 10pt; font-weight: 600; color: #14181f; }
  .entry h3 .org { font-weight: 400; color: #4b5563; }
  .entry p { margin: 1.1mm 0 0; color: #4b5563; font-size: 8.8pt; }
  .tag { display: inline-block; margin-left: 2.4mm; font-size: 6.6pt; letter-spacing: 0.1em; text-transform: uppercase; color: #0e7490; border: 0.4pt solid #a5d8e4; border-radius: 1mm; padding: 0.3mm 1.4mm; vertical-align: 0.5mm; }
  .tag-ended { color: #6b7583; border-color: #d7dce3; }
  .services { margin: 2.4mm 0 0; font-size: 8.5pt; line-height: 1.5; color: #303845; max-width: 168mm; }
  .services strong { color: #0e7490; font-weight: 600; }
  .cred-grid { margin: 2.2mm 0 0; padding: 0; list-style: none; columns: 2; column-gap: 8mm; }
  .cred-grid li { break-inside: avoid; position: relative; padding-left: 3.2mm; margin-bottom: 1.25mm; font-size: 7.9pt; line-height: 1.35; color: #3a4350; }
  .cred-grid li::before { content: ""; position: absolute; left: 0; top: 1.55mm; width: 1.1mm; height: 1.1mm; border-radius: 50%; background: #0e7490; }
  .cred-grid .issuer { color: #6b7583; }

  .split { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; }
  .list { margin: 2.4mm 0 0; padding: 0; list-style: none; }
  .list li { position: relative; padding-left: 3.4mm; margin-bottom: 1.7mm; color: #3a4350; font-size: 8.8pt; }
  .list li::before { content: ""; position: absolute; left: 0; top: 2mm; width: 1.3mm; height: 1.3mm; border-radius: 50%; background: #0e7490; }

  .capability { padding: 2.4mm 0; border-bottom: 1px solid #edf0f4; break-inside: avoid; }
  .capability:last-child { border-bottom: 0; }
  .capability h3 { margin: 0; font-size: 9.2pt; font-weight: 600; }
  .capability p { margin: 0.8mm 0 0; color: #4b5563; font-size: 8.4pt; }

  .project { padding: 2.2mm 0; border-bottom: 1px solid #edf0f4; break-inside: avoid; }
  .project:last-child { border-bottom: 0; }
  .project .row { display: flex; align-items: baseline; gap: 3mm; }
  .project h3 { margin: 0; font-size: 9.2pt; font-weight: 600; }
  .project .cat { margin-left: auto; font-size: 6.8pt; letter-spacing: 0.1em; text-transform: uppercase; color: #8a94a1; }
  .project p { margin: 0.6mm 0 0; color: #4b5563; font-size: 8.4pt; }

  .footer { margin-top: 6mm; padding-top: 3mm; border-top: 1px solid #d7dce3; display: flex; justify-content: space-between; gap: 4mm; font-size: 7.6pt; color: #6b7583; }
  .footer a { color: #0e7490; }
  .page-break { break-before: page; }
</style>
</head>
<body>
  <div class="page">
    <header class="masthead">
      <h1 class="name">David Akpoviroro <em>Oke</em></h1>
      <p class="role">Digital Product Delivery Architect · Systems Engineer · Creative Renaissance Man</p>
      <div class="contact">
        <span>Lagos, Nigeria</span>
        <span>+234 904 125 8180 · WhatsApp</span>
        <span>github.com/MrIridescent</span>
        <span>linkedin.com/in/mriridescent</span>
        <span>mriridescent.africa</span>
      </div>
    </header>

    <p class="lede">
      Digital Product Delivery Architect, systems engineer, and founder with more than two
      decades of hands-on experience across the web. I turn complex business problems into
      shipped systems: full-stack products, applied AI, workflow automation, security tooling,
      and civic infrastructure — with a security-first, climate-aware, systems-level view of
      every decision. I lead delivery architecture through Iridescent Internet Solutions
      Limited and chair the Board of Trustees of FEPAR.africa. I studied computer science
      at the University of the People (2024–2026).
    </p>
    <p class="services">
      <strong>Practice:</strong> delivery architecture · custom software · workflow automation
      and AI enablement · growth partnerships for brands · security and DevSecOps · creative
      and brand systems.
    </p>

    <section>
      <div class="section-head"><h2>Experience</h2><span class="note">2002 — present</span></div>
      ${experience
        .map(
          ([period, role, org, detail, status]) => `
        <div class="entry">
          <div class="period">${escape(period)}</div>
          <div>
            <h3>${escape(role)} ${status === 'now' ? '<span class="tag">now</span>' : status === 'ended' ? '<span class="tag tag-ended">ended</span>' : ''}
              <span class="org">· ${escape(org)}</span>
            </h3>
            <p>${escape(detail)}</p>
          </div>
        </div>`
        )
        .join('')}
    </section>

    <section class="page-break">
      <div class="section-head"><h2>Selected projects</h2><span class="note">Open source & client work</span></div>
      ${projects
        .map(
          ([name, category, tagline]) => `
        <div class="project">
          <div class="row"><h3>${escape(name)}</h3><span class="cat">${escape(category)}</span></div>
          <p>${escape(tagline)}</p>
        </div>`
        )
        .join('')}
    </section>

    <div class="split">
      <section>
        <div class="section-head"><h2>Capabilities</h2></div>
        ${capabilities
          .map(
            ([title, items]) => `
          <div class="capability"><h3>${escape(title)}</h3><p>${escape(items)}</p></div>`
          )
          .join('')}
      </section>

      <div>
        <section>
          <div class="section-head"><h2>Education</h2></div>
          ${education
            .map(
              ([credential, school, period]) => `
            <div class="project">
              <div class="row"><h3>${escape(credential)}</h3></div>
              <p>${escape(school)} · ${escape(period)}</p>
            </div>`
            )
            .join('')}
        </section>

        <section>
          <div class="section-head"><h2>Languages</h2></div>
          <ul class="list">
            <li>English — fluent</li>
            <li>French — professional</li>
            <li>Yoruba — fluent</li>
            <li>Hausa — conversational (some)</li>
            <li>Urhobo — conversational (some)</li>
            <li>Okpe — conversational (some)</li>
          </ul>
        </section>
      </div>
    </div>

    <section>
      <div class="section-head"><h2>Training & credentials</h2><span class="note">6 Cisco · 8 additional</span></div>
      <ul class="cred-grid">
        ${training
          .map(
            ([name, issuer, year]) => `
          <li><strong>${escape(name)}</strong> <span class="issuer">· ${escape(issuer)}, ${escape(year)}</span></li>`
          )
          .join('')}
      </ul>
    </section>

    <div class="footer">
      <span>Committed to Green Software, the UN SDGs (especially climate action), and African Union Agenda 2063. References available on request.</span>
      <span><a href="https://mriridescent.africa">mriridescent.africa</a> · <a href="https://github.com/MrIridescent">github.com/MrIridescent</a></span>
    </div>
  </div>
</body>
</html>`

const browser = await chromium.launch({ executablePath })
const page = await browser.newPage({ viewport: { width: 794, height: 1123 } })
await page.setContent(html, { waitUntil: 'load' })
if (process.env.RESUME_PREVIEW) {
  await page.screenshot({ path: process.env.RESUME_PREVIEW, fullPage: true })
}
await page.pdf({
  path: outFile,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
})
await browser.close()
console.log(`Résumé written to ${outFile}`)
