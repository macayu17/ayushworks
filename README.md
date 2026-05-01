# Ayush Kumar Portfolio Website

This repository contains my personal portfolio website built with React and Vite.
It is a route-based single-page experience with sections for projects, skills, about, and contact.

## What This Project Includes

- A custom portfolio UI with animated transitions and responsive layouts
- Project archive and individual project detail pages
- GitHub contribution heatmap section
- Contact form integration (Formspree)
- View counter flow with a serverless API proxy

## Tech Stack

- React 19
- Vite 7 (rolldown-vite)
- React Router
- Framer Motion
- React Icons
- Three.js related packages for visual components
- Plain CSS modules/files per component

## Run Locally

### Prerequisites

- Node.js 20.19+ (or 22.12+)
- npm

### Setup

```bash
git clone https://github.com/macayu17/ayushworks.git
cd ayushworks
npm install
```

### Start Development Server

```bash
npm run dev
```

Open `http://localhost:5173`.

## Run as a Production Build Locally

Build the app:

```bash
npm run build
```

Then preview it:

```bash
npm run preview
```

Vite will print the local preview URL (default is usually `http://localhost:4173`).

## Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build in `dist/`
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint checks

## Project Layout

```text
api/
  portfolio-meta.js        # Serverless endpoint used by live view counter
src/
  main.jsx                 # React bootstrap with BrowserRouter
  App.jsx                  # App shell and route definitions
  pages/                   # Route-level pages
  components/              # Reusable UI sections/components
  data/projects.js         # Project content source of truth
  utils/viewCounter.js     # View counting logic (dev and live modes)
public/                    # Static files
```

## Routes

- `/` - Home
- `/about` - About
- `/projects` - Project archive
- `/projects/:slug` - Project detail page
- `/skill` - Skills
- `/contact` - Contact

## Content Editing Guide

- Update project cards and project details in `src/data/projects.js`
- Update personal info in `src/components/About/About.jsx`
- Update skills in `src/components/Skills/Skills.jsx`
- Update contact text and form behavior in `src/components/Contact/Contact.jsx`

## Integration Notes

- The contact form currently posts to Formspree from `src/components/Contact/Contact.jsx`.
- The live view counter calls `/api/portfolio-meta`, which proxies CounterAPI.
- In development, a local/session storage fallback counter is used.

If you deploy this as static-only hosting without serverless functions, the live counter endpoint will not be available unless you provide an equivalent backend route.

## Author

Ayush Kumar  
GitHub: https://github.com/macayu17
