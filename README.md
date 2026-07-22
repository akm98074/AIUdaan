# AIUdaan — Launch Website

A fast, single-page marketing site for **AIUdaan**, built
straight from the *AIUdaan 90-Day Launch Playbook* copy and the *AI Udaan Brand
Guidelines v1.0*.

For launch, the site is scoped to a **single offering** — the individual door —
branded **Ascent: AI-Native Career Acceleration**. (The company / AI-transformation
door has been held back for a later phase.) It does three things and nothing more:

1. **Positioning** — "Your next level isn't a skills problem. It's a last-mile problem."
2. **The program** — *Ascent*: AI-native career acceleration for senior engineers
   and leaders (Staff+, M1+, manager↔IC, up to Director / VP / Partner).
3. **Proof** — testimonials, credentials, coaching track record.

No framework, no build step, no database. Plain HTML/CSS/JS so it loads instantly
and can be hosted literally anywhere — including straight onto your existing GoDaddy
plan. See **[DEPLOY.md](DEPLOY.md)** for how to replace what GoDaddy currently serves.

---

## Directory structure

```
AIUdaan/
├── index.html                  # The one-page site (all copy lives here)
├── 404.html                    # Friendly not-found page
├── .htaccess                   # Apache config for GoDaddy cPanel hosting
│                               #   (HTTPS + www redirect, caching, headers)
├── robots.txt                  # Search-engine crawl directives
├── sitemap.xml                 # Single-URL sitemap
├── site.webmanifest            # PWA / installable metadata
├── README.md                   # This file
├── DEPLOY.md                   # How to publish & replace GoDaddy hosting
├── BRAND.md                    # Brand tokens (colors, logo, taglines)
└── assets/
    ├── css/
    │   └── styles.css          # All styling (brand palette as CSS variables)
    ├── js/
    │   └── main.js             # Mobile-menu toggle + footer year (site works without JS)
    └── img/
        ├── logo-primary.png    # Full wordmark for light backgrounds (header)
        ├── logo-dark.png       # Full wordmark for dark backgrounds (footer)
        ├── icon.png            # Phoenix mark, transparent bg (hero / about)
        ├── favicon.ico         # Multi-size .ico
        ├── favicon-32.png      # 32×32 PNG favicon
        ├── favicon-64.png      # 64×64 PNG favicon
        ├── apple-touch-icon.png# 180×180 iOS home-screen icon
        ├── icon-192.png        # PWA icon
        ├── icon-512.png        # PWA icon
        └── og-image.png        # 1200×630 social-share image
```

All asset references in the HTML are **root-absolute** (`/assets/...`), so the site
must be served from a domain root (which is exactly how GoDaddy serves `public_html`).

---

## Preview locally

Because paths are root-absolute, open it through a tiny web server rather than
double-clicking the file:

```bash
cd AIUdaan
python3 -m http.server 8099
# then visit http://localhost:8099/
```

---

## What you still need to fill in (placeholders)

Search the project for `[` brackets and `TODO`:

| Where | Replace with |
|-------|--------------|
| `index.html` → `[Your Name]` / `[Company A/B/C]` / `[University A/B]` | Your real name, employers, and degrees. |
| `index.html` → Testimonials (`.tcard`) | 4+ real outcome quotes spanning the range (stalled promo, Director→VP, manager↔IC, AI adaptation). |
| `index.html` → Credentials (`.chip`) | Confirm the mentoring claims (Google / Meta / Microsoft) and role history match what you want public. |
| `mailto:hello@aiudaan.ai` & LinkedIn URL | Your real contact email / company LinkedIn. |
| Calendly/booking | Optionally swap the `mailto:` "Book a call" links for your scheduler URL. |

The playbook's bar for "done": a warm lead lands, understands who you are in 10
seconds, sees proof, and books a call. That's it — resist adding a blog, services
matrix, or manifesto; they reduce conversion.

---

## Brand

Pulled directly from **AI Udaan Brand Guidelines v1.0** — see [BRAND.md](BRAND.md)
for the full palette and usage rules. Colors are defined once as CSS variables at
the top of `assets/css/styles.css`.
