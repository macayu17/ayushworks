import occasioImage from '../assets/images/occasio.png';
import gridPulseImage from '../assets/images/f1.png';

export const projectCatalog = [
  {
    slug: 'occasio',
    title: 'Occasio',
    status: 'Live',
    category: 'Full-stack event platform',
    summary: 'Event booking with payments, QR tickets & admin dashboard.',
    details: [
      'Occasio is a discovery-to-booking platform for events, designed to help users browse listings, complete checkout, and receive digital access without friction.',
      'The product flow combines attendee-facing booking screens with organizer-facing administration so events, registrations, and ticket validation can be managed from one place.'
    ],
    highlights: [
      'Event discovery and registration workflow for live experiences',
      'Integrated payment flow using Razorpay',
      'QR-based ticket generation for attendee access',
      'Admin dashboard for event and booking management'
    ],
    tags: ['React', 'Tailwind', 'Node.js', 'Razorpay'],
    github: 'https://github.com/macayu17/events-management-booking.git',
    live: 'https://occasio.ayushh.in/',
    image: occasioImage,
    accent: '#fb7185'
  },
  {
    slug: 'gridpulse',
    title: 'GridPulse',
    status: 'Live',
    category: 'F1 analytics dashboard',
    summary: 'F1 race analytics with telemetry replay & track visualization.',
    details: [
      'GridPulse turns Formula 1 race data into an interactive replay experience with timing context, telemetry views, and circuit-level race tracking.',
      'The interface is built around analysis and storytelling, making it easier to inspect driver pace, on-track position, and race evolution lap by lap.'
    ],
    highlights: [
      'Telemetry replay for race sessions',
      'Interactive track visualization with driver positioning',
      'Supporting race panels for timing and session context',
      'Backend services tailored for motorsport data processing'
    ],
    tags: ['React', 'Vite', 'FastAPI', 'Python'],
    github: 'https://github.com/macayu17/f1-replay-system.git',
    live: 'https://pitwall.ayushh.in/',
    image: gridPulseImage,
    accent: '#38bdf8'
  },
  {
    slug: 'parkinsons-screening',
    title: "Parkinson's Screening",
    status: 'Completed',
    category: 'Clinical ML screening tool',
    summary: 'Clinical screening using transformer-based ML models.',
    details: [
      'This project explores a screening workflow for Parkinson\'s-related assessment using transformer-based machine learning models.',
      'The emphasis is on packaging advanced models inside an accessible interface so prediction results can be surfaced in a way that is easier to review and interpret.'
    ],
    highlights: [
      'Transformer-based modeling for health screening workflows',
      'Interactive assessment interface',
      'Prediction-focused result presentation',
      'Prototype deployment through a public demo'
    ],
    tags: ['Python', 'PyTorch', 'Flask', 'Transformers'],
    github: 'https://github.com/macayu17/Parkinsons-Disease-Assesment-Portal.git',
    live: 'https://huggingface.co/spaces/Penguindrum920/Parkinson_Disease_Assesment_Portal',
    image: null,
    accent: '#22c55e'
  },
  {
    slug: 'fraudkavach',
    title: 'FraudKavach',
    status: 'Completed',
    category: 'Fintech risk simulator',
    summary: 'Fintech payment simulator with fraud detection & explainable risk scoring.',
    details: [
      'FraudKavach is framed as a payment simulation environment where suspicious behavior can be analyzed instead of treated as a black-box outcome.',
      'Alongside transaction flows, the project focuses on explainable scoring so risky events can be surfaced with enough context to support trust and review.'
    ],
    highlights: [
      'Payment simulation for testing transaction scenarios',
      'Fraud detection flow with risk scoring',
      'Explainability-oriented output for suspicious activity',
      'Full-stack architecture for analysis and presentation'
    ],
    tags: ['React', 'TypeScript', 'Node.js', 'Express.js'],
    github: 'https://github.com/macayu17/FraudKavach.git',
    live: null,
    image: null,
    accent: '#f97316'
  },
  {
    slug: 'stockflow',
    title: 'StockFlow',
    status: 'Completed',
    category: 'Paper trading platform',
    summary: 'Paper-trading platform with real-time quotes, portfolios & leaderboards.',
    details: [
      'StockFlow is a simulated trading experience built around portfolio creation, quote tracking, and competitive performance comparison without real money exposure.',
      'The platform structure blends market data, portfolio state, and ranking systems so users can practice decision-making in a more game-like environment.'
    ],
    highlights: [
      'Paper-trading workflow for simulated investing',
      'Real-time quote integration for market context',
      'Portfolio tracking and management views',
      'Leaderboards to compare user performance'
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/macayu17/Trade-Wars.git',
    live: null,
    image: null,
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
  }
];

export const featuredProjects = projectCatalog.slice(0, 4);

export const getProjectBySlug = (slug) =>
  projectCatalog.find((project) => project.slug === slug);
