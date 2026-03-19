import occasioImage from '../assets/images/occasio.png';
import gridPulseImage from '../assets/images/f1.png';
import equityFlowImage from '../assets/images/equityflow.png';
import attendlyImage from '../assets/images/attendly.png';
import vectorImage from '../assets/images/vector.png';
import sentinelImage from '../assets/images/Sentinel.png';

const rawProjectCatalog = [
  {
    slug: 'occasio',
    title: 'Occasio',
    status: 'Live',
    category: 'Event management and booking platform',
    summary: 'Event ops platform with registrations, payments, ticketing, check-in, analytics, and team workflows.',
    details: [
      'Occasio is a full-stack event management system for organizers and attendees, covering event discovery, registration, payments, ticketing, and operational workflows from one product surface.',
      'The platform combines a React plus Vite frontend with a Node.js, Express, Prisma, and PostgreSQL backend, adding organizer analytics, broadcast messaging, team roles, certificate workflows, and queue-backed ticket and email processing.'
    ],
    highlights: [
      'Public and admin flows for event discovery, registration, and scanner-based check-in',
      'Organizer analytics, team access controls, and broadcast messaging workflows',
      'Certificate designer, ticket styling, reminders, polls, and reviews',
      'Queue-based QR ticket generation, email delivery, and payment fulfillment'
    ],
    tags: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    github: 'https://github.com/macayu17/Occasio',
    live: 'https://occasio.ayushh.in/',
    image: occasioImage,
    accent: '#fb7185'
  },
  {
    slug: 'gridpulse',
    title: 'GridPulse',
    status: 'Live',
    category: 'Formula 1 telemetry analytics platform',
    summary: 'Telemetry analytics and replay platform for race data ingestion, visualization, and real-time monitoring.',
    details: [
      'GridPulse is a Formula 1 telemetry analytics platform built for ingesting and analyzing high-frequency race data streams, then replaying them through a driver-focused visual analytics experience.',
      'The stack uses FastAPI, React, D3.js, Docker, and PostgreSQL to power telemetry replay, streaming dashboards, and sub-100 millisecond updates for track position, pace, and race-event reconstruction.'
    ],
    highlights: [
      'FastAPI ingestion service handling 5000+ telemetry datapoints per minute',
      'Caching and streaming architecture for sub-100ms dashboard refreshes',
      'Telemetry replay pipelines synchronized across driver data streams',
      'Interactive analytics dashboards for race monitoring and driver performance'
    ],
    tags: ['FastAPI', 'React', 'D3.js', 'Docker', 'PostgreSQL', 'Python'],
    github: 'https://github.com/macayu17/f1-replay-system',
    live: 'https://gridpulse.ayushh.in',
    image: gridPulseImage,
    accent: '#38bdf8'
  },
  {
    slug: 'parkinsons-screening',
    title: "Text-Based Parkinson's Screening",
    status: 'Completed',
    category: 'Clinical ML screening platform',
    summary: 'Transformer-led clinical screening workflow with Flask inference and 42K-patient model training.',
    details: [
      'This project focuses on text-based Parkinson\'s disease screening using transformer models and ensemble learning on roughly 42,000 patient records, packaged as a clinical assessment portal.',
      'The system combines PubMedBERT, BioGPT, Clinical-T5, traditional ML baselines, and a Flask inference interface to support reproducible training, evaluation, and clinician-friendly prediction workflows.'
    ],
    highlights: [
      'NLP diagnostic pipeline trained on 42K+ patient records with 92% reported accuracy',
      'Fine-tuned PubMedBERT, BioGPT, and Clinical-T5 for screening use cases',
      'Reproducible training and evaluation pipeline with ablation-style experimentation',
      'Production-ready Flask inference API for interactive clinical prediction'
    ],
    tags: ['Python', 'PyTorch', 'Transformers', 'Flask', 'LightGBM'],
    github: 'https://github.com/macayu17/Parkinsons-Disease-Assesment-Portal',
    live: 'https://huggingface.co/spaces/Penguindrum920/Parkinson_Disease_Assesment_Portal',
    image: null,
    accent: '#22c55e'
  },
  {
    slug: 'sentinel',
    title: 'Sentinel',
    status: 'Ongoing',
    category: 'Market microstructure simulator',
    summary: 'Multi-agent market simulator with liquidity shock prediction and hidden institutional order detection.',
    details: [
      'Sentinel is a real-time market microstructure simulator built to study liquidity shocks, large hidden orders, and institutional activity through a multi-agent trading environment.',
      'It combines a FastAPI simulation backend with ML-driven early-warning models and a Next.js plus TypeScript dashboard so order-book activity, predictions, and market stress signals can be monitored live.'
    ],
    highlights: [
      'Simulation of high-frequency order book activity with 7+ trading agents and thousands of events per second',
      'Liquidity shock predictor reporting 60 to 90 second early warnings with 85% accuracy on crash-style events',
      'Hidden institutional order detection for TWAP, VWAP, and iceberg-style execution patterns at 83% accuracy',
      'Bloomberg-style real-time dashboard powered by WebSockets, Next.js, and TypeScript'
    ],
    tags: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'WebSockets', 'XGBoost'],
    github: 'https://github.com/macayu17/SENTINEL',
    live: 'https://sentinel.ayushh.in/',
    image: sentinelImage,
    accent: '#f97316'
  },
  {
    slug: 'equityflow',
    title: 'EquityFlow',
    status: 'Live',
    category: 'Real-time paper trading platform',
    summary: 'Paper trading for stocks, F&O, and commodities with live pricing, portfolio P&L, and contract-aware execution.',
    details: [
      'EquityFlow is a real-time paper trading platform for stocks, derivatives, and commodities, designed around live market data, portfolio accounting, and execution flows that mirror trading behavior without real capital exposure.',
      'The system pairs a Next.js and React frontend with a FastAPI backend to handle streaming price updates, holdings and order accounting, realized and unrealized P&L, and F&O contract resolution against a large indexed instrument set.'
    ],
    highlights: [
      'Live market updates with directional flash indicators on price ticks',
      'Portfolio, holdings, average price, order history, and P&L accounting flows',
      'F&O symbol resolution layer built around a 40k+ instrument universe',
      'Responsive trading dashboard using Zustand and charting-focused UI components'
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'FastAPI', 'Python', 'Tailwind CSS', 'Zustand'],
    github: 'https://github.com/macayu17/Equityflow',
    live: 'https://equityflow.ayushh.in',
    image: equityFlowImage,
    accent: '#eab308'
  },
  {
    slug: 'multimodal-sentiment',
    title: 'Multimodal Sentiment',
    status: 'Completed',
    category: 'Applied AI research prototype',
    summary: 'Sentiment analysis using text, vision & audio transformers.',
    details: [
      'This project investigates sentiment analysis through multiple input channels rather than relying on text alone.',
      'By combining language, visual, and audio representations, the system is structured to capture a broader emotional signal for more robust classification experiments.'
    ],
    highlights: [
      'Fusion of text, image, and audio signals',
      'Transformer-led modeling pipeline',
      'Research-oriented experimentation across modalities',
      'Computer vision and audio processing in one workflow'
    ],
    tags: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV'],
    github: 'https://github.com/macayu17',
    live: null,
    image: null,
    accent: '#a855f7'
  },
  {
    slug: 'attendly',
    title: 'Attendly',
    status: 'Live',
    category: 'Student attendance tracking platform',
    summary: 'Attendance tracker with bunk buffer insights, timetable planning, history edits, and Supabase-backed persistence.',
    details: [
      'Attendly is a smart attendance tracker for students, built around day-to-day subject management, attendance logging, and fast visibility into how safely classes can be skipped without dropping below minimum requirements.',
      'The product combines a React, TypeScript, and Vite frontend with Supabase, Zustand, and PostgreSQL to support timetable-aware tracking, multi-session classes, attendance history editing, and a polished dashboard experience.'
    ],
    highlights: [
      'One-click present, absent, and cancelled attendance logging per subject',
      'Bunk buffer and recovery tracking to show skip margin and catch-up needs',
      'Timetable integration with support for multiple sessions in the same day',
      'Attendance history editing, next-class visibility, and student-focused dashboard flows'
    ],
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Zustand'],
    github: 'https://github.com/macayu17/attendly',
    live: 'https://attendly.ayushh.in',
    image: attendlyImage,
    accent: '#6366f1'
  },
  {
    slug: 'vector',
    title: 'Vector',
    status: 'Live',
    category: 'Job application tracking system',
    summary: 'Kanban-style job search tracker with analytics, calendar planning, and local-first application management.',
    details: [
      'Vector is a modern job application tracking system built for managing the full application pipeline, from wishlist and outreach to interviews, offers, and rejections inside a Kanban-driven workflow.',
      'It uses Next.js, TypeScript, Tailwind CSS, Zustand, and drag-and-drop UI primitives to combine application tracking, analytics, event scheduling, and local-first persistence inside a polished glassmorphism interface.'
    ],
    highlights: [
      'Drag-and-drop Kanban board for moving applications across search stages',
      'Analytics dashboard for status distribution, interview rate, and offer tracking',
      'Calendar workflows for interviews, OAs, follow-ups, and upcoming event visibility',
      'Local-first persistence with import and export support for private job-search management'
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'dnd-kit', 'Radix UI', 'Zod'],
    github: 'https://github.com/macayu17/Vector',
    live: 'https://vector.ayushh.in',
    image: vectorImage,
    accent: '#60a5fa'
  }
];

const projectDisplayOrder = [
  'sentinel',
  'equityflow',
  'gridpulse',
  'occasio',
  'attendly',
  'parkinsons-screening',
  'vector',
  'multimodal-sentiment'
];

const projectLookup = new Map(rawProjectCatalog.map((project) => [project.slug, project]));

export const projectCatalog = projectDisplayOrder
  .map((slug) => projectLookup.get(slug))
  .filter(Boolean);

export const featuredProjects = projectCatalog.slice(0, 4);

export const getProjectBySlug = (slug) =>
  projectCatalog.find((project) => project.slug === slug);
