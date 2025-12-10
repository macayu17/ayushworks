import { useState, useEffect } from 'react';
import './App.css';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

import ColorBends from "./components/ColorBends/ColorBends";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="app">

      {/* 🔥 Global Background Layer */}
      <ColorBends
        colors={[
          "#ff0000", // red
          "#ff7700", // orange
          "#ffff00", // yellow
          "#00ff00", // green
          "#00ffff", // cyan
          "#0066ff", // blue
          "#4400ff", // indigo
          "#9900ff"  // violet
        ]}
        rotation={0}
        speed={0.8}
        scale={0.7}
        frequency={2}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.1}
        transparent
        style={{
          transform: "translateX(-200px)"  // ⭐ SHIFT background LEFT
        }}
      />

      {/* ⭐ Foreground Content */}
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />

    </div>
  );
}

export default App;
