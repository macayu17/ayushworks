import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './index.css';
import Sidebar from './components/Sidebar/Sidebar';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Footer from './components/Footer/Footer';
import BootScreen from './components/BootScreen/BootScreen';
import MatrixRain from './components/MatrixRain/MatrixRain';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import ProjectsPage from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';

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

function App() {
  const location = useLocation();
  const isProjectsRoute =
    location.pathname === '/projects' || location.pathname.startsWith('/projects/');
  const [isBooting, setIsBooting] = useState(() => {
    return !sessionStorage.getItem('hasBooted');
  });

  const handleBootComplete = () => {
    setIsBooting(false);
    sessionStorage.setItem('hasBooted', 'true');
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

        {/* Main content */}
        <div className="main-wrapper" style={{ opacity: isBooting ? 0 : 1, transition: 'opacity 0.8s ease-in' }}>
          <main className={`main-content${isProjectsRoute ? ' main-content-wide' : ''}`}>
            <div className="content-border">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  <Route path="/skill" element={<Skills />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </AnimatePresence>
            </div>
            <Footer />
          </main>
        </div>

        {!isBooting && <CustomCursor />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
