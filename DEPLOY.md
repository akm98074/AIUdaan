# Deploying AIUdaan & replacing what GoDaddy currently serves

Your domain `aiudaan.ai` is at GoDaddy today. You have **two clean ways** to put
this new site live. Both keep your domain. Pick one.

- **Option A — Stay fully on GoDaddy.** Upload these files into GoDaddy's hosting so
  they replace whatever is there now. Simplest if you already pay for GoDaddy hosting.
- **Option B — Keep the GoDaddy domain, host the site for free elsewhere**
  (Cloudflare Pages / Netlify / GitHub Pages) and just point DNS. Faster site, free
  hosting, automatic HTTPS, deploy-on-git-push. **Recommended.**

First, figure out what you actually have at GoDaddy — it changes the steps.

---

## Step 0 — Identify your current GoDaddy product

Log in → **My Products**. You'll have one of these:

| What you see | What it is | How you replace it |
|--------------|-----------|--------------------|
| **Websites + Marketing** / "Website Builder" | GoDaddy's hosted drag-and-drop builder. **You cannot upload HTML into it.** | Use **Option B** (repoint DNS), or downgrade/switch to cPanel hosting then Option A. |
| **Web Hosting** / **cPanel** / "Linux Hosting" | Real file hosting with a `public_html` folder. | **Option A** — upload files. |
| **Just a domain** (no hosting) | Only the domain is registered. | **Option B** — point DNS to a free host. |

> If you're on **Websites + Marketing**, there is no `public_html` to drop files
> into — that product *is* the website. To use your own HTML you either move to
> cPanel hosting (Option A) or, much easier, host elsewhere and repoint DNS (Option B).

---

## Option A — Upload onto GoDaddy cPanel hosting (replace `public_html`)

This swaps GoDaddy's current files for ours. **Back up first** (see Step A4).

### A1. Get the files as a ZIP
From this project folder, zip the **contents** (not the parent folder):

```bash
cd AIUdaan
zip -r ../aiudaan-site.zip . -x ".git/*"
```

You want `index.html` at the **top level** of the zip, not inside an `AIUdaan/`
subfolder.

### A2. Open File Manager
GoDaddy → **My Products** → your Hosting → **Manage** → **cPanel Admin** →
**Files → File Manager** → open **`public_html`**.

### A3. Clear the old site & upload
1. Inside `public_html`, select the **old** files (e.g. the previous `index.html`,
   builder assets) and **download a copy first** (Step A4), then delete them.
2. Click **Upload**, choose `aiudaan-site.zip`.
3. Back in File Manager, right-click the uploaded zip → **Extract** into `public_html`.
4. Delete the zip afterward.
5. Confirm `public_html/index.html` and `public_html/assets/...` exist.

> **Make sure `.htaccess` uploaded.** It starts with a dot, so enable
> **Settings → Show Hidden Files (dotfiles)** in File Manager. It handles the
> HTTPS + non-www redirect, caching, and the custom 404. If your plan blocks
> `mod_headers`/`mod_expires`, those blocks are wrapped in `<IfModule>` and will be
> ignored safely.

### A4. Back up the old site (do this *before* deleting)
In File Manager select everything in `public_html` → **Compress** → download the
zip. Keep it until you're happy the new site is live.

### A5. Verify
Visit `https://aiudaan.ai` (try an incognito window to dodge cache). Check the
hero, the "Book a diagnostic call" CTA, the section anchors, and
`https://aiudaan.ai/nope` (should show our 404). If you don't have SSL yet, in cPanel use **Security → SSL/TLS
Status → Run AutoSSL**, or GoDaddy's SSL product.

*(FTP alternative: connect with FileZilla using your cPanel FTP credentials and drop
the files into `public_html` — same result without the browser File Manager.)*

---

## Option B — Keep GoDaddy domain, host the site elsewhere (recommended)

You stop using GoDaddy for *hosting* but keep it as your *domain registrar*. The
site is served by a modern static host (free, fast, auto-HTTPS, redeploys on every
git push). Below uses **Cloudflare Pages**; Netlify and GitHub Pages are nearly
identical.

### B1. Push this project to GitHub
```bash
cd AIUdaan
git add -A
git commit -m "AIUdaan launch site"
git push
```

### B2. Create the project on Cloudflare Pages
1. Sign up at **pages.cloudflare.com** → **Create a project** → connect your GitHub repo.
2. Build settings: **Framework preset = None**, **Build command = (blank)**,
   **Output directory = `/`** (the repo root *is* the site — no build step).
3. Deploy. You'll get a free `*.pages.dev` URL to preview.

### B3. Add your domain & repoint DNS at GoDaddy
1. In Cloudflare Pages → your project → **Custom domains** → add `aiudaan.ai`
   (and `www.aiudaan.ai`). Cloudflare shows the DNS records it wants.
2. Two ways to point GoDaddy at it — pick one:
   - **Records only (stay on GoDaddy DNS):** GoDaddy → **Domain → DNS → Manage DNS**.
     Set the records Cloudflare gave you:
     - `A` / `CNAME` for the root `@` → as instructed by Cloudflare Pages
     - `CNAME` for `www` → `your-project.pages.dev`
     Delete the old `A`/`CNAME` records that pointed at GoDaddy hosting.
   - **Full nameserver move (recommended, unlocks Cloudflare's CDN/cache):**
     Add the site at **dash.cloudflare.com** (free plan), then in GoDaddy →
     **Domain → Nameservers → Change → Enter my own nameservers** and paste
     Cloudflare's two nameservers. DNS now lives in Cloudflare.
3. HTTPS is automatic. DNS propagation is usually minutes, up to ~24–48h.

### B4. Verify
Visit `https://aiudaan.ai`. Future updates: edit files → `git push` → live in ~60s.

> **Netlify:** drag-and-drop this folder at app.netlify.com, or connect the repo
> (build command blank, publish directory `.`), then **Domain settings → Add custom
> domain** and follow the same GoDaddy DNS step.
> **GitHub Pages:** repo **Settings → Pages → Deploy from branch → root**, then add a
> `CNAME` file containing `aiudaan.ai` and point GoDaddy DNS at GitHub's IPs.

---

## Which should you pick?

| | Option A (GoDaddy hosting) | Option B (Cloudflare/Netlify + GoDaddy domain) |
|---|---|---|
| Cost | Your existing GoDaddy hosting fee | **Free** |
| Speed | Fine | **Faster (global CDN)** |
| HTTPS | Manual/AutoSSL | **Automatic** |
| Updates | Re-upload files | **`git push`** |
| Uses `.htaccess` | **Yes** | No (rules handled by host config) |
| Best when | You already pay for cPanel & want one vendor | You want the best site for $0 |

If you're on **Websites + Marketing**, Option B is the path of least resistance —
you don't have to migrate or cancel hosting, you just change DNS so the domain
serves this site instead.

---

## Post-launch checklist

- [ ] Fill in real name, employers, degrees, and testimonials in `index.html`.
- [ ] Confirm the mentoring credentials (Google / Meta / Microsoft) are accurate.
- [ ] Set real contact email / LinkedIn (search `hello@aiudaan.ai`).
- [ ] Confirm HTTPS padlock and the non-www → root redirect both work.
- [ ] Submit `https://aiudaan.ai/sitemap.xml` in Google Search Console.
- [ ] Check the `og-image.png` preview by pasting the URL into LinkedIn/Slack.
