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
    "#ff7f3f", // warm orange
    "#ff3f6c", // pink/red
    "#6d5cff", // purple/indigo
    "#1fa2ff", // bright blue
    "#00e6af", // aqua
    "#00ff4d"  // green
  ]}
        rotation={0}
        speed={0.8}
        scale={1}
        frequency={5}
        warpStrength={1.2}
        mouseInfluence={1}
        parallax={1}
        noise={0.5}
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
