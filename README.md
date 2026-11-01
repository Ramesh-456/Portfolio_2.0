# Ramesh S | Full Stack Developer Portfolio

A single-page, animated portfolio website for **Ramesh S**, a Full Stack Developer specializing in Angular, Spring Boot, Node.js, AWS, PostgreSQL, Docker, and Kubernetes.

## Features

- Responsive hero section with an animated Three.js scene canvas
- Scroll-triggered reveal animations powered by GSAP
- Data-driven content — all resume content (profile, education, skills, experience, projects) lives in a single data file and is rendered dynamically
- Auto-updating experience duration — the "X Years Y Months" badge recalculates itself based on the configured start date, so it never goes stale
- Section-based scroll navigation with active-link highlighting
- Deep-linkable sections via URL hash (`#about`, `#experience`, `#projects`, `#contact`)

## Tech Stack

| Layer      | Technology                        |
|------------|------------------------------------|
| Markup     | HTML5                              |
| Styling    | CSS3 (Google Fonts: Space Grotesk, Outfit) |
| Animation  | [Three.js](https://threejs.org/) r128, [GSAP](https://gsap.com/) 3.11.4 |
| Scripting  | Vanilla JavaScript (no build step) |

## Project Structure

```
.
├── index.html            # Page markup and layout
├── style.css             # Styling
├── data/
│   └── resume-data.js    # Single source of truth for all resume content
│   └── logos/            # Company logos used in the experience timeline
└── js/
    └── main.js            # Rendering, animations, and scroll logic
```

## Getting Started

No build tools or dependencies are required.

1. Clone or download this repository.
2. Open `index.html` directly in a browser, or serve it locally:
   ```bash
   npx serve .
   ```
3. Visit the served URL (e.g. `http://localhost:3000`).

## Updating Content

All resume content is centralized in `data/resume-data.js` as a single `RESUME_DATA` object:

- `personal` — name, title, contact info
- `hero` — headline, summary, hero metrics
- `profile` / `education` / `skills` — about section content
- `signals` — strengths/highlights strip
- `experience` — work history, responsibilities, tech stack, and case study per role
- `workflow` / `languages` — ways-of-working and language pills

Update the fields in this file to refresh the site — no HTML changes are needed for content updates.

### Experience duration

The hero eyebrow badge and page title auto-calculate "X Years Y Months" of experience from a configured start date in `js/main.js` (`updateExperienceDynamically`). Update the `startDate` there if the career start date changes.

## Deployment

This is a fully static site — it can be deployed as-is to any static host (GitHub Pages, Netlify, Vercel, S3, etc.) with no build step.

## Contact

- **Email:** rameshsgbm456@gmail.com
- **Phone:** +91 6379159249
- **Location:** Chennai, India
