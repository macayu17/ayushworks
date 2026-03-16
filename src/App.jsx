import { Routes, Route } from 'react-router-dom';
import './index.css';
import Sidebar from './components/Sidebar/Sidebar';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Chat from './pages/Chat';

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
      <div className="scanlines"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="main-wrapper">
        <main className="main-content">
          <div className="content-border">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skill" element={<Skills />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>

      <CustomCursor />
    </div>
  );
}

export default App;
