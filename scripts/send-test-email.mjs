#!/usr/bin/env node
/**
 * Verify the Resend setup used by the contact form.
 *
 *   npm run email:test
 *
 * Reads .env.local (or the shell environment), sends one message to
 * CONTACT_TO_EMAIL, and prints the Resend response. It never prints the key.
 */

import { existsSync, readFileSync } from 'node:fs'
import process from 'node:process'

function loadEnvFile(file) {
  if (!existsSync(file)) return
  for (const rawLine of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (!match) continue
    const [, key, rawValue] = match
    if (process.env[key] !== undefined) continue
    let value = rawValue.trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    process.env[key] = value
  }
}

loadEnvFile('.env.local')
loadEnvFile('.env')

const apiKey = process.env.RESEND_API_KEY?.trim()
const to = process.env.CONTACT_TO_EMAIL?.trim() || 'me@mriridescent.africa'
const from =
  process.env.CONTACT_FROM_EMAIL?.trim() ||
  'David Akpoviroro Oke <website@mriridescent.africa>'

if (!apiKey) {
  console.error(
    '\n✖ RESEND_API_KEY is missing.\n' +
      'Add it to .env.local and to Netlify → Site configuration → Environment variables.\n' +
      'Create a key at https://resend.com/api-keys.\n'
  )
  process.exit(1)
}

const sentAt = new Date().toUTCString()
const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from,
    to: [to],
    subject: 'Resend delivery test — mriridescent.africa',
    text: `This is a test from the mriridescent.africa contact form.\n\nSent: ${sentAt}`,
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;padding:24px;color:#15161a">
        <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#999">mriridescent.africa</p>
        <h1 style="font-size:22px">Resend delivery test</h1>
        <p>If you can read this, the contact form can deliver enquiries to <strong>${to}</strong>.</p>
        <p style="color:#777;font-size:13px">Sent ${sentAt}</p>
      </div>`,
  }),
})

const text = await response.text()
if (!response.ok) {
  console.error(`\n✖ Resend responded ${response.status}:\n${text}\n`)
  if (response.status === 403) {
    console.error(
      'The sender domain is probably not verified. Open Resend → Domains, verify mriridescent.africa, and keep CONTACT_FROM_EMAIL on that domain.\n'
    )
  }
  process.exit(1)
}

let id = ''
try {
  id = JSON.parse(text).id ?? ''
} catch {
  // Resend normally returns JSON; the status is enough if it does not.
}

console.log(`\n✓ Test email sent to ${to}${id ? ` (id ${id})` : ''}.`)
console.log('Check the inbox, then submit the live contact form once.\n')
