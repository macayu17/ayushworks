import React, { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { Routes, Route, useLocation } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import './index.css';
import Sidebar from './components/Sidebar/Sidebar';
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
const AiSummaryDock = lazy(() => import('./components/AiSummaryDock/AiSummaryDock'));

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const applyThemeToDocument = (nextTheme) => {
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem('site-theme', nextTheme);

  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute('content', nextTheme === 'light' ? '#f5f1e8' : '#18181b');
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
    location.pathname === '/open-source';
  const [isBooting, setIsBooting] = useState(() => {
    return !sessionStorage.getItem('hasBooted');
  });
  const [theme, setTheme] = useState(getInitialTheme);
  const [themeWave, setThemeWave] = useState(null);
  const [shouldLoadAiDock, setShouldLoadAiDock] = useState(false);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    applySeoMetadata(seoMetadata);
  }, [seoMetadata]);

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

  const getThemeWave = (target) => {
    const rect = target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    return { x, y, radius };
  };

  const runFallbackThemeWave = (wave, nextTheme) => {
    const waveId = window.crypto?.randomUUID?.() ?? `${Date.now()}`;
    setThemeWave({ ...wave, id: waveId, theme: nextTheme });
    window.setTimeout(() => commitTheme(nextTheme), 180);
    window.setTimeout(() => {
      setThemeWave((currentWave) => (currentWave?.id === waveId ? null : currentWave));
    }, 820);
  };

  const toggleTheme = (event) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const wave = getThemeWave(event.currentTarget);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !document.startViewTransition) {
      if (prefersReducedMotion) {
        commitTheme(nextTheme);
        return;
      }

      runFallbackThemeWave(wave, nextTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      commitTheme(nextTheme, true);
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${wave.x}px ${wave.y}px)`,
              `circle(${wave.radius}px at ${wave.x}px ${wave.y}px)`,
            ],
          },
          {
            duration: 760,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      })
      .catch(() => {
        commitTheme(nextTheme);
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
        <Sidebar />

        {!isBooting && (
          <button
            type="button"
            className="theme-toggle-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <FaMoon size={12} /> : <FaSun size={12} />}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
        )}

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
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/open-source" element={<OpenSourcePage />} />
                  <Route path="/skill" element={<Skills />} />
                  <Route path="/contact" element={<Contact />} />
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
        {!isBooting && <CustomCursor />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
