import './index.css';
import Sidebar from './components/Sidebar/Sidebar';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import GitHubContributions from './components/GitHubContributions/GitHubContributions';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: 'var(--zinc-100)', fontFamily: 'var(--font-geist)', backgroundColor: 'var(--zinc-900)' }}>

      {/* Side pattern strips */}
      <div className="side-pattern left">
        <div className="side-pattern-inner"></div>
      </div>
      <div className="side-pattern right">
        <div className="side-pattern-inner"></div>
      </div>

      {/* Global effects */}
      <CustomCursor />
      <div className="scanlines"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="main-wrapper">
        <main className="main-content">
          <div className="content-border">
            <Hero />
            <GitHubContributions username="macayu17" />
            <Experience />
            <Projects />
            <Skills />
            <About />
            <Contact />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
