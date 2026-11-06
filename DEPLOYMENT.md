# Deployment — Netlify

The portfolio is a static Next.js export published from `out/`, with one Netlify
Function for the contact form. `netlify.toml` already contains the build command,
publish directory, Node version, function bundler, redirects, and headers.

## 1. Connect the repository

1. In Netlify, choose **Add new site → Import an existing project**.
2. Connect GitHub and select `MrIridescent/digitalpolymat2026`.
3. Netlify reads `netlify.toml`, so accept:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
   - **Node version:** 20
4. Deploy. The first build renders every route, including journal articles.

Netlify's Git integration is the primary deploy path: every push to `main`
starts a production build. GitHub Actions runs the same install, type-check, and
build first so a broken commit is caught before or immediately after the push.
A manual Netlify deploy workflow is also available as a fallback.

Do **not** install `@netlify/plugin-nextjs`. This project is a static export
(`output: 'export'`), so Netlify only needs the files in `out/` and the single
function directory declared in `netlify.toml`.

### Moving to a new Netlify account

The current site is out of credits. To move:

1. Import this repository into the new Netlify account.
2. Keep the build settings from `netlify.toml`.
3. Recreate the environment variables in section 2.
4. Add the custom domain in the new site and update DNS.
5. If you used a build hook, create a new one and update
   `BLOG_REBUILD_WEBHOOK_URL` in `.env.local`.

Nothing in the repository is tied to the old account. For the optional Actions
deploy path, replace the `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` repository
secrets with the new site's values.

## 2. Environment variables

Add these in **Site configuration → Environment variables**. Build-time values
are read by `npm run build`; `RESEND_*` is read by the function at runtime.

| Variable | Required | Value / purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://mriridescent.africa` |
| `RESEND_API_KEY` | Yes | Resend API key for the contact form |
| `CONTACT_TO_EMAIL` | Recommended | `me@mriridescent.africa` |
| `CONTACT_FROM_EMAIL` | Recommended | `David Akpoviroro Oke <website@hello.i2sltd.click>` (verified sender) |
| `CONTACT_AUTO_REPLY` | No | `true` by default; `false` disables the visitor acknowledgement |
| `CONTENTFUL_SPACE_ID` | Optional | Enables Contentful journal entries |
| `CONTENTFUL_ACCESS_TOKEN` | Optional | Delivery API token — published content |
| `CONTENTFUL_PREVIEW_ACCESS_TOKEN` | Optional | Preview API token — drafts (local/staging only) |
| `CONTENTFUL_USE_PREVIEW` | Optional | `false` (default) uses Delivery; `true` uses Preview |
| `CONTENTFUL_ENVIRONMENT` | Optional | Defaults to `master` |
| `CONTENTFUL_CONTENT_TYPE` | Optional | Defaults to `blogPost` |
| `CONTENTFUL_LOCALE` | Optional | Sent only when set; otherwise Contentful's master locale |
| `BLOG_REBUILD_WEBHOOK_URL` | Optional | Netlify build hook used by `npm run blog:publish` |

Contentful exposes two read APIs. The **Delivery API** (`cdn.contentful.com`)
returns published entries and is what production uses. The **Preview API**
(`preview.contentful.com`) also returns drafts and requires its own access token.
Set `CONTENTFUL_USE_PREVIEW=true` locally to see a draft before publishing, then
keep it `false` in Netlify — a static export bakes the content it reads, so
preview mode on the production site would publish drafts.

`CONTENTFUL_MANAGEMENT_TOKEN` is only needed locally to publish posts. Do not add
it to Netlify: the build only reads content. Never prefix a secret with
`NEXT_PUBLIC_`, and never commit `.env.local`.

If the Contentful variables are missing or the API fails, the build still
succeeds and renders the local essays in `lib/blog-fallback.ts`.

## 3. Verify Resend

The contact form sends through the Resend REST API.

1. Create a key at [resend.com/api-keys](https://resend.com/api-keys) and add it
   to Netlify as `RESEND_API_KEY`.
2. Verify the sender domain in **Resend → Domains** and publish the DNS records
   Resend shows (SPF, DKIM, and DMARC). The default sender uses
   `hello.i2sltd.click`; once `mriridescent.africa` is verified, switch
   `CONTACT_FROM_EMAIL` to `website@mriridescent.africa`.
3. Wait for the domain to read **Verified**.
4. Confirm delivery without opening the site:

   ```bash
   npm run email:test
   ```

   The script reads `RESEND_API_KEY` from `.env.local`, sends a test to
   `CONTACT_TO_EMAIL` (default `me@mriridescent.africa`), and prints the Resend ID.
   A `403` means the sender domain is not verified yet.

Every enquiry is delivered to `me@mriridescent.africa`, with the visitor's address
set as `Reply-To`. Visitors also receive a short acknowledgement when
`CONTACT_AUTO_REPLY` is not `false`.

Until `RESEND_API_KEY` is present, the function returns a clear 503 and the form
shows a direct email link and a WhatsApp fallback. After the deploy, submit the
form once and confirm both messages arrive.

## 4. Custom domain

1. **Domain management → Add a domain** and enter `mriridescent.africa`.
2. Point the apex `A` record and `www` `CNAME` to the values Netlify shows, or
   move the nameservers to Netlify DNS.
3. Wait for the certificate, then choose the primary domain. `NEXT_PUBLIC_SITE_URL`
   must match it so canonical URLs, Open Graph tags, and the sitemap stay correct.

## 5. Publishing a journal post

```bash
npm run blog:setup      # first time only: create the blogPost content type
npm run blog:validate   # check contentful/post.json without writing
npm run blog:publish    # write, publish, then call the build hook
```

Create the build hook in **Site configuration → Build & deploy → Build hooks**,
copy its URL, and set it as `BLOG_REBUILD_WEBHOOK_URL` in `.env.local` (and in
Netlify if you publish from a Netlify build). Contentful posts are read at build
time, so without a rebuild the published entry will not appear on the live site.

`--no-rebuild` publishes without calling the hook. You can always trigger a deploy
manually from **Netlify → Deploys → Trigger deploy**.

## 6. CI/CD pipeline

Two GitHub Actions workflows live in `.github/workflows`:

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| `ci.yml` | Push to `main`, pull requests, manual | `npm ci`, type-check, static build, upload `out` |
| `deploy-netlify.yml` | Manual | Build and deploy through the Netlify CLI |

`ci.yml` is the guardrail. It uses Node 20 and the committed
`package-lock.json`, so it fails on the same mistakes a clean Netlify checkout
would hit.

The manual deploy workflow is optional. Configure these repository secrets in
**GitHub → Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `NETLIFY_AUTH_TOKEN` | Personal access token from the new Netlify account |
| `NETLIFY_SITE_ID` | API ID of the new Netlify site |

Then run **Actions → Deploy to Netlify → Run workflow**. Site variables such as
`RESEND_API_KEY` still belong in Netlify, not in this workflow.

### Build dependencies

`netlify.toml` no longer sets `NODE_ENV=production`, and it sets
`NPM_FLAGS=--include=dev`. Next.js needs `autoprefixer`, `postcss`,
`tailwindcss`, and TypeScript at build time, and they are devDependencies. If a
build reports `Cannot find module 'autoprefixer'`, confirm that flag is still
present in the Netlify environment.

## 7. Local verification before deploying

```bash
npm run type-check
npm run build
node scripts/preview-server.cjs
```

Open [http://localhost:4173](http://localhost:4173). The preview server mimics
Netlify clean URLs, but `/api/contact` only runs on Netlify (or with
`netlify dev`).

## 8. Troubleshooting

| Symptom | Check |
| --- | --- |
| `Cannot find module 'autoprefixer'` | `NPM_FLAGS=--include=dev` must be set; devDependencies must install |
| `Can't resolve '@/lib/...'` | The file must be committed to the branch Netlify builds; run `git ls-files lib` |
| Build fails on `next build` | Run `npm run type-check` and `npm run build` locally with Node 20 |
| Journal shows only local essays | `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN`, and rebuild after publishing |
| Contact returns 503 | `RESEND_API_KEY` is missing in Netlify |
| Contact returns 502 | Resend rejected the request; verify the sending domain and `CONTACT_FROM_EMAIL` |
| New post not live | The build hook did not run; redeploy from the Netlify dashboard |
| Deep link returns 404 | Confirm `publish = "out"` and the `/api/contact` redirect in `netlify.toml` |
