# Vineet Kotian portfolio

An independently authored React + TypeScript + Vite portfolio, adapted from the public content in [vkotian-King/vineetkotian](https://github.com/vkotian-King/vineetkotian). It takes the previous one-page portfolio and reshapes it as a responsive, multi-route experience with project filters, expandable project outcomes, navigation and original data visualization.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Build with `npm run build`, preview with `npm run preview`, and run route and interaction tests with `npm test`.

## Deployment

The Vercel build outputs `dist/`. The `public/resume.pdf` file is served in development and copied into the production output by Vite. The build script also copies the existing `workbench/` site into the output so `/workbench/` remains available. The Vercel rewrite sends app routes to the React entry point; existing static files take filesystem precedence.

The portfolio is deployed at [https://vineetkotian.vercel.app/](https://vineetkotian.vercel.app/). Its Vercel project is connected to this GitHub repository, so pushes to the configured deployment branch trigger automatic deployments.

## Routes

- `/` — Profile, career indicators, selected work, working method, capabilities, writing and contact
- `/work` and `/projects` — Search-free category filtering and expandable project outcomes
- `/approach` — Work principles, delivery method and capabilities
- `/writing` — Published writing links
- `/direction` — AI systems and product lifecycle learning maps
- `/credentials` — Listed certifications and career snapshot
- `/contact` — Email, LinkedIn, GitHub and résumé links
- Other paths — Not found

## Content and evidence

Project details, metrics, article URLs, credentials, contact links and career claims are adapted from the public portfolio repository’s `README.md` and `index.html`. Client identifiers remain omitted as in the source. Outcome figures are presented as supplied in the portfolio; they are not independently audited here. Workbench's existing REA capture files and reconstruction brief are retained as the record of the prior experiment.

The design, page breakdown, project filters, system-map illustration, and interactive details panels are original implementation choices. Project links are only shown where the existing portfolio provided a live destination. External profile and résumé links point to the portfolio owner's public GitHub/LinkedIn material.

## Known limitations

- The portfolio is a static frontend. It does not have a CMS, analytics, or contact form; contact opens an email client.
- Project content reflects the public repository as inspected for this build and may need refreshing as projects change.
- Some projects do not have a verified public demo URL, so their outcome details expand locally without an outbound project button.
- Google Fonts load remotely when network access is available; system sans-serif fallbacks remain in place.
- No changes have been pushed to the GitHub repository or deployed site.
