import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Sidebar from './components/Sidebar/Sidebar';
import SectionIndex from './components/SectionIndex/SectionIndex';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Footer from './components/Footer/Footer';
import BootScreen from './components/BootScreen/BootScreen';
import MatrixRain from './components/MatrixRain/MatrixRain';
import { applySeoMetadata, getSeoMetadataForPath } from './utils/seo';

// Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Skills = lazy(() => import('./pages/Skills'));
const Contact = lazy(() => import('./pages/Contact'));
const ProjectsPage = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const OpenSourcePage = lazy(() => import('./pages/OpenSource'));
const Resume = lazy(() => import('./pages/Resume'));
const AiSummaryDock = lazy(() => import('./components/AiSummaryDock/AiSummaryDock'));
const CommandPalette = lazy(() => import('./components/CommandPalette/CommandPalette'));
const THEME_STORAGE_KEY = 'site-theme-revamp';

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return 'dark';
};

const applyThemeToDocument = (nextTheme) => {
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute('content', nextTheme === 'light' ? '#f5f1e8' : '#000000');
  }
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: '#ff8888', background: '#222', zIndex: 99999, position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', fontFamily: 'monospace' }}>
          <h2>React Crash Detected:</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const PageFallback = () => (
  <div className="page-loader" role="status" aria-live="polite">
    <span>Loading route...</span>
  </div>
);

function App() {
  const location = useLocation();
  const seoMetadata = useMemo(
    () => getSeoMetadataForPath(location.pathname),
    [location.pathname],
  );
  const isWideRoute =
    location.pathname === '/projects' ||
    location.pathname.startsWith('/projects/') ||
    location.pathname === '/open-source' ||
    location.pathname === '/resume';
  const showSectionIndex = location.pathname === '/';
  const [isBooting, setIsBooting] = useState(() => {
    return !sessionStorage.getItem('hasBooted');
  });
  const [theme, setTheme] = useState(getInitialTheme);
  const [themeWave, setThemeWave] = useState(null);
  const [shouldLoadAiDock, setShouldLoadAiDock] = useState(false);
  const [cmdkOpen, setCmdkOpen] = useState(false);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    applySeoMetadata(seoMetadata);
  }, [seoMetadata]);

  useEffect(() => {
    const handleCmdK = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdkOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleCmdK);
    return () => window.removeEventListener('keydown', handleCmdK);
  }, []);

  useEffect(() => {
    if (isBooting || shouldLoadAiDock) {
      return undefined;
    }

    const loadDock = () => setShouldLoadAiDock(true);
    let idleId = null;
    let timerId = null;

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(loadDock, { timeout: 1600 });
    } else {
      timerId = window.setTimeout(loadDock, 900);
    }

    return () => {
      if (idleId !== null) {
        window.cancelIdleCallback?.(idleId);
      }
      if (timerId !== null) {
        window.clearTimeout(timerId);
      }
    };
  }, [isBooting, shouldLoadAiDock]);

  const handleBootComplete = () => {
    setIsBooting(false);
    sessionStorage.setItem('hasBooted', 'true');
  };

  const commitTheme = (nextTheme, sync = false) => {
    applyThemeToDocument(nextTheme);
    const updateThemeState = () => setTheme(nextTheme);

    if (sync) {
      flushSync(updateThemeState);
      return;
    }

    updateThemeState();
  };

  const runFallbackThemeWave = (wave, nextTheme) => {
    const waveId = window.crypto?.randomUUID?.() ?? `${Date.now()}`;
    setThemeWave({ ...wave, id: waveId, theme: nextTheme });
    window.setTimeout(() => commitTheme(nextTheme), 180);
    window.setTimeout(() => {
      setThemeWave((currentWave) => (currentWave?.id === waveId ? null : currentWave));
    }, 740);
  };

  const playThemeSound = () => {
    try {
      const audio = new Audio('/paper-slide.wav');
      audio.volume = 0.32;
      audio.play().catch(() => {});
    } catch {
      /* audio playback unavailable */
    }
  };

  const toggleTheme = (event) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    playThemeSound();

    const cx = event?.currentTarget
      ? event.currentTarget.getBoundingClientRect().left + event.currentTarget.getBoundingClientRect().width / 2
      : window.innerWidth / 2;
    const cy = event?.currentTarget
      ? event.currentTarget.getBoundingClientRect().top + event.currentTarget.getBoundingClientRect().height / 2
      : window.innerHeight / 2;

    if (prefersReducedMotion || !document.startViewTransition) {
      if (prefersReducedMotion) {
        commitTheme(nextTheme);
        return;
      }

      const wave = { x: cx, y: cy, radius: Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy)) };
      runFallbackThemeWave(wave, nextTheme);
      return;
    }

    const radius = Math.hypot(
      Math.max(cx, window.innerWidth - cx),
      Math.max(cy, window.innerHeight - cy),
    );
    document.documentElement.style.setProperty('--vt-x', `${cx}px`);
    document.documentElement.style.setProperty('--vt-y', `${cy}px`);
    document.documentElement.style.setProperty('--vt-r', `${radius}px`);

    document.startViewTransition(() => {
      commitTheme(nextTheme, true);
    });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: 'var(--zinc-100)', fontFamily: 'var(--font-geist)', backgroundColor: 'var(--zinc-900)', overflow: isBooting ? 'hidden' : 'auto' }}>
      <ErrorBoundary>
        {isBooting && <BootScreen onComplete={handleBootComplete} />}

        <MatrixRain />

        {/* Side pattern strips */}
        <div className="side-pattern left">
          <div className="side-pattern-inner"></div>
        </div>
        <div className="side-pattern right">
          <div className="side-pattern-inner"></div>
        </div>

        {/* Global effects */}
        <div className="scanlines"></div>

        {/* Sidebar */}
        <Sidebar isWideRoute={isWideRoute} />
        {showSectionIndex && <SectionIndex />}

        {themeWave && (
          <span
            key={themeWave.id}
            className={`theme-wave theme-wave-${themeWave.theme}`}
            aria-hidden="true"
            style={{
              '--wave-x': `${themeWave.x}px`,
              '--wave-y': `${themeWave.y}px`,
              '--wave-size': `${themeWave.radius * 2}px`,
            }}
          />
        )}

        {/* Main content */}
        <div className="main-wrapper" style={{ opacity: isBooting ? 0 : 1, transition: 'opacity 0.8s ease-in' }}>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <main className={`main-content${isWideRoute ? ' main-content-wide' : ''}`}>
            <div className="content-border" id="main-content">
              <Suspense fallback={<PageFallback />}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} onOpenCmdk={() => setCmdkOpen(true)} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/open-source" element={<OpenSourcePage />} />
                  <Route path="/skill" element={<Skills />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/resume" element={<Resume />} />
                </Routes>
              </Suspense>
            </div>
            <Footer />
          </main>
        </div>

        {!isBooting && shouldLoadAiDock && (
          <Suspense fallback={null}>
            <AiSummaryDock />
          </Suspense>
        )}
        {!isBooting && (
          <Suspense fallback={null}>
            <CommandPalette
              isOpen={cmdkOpen}
              onClose={() => setCmdkOpen(false)}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </Suspense>
        )}
        {!isBooting && <CustomCursor />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
