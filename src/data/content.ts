export const links = {
  github: 'https://github.com/vkotian-King',
  portfolioRepo: 'https://github.com/vkotian-King/vineetkotian',
  linkedin: 'https://www.linkedin.com/in/vineet-kotian-67732993/',
  resume: '/resume.pdf',
  email: 'mailto:vineet.kotian9320@yahoo.in',
};

export type Project = { id: string; title: string; area: string; summary: string; outcomes: string[]; tags: string[]; category: 'Operations' | 'AI systems' | 'Products' | 'Quality'; status?: string; href?: string; action?: string; color: string };
export const projects: Project[] = [
  { id: 'devops-intelligence', title: 'Automated DevOps Intelligence Report', area: 'Engineering operations', summary: 'A recurring release-health pipeline, triggered by one command. It pulls live Bitbucket and Jira data, formats the report, then publishes to Confluence.', outcomes: ['Weekly report writing reduced from hours to minutes; daily on critical-path releases.', 'One command generates the release-health dashboard.', 'Includes reviewer accountability and QE coverage-gap reporting.'], tags: ['Bitbucket API', 'Jira API', 'Confluence', 'TypeScript', 'Custom skill'], category: 'Operations', status: 'In use', color: 'blue' },
  { id: 'vulnerability-pipeline', title: 'Security Vulnerability Scanning Pipeline', area: 'Security engineering', summary: 'A quarterly vulnerability lifecycle across 30 software connectors and active versions, coordinated through a single command.', outcomes: ['A multi-day manual process reduced to a couple of hours.', 'Thirty connectors and active versions scanned in one session.', 'Produces a structured quarterly compliance report with client identifiers omitted.'], tags: ['Snyk', '.NET', 'Compliance', 'Automation'], category: 'Operations', status: 'In use', color: 'orange' },
  { id: 'quality-documentation', title: 'AI-assisted quality documentation', area: 'Quality systems', summary: 'Reworked a Master Quality Plan and SDLC SOP for regulated software, using AI for drafting and gap analysis while retaining human ownership of validation.', outcomes: ['Hotfix and custom-release validation reduced from 14 days to 7 days.', 'Created a document matrix across URS, FRS, SDS, TP and TC.', 'Completed document traceability gap analysis.'], tags: ['Technical writing', 'Quality systems', 'Traceability', 'Regulated software'], category: 'Quality', status: 'Delivered', color: 'purple' },
  { id: 'ai-workbench', title: 'AI Workbench', area: 'Evidence systems · governance', summary: 'A personal evidence system for turning a large ChatGPT history into structured work, skills, learning, ideas, and career evidence—with a private/public boundary before anything reaches the portfolio.', outcomes: ['Information architecture for AI work.', 'Incremental ingestion and change-detection foundation.', 'Privacy-aware public projection.'], tags: ['Python', 'SQLite', 'GitHub', 'AI workflows'], category: 'AI systems', status: 'Building', color: 'teal' },
  { id: 'airwise', title: 'AirWise', area: 'Mobile & web · React Native · Expo', summary: 'A cross-platform air-quality app that detects location, fetches live AQI, applies India NAQI PM2.5 breakpoints, and recommends a best outdoor window from a 24-hour forecast.', outcomes: ['Home and timeline screens with typed components.', 'Custom CPCB PM2.5 AQI calculation and best-time-window detection.', 'iOS, Android and web deployment.'], tags: ['React Native', 'Expo', 'TypeScript', 'OpenWeatherMap API'], category: 'Products', status: 'Shipped', color: 'green', href: 'https://airwise-eight.vercel.app/', action: 'Open AirWise' },
  { id: 'transcript-vault', title: 'YouTube Transcript Vault', area: 'Chrome extension · learning capture', summary: 'A Chrome extension that saves a video’s existing captions as Markdown notes. Visual Moments adds the current video frame alongside transcript notes. No AI, server, or transcription API is needed for capture.', outcomes: ['Captures chapters, description and timestamped transcript.', 'Saves video frames alongside notes.', 'One-click publishing to a GitHub-backed static site.', 'Manifest V3 extension with unit-tested core functions.'], tags: ['Chrome extension', 'Manifest V3', 'File System Access API', 'Static publishing'], category: 'Products', status: 'Shipped', color: 'blue' },
  { id: 'pm-loop', title: 'PM Loop', area: 'Product management · learning app', summary: 'A structured learning app for aspiring product managers, designed to bridge PM theory and day-to-day practice.', outcomes: ['Problem framed and MVP scoped.', 'Self-initiated prototype designed and built.'], tags: ['Product thinking', 'Learning design', 'Prototype'], category: 'Products', status: 'Prototype', color: 'purple', href: 'https://loop-pm-gym.vercel.app/', action: 'Try PM Loop' },
  { id: 'mumbai-dev-tracker', title: 'Mum-Dev-Tracker', area: 'Urban planning · public data', summary: 'A tracker for active development projects across Mumbai, built from public planning data.', outcomes: ['Designed, scoped and shipped solo.', 'Prototype built around public data for Mumbai.'], tags: ['Public data', 'Mumbai', 'Civic technology'], category: 'Products', status: 'Prototype', color: 'orange', href: 'https://mumbai-dev-tracker.vercel.app/', action: 'Open project' },
  { id: 'portpath', title: 'Portpath', area: 'Trade & logistics · India import flow', summary: 'A step-by-step tracker for importing and selling goods in India, mapping a process fragmented across agencies and poorly documented.', outcomes: ['Prototype in feedback with users.', 'Designed around the end-to-end import journey.'], tags: ['Trade', 'Logistics', 'Product discovery'], category: 'Products', status: 'In progress', color: 'teal' },
  { id: 'career-portfolio', title: 'This portfolio', area: 'Reverse engineering · React · TypeScript', summary: 'A personal portfolio evolved from a static page into a multi-route, interactive website using an evidence-led reconstruction workflow.', outcomes: ['Structured project and writing data for reuse.', 'Responsive routes, filters and accessible interactions.', 'Built from real portfolio content, with claims kept traceable.'], tags: ['React', 'TypeScript', 'Vite', 'REA'], category: 'AI systems', status: 'New', color: 'green' },
];

export const articles = [
  { title: 'From Autocomplete to Autopilot', topic: 'LLMs · agents · AI evolution', summary: 'A practical explanation of how language models evolve from predicting the next token toward systems that reason, use tools and act on a user’s behalf.', href: 'https://www.linkedin.com/pulse/from-autocomplete-autopilot-how-language-model-actually-vineet-kotian-ayd6f' },
  { title: 'What Agile Looks Like When AI Does the Work', topic: 'AI-native development · governance', summary: 'How software delivery changes when AI becomes an active execution layer—and why human intent, review and governance still matter.', href: 'https://www.linkedin.com/pulse/what-agile-looks-like-when-ai-does-work-vineet-kotian-zaaff' },
];

export const credentials = [
  ['Certified Scrum Master (CSM)', 'Scrum Alliance', 'blue'],
  ['Lean Six Sigma Green Belt', 'Process improvement & quality', 'green'],
  ['AI Fluency Framework', 'Applied AI collaboration practices', 'purple'],
  ['Claude Code 101 & Claude Code in Action', 'Anthropic', 'orange'],
  ['Foundations of AI and Machine Learning', 'Microsoft', 'teal'],
  ['Product Management Foundation', 'Accredian', 'blue'],
  ['Leadership Accelerator — Servant Leadership Program', 'HERE Technologies', 'green'],
];

export const capabilities = [
  { title: 'Operational problem framing', text: 'Start with the question a workflow needs to answer, then map the data, people and decisions around it.' },
  { title: 'Systems & workflow design', text: 'Shape processes that are repeatable, observable and usable by the people who rely on them.' },
  { title: 'Automation & AI orchestration', text: 'Use APIs, scripts and AI execution layers to remove repetitive work while keeping ownership clear.' },
  { title: 'Quality & governance', text: 'Build traceability, validation and privacy boundaries into the workflow rather than bolting them on.' },
  { title: 'Product building', text: 'Move from a real problem to a useful MVP, test it in context, and improve it through feedback.' },
  { title: 'Delivery leadership', text: 'Coordinate global teams and keep complex work moving across disciplines, time zones and stakeholders.' },
];

export const careerFacts = [
  { value: '14+', label: 'years of experience', detail: 'GIS analyst → project coordinator → project lead → product operations lead' },
  { value: '20+', label: 'direct reports', detail: 'Solid-line people leadership at HERE Technologies' },
  { value: '~60', label: 'global organization', detail: 'Delivery teams across EMEA, Americas and APAC' },
  { value: '30', label: 'connectors scanned', detail: 'One quarterly vulnerability workflow' },
];
