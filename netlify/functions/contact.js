/**
 * Contact endpoint for mriridescent.africa.
 *
 * The site is a static Next.js export, so the form posts JSON here through the
 * `/api/contact` redirect in netlify.toml.
 *
 * Delivery order:
 *   1. Resend REST API (RESEND_API_KEY)
 *   2. SMTP via nodemailer (SMTP_HOST, SMTP_USER, SMTP_PASS)
 *
 * Required environment variables:
 *   RESEND_API_KEY      from resend.com; the only required secret
 *
 * Optional:
 *   CONTACT_TO_EMAIL    defaults to me@mriridescent.africa
 *   CONTACT_FROM_EMAIL  defaults to "David Akpoviroro Oke <website@mriridescent.africa>"
 *   SMTP_*              fallback delivery when Resend is not configured
 *
 * Optional:
 *   CONTACT_AUTO_REPLY  set to "false" to disable the visitor confirmation
 *   SMTP_PORT, SMTP_SECURE, SMTP_FROM
 */

const JSON_HEADERS = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
}

const LIMITS = {
  name: 120,
  email: 200,
  company: 160,
  projectType: 160,
  service: 120,
  message: 6000,
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify(body),
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function clean(value, max) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .trim()
    .slice(0, max)
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
}

function parseBody(event) {
  if (!event.body) return {}
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : event.body
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function buildMessage(payload, reference) {
  const subject = `New enquiry — ${payload.projectType || 'General'} — ${payload.name}`
  const received = new Date().toUTCString()

  const text = [
    `New enquiry from mriridescent.africa`,
    `Reference: ${reference}`,
    `Received: ${received}`,
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || '—'}`,
    `About: ${payload.projectType || '—'}`,
    `Service interest: ${payload.service || '—'}`,
    '',
    'Message:',
    payload.message,
  ].join('\n')

  const rows = [
    ['Reference', reference],
    ['Name', payload.name],
    ['Email', payload.email],
    ['Company', payload.company || '—'],
    ['About', payload.projectType || '—'],
    ['Service interest', payload.service || '—'],
    ['Received', received],
  ]

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f4ef;padding:28px;color:#15161a">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e4e0d6;border-radius:14px;overflow:hidden">
        <div style="background:#08090c;padding:20px 26px;color:#f7f5ef">
          <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#a7a9b1">mriridescent.africa</div>
          <div style="font-size:22px;margin-top:6px">New enquiry</div>
        </div>
        <div style="padding:26px">
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td style="padding:7px 0;color:#777;width:140px">${escapeHtml(
                    label
                  )}</td><td style="padding:7px 0">${escapeHtml(value)}</td></tr>`
              )
              .join('')}
          </table>
          <div style="margin-top:22px;padding-top:18px;border-top:1px solid #eee">
            <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#999;margin-bottom:10px">Message</div>
            <div style="white-space:pre-wrap;line-height:1.65;font-size:14px">${escapeHtml(
              payload.message
            )}</div>
          </div>
          <p style="margin-top:26px;font-size:12px;color:#999">Reply directly to this email to answer ${escapeHtml(
            payload.name
          )}.</p>
        </div>
      </div>
    </div>`

  return { subject, text, html }
}

async function sendWithResend({ apiKey, from, to, payload, subject, text, html }) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject,
      text,
      html,
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 300)}`)
  }

  return response.json().catch(() => ({}))
}

async function sendWithSmtp({ from, to, payload, subject, text, html }) {
  let nodemailer
  try {
    // Loaded lazily so the function still works when only Resend is configured.
    nodemailer = require('nodemailer')
  } catch {
    throw new Error('SMTP is configured but nodemailer is not installed.')
  }

  const port = Number(process.env.SMTP_PORT || 587)
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transport.sendMail({
    from,
    to,
    replyTo: payload.email,
    subject,
    text,
    html,
  })
}

async function sendAutoReply({ payload, subject, from, apiKey }) {
  if (!apiKey) return
  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f4ef;padding:28px;color:#15161a">
      <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4e0d6;border-radius:14px;padding:28px">
        <p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#999">David Akpoviroro Oke · Mr Iridescent</p>
        <p style="font-size:18px;margin-top:16px">Thank you — your message arrived.</p>
        <p style="font-size:14px;line-height:1.7;color:#444">I read every enquiry myself and will reply within two business days. If it is urgent, reply here and let me know.</p>
        <p style="font-size:14px;line-height:1.7;color:#444">For context, this is what you sent:</p>
        <blockquote style="margin:18px 0;padding:14px 18px;border-left:3px solid #06b6d4;background:#faf9f6;color:#555;font-size:13px;line-height:1.65">${escapeHtml(
          payload.message
        )}</blockquote>
        <p style="font-size:13px;color:#777;margin-top:22px">David Akpoviroro Oke<br/>Digital Product Delivery Architect<br/>mriridescent.africa</p>
      </div>
    </div>`

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [payload.email],
      subject: `Received — ${subject.replace(/^New enquiry — /, '')}`,
      html,
    }),
  })
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: JSON_HEADERS, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, message: 'Method not allowed.' })
  }

  const body = parseBody(event)
  if (!body) {
    return json(400, { ok: false, message: 'Invalid request body.' })
  }

  // Honeypot: silently accept so bots do not learn the rule.
  if (clean(body['bot-field'], 200)) {
    return json(200, { ok: true, reference: 'MR-RECEIVED' })
  }

  const payload = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email).toLowerCase(),
    company: clean(body.company, LIMITS.company),
    projectType: clean(body.projectType, LIMITS.projectType),
    service: clean(body.service, LIMITS.service),
    message: clean(body.message, LIMITS.message),
  }

  if (payload.name.length < 2) {
    return json(400, { ok: false, message: 'Please add your name.' })
  }
  if (!isEmail(payload.email)) {
    return json(400, { ok: false, message: 'Please add a valid email address.' })
  }
  if (payload.message.length < 10) {
    return json(400, {
      ok: false,
      message: 'Please add a little more context to the message.',
    })
  }

  // Every enquiry lands in this inbox. The environment variable can override
  // it, but the default keeps the form working even if Netlify is missing it.
  const to = process.env.CONTACT_TO_EMAIL || 'me@mriridescent.africa'
  const from =
    process.env.CONTACT_FROM_EMAIL ||
    process.env.SMTP_FROM ||
    'David Akpoviroro Oke <website@mriridescent.africa>'
  const resendKey = process.env.RESEND_API_KEY
  const smtpReady = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  )

  if (!resendKey && !smtpReady) {
    return json(503, {
      ok: false,
      message:
        'Email delivery is not configured yet. Please email me@mriridescent.africa or use WhatsApp.',
    })
  }

  const reference = `MR-${Date.now().toString(36).toUpperCase()}`
  const { subject, text, html } = buildMessage(payload, reference)

  try {
    if (resendKey) {
      await sendWithResend({
        apiKey: resendKey,
        from,
        to,
        payload,
        subject,
        text,
        html,
      })

      if (process.env.CONTACT_AUTO_REPLY !== 'false') {
        // Wait for this send so Netlify does not freeze the function before
        // the acknowledgement leaves. A failure never blocks the enquiry.
        try {
          await sendAutoReply({ payload, subject, from, apiKey: resendKey })
        } catch (error) {
          console.warn('Auto-reply failed:', error.message)
        }
      }
    } else {
      await sendWithSmtp({ from, to, payload, subject, text, html })
    }

    return json(200, { ok: true, reference })
  } catch (error) {
    console.error('Contact delivery failed:', error)
    return json(502, {
      ok: false,
      message:
        'The message could not be delivered right now. Please try WhatsApp and I will pick it up there.',
    })
  }
}
