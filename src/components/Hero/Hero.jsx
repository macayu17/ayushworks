import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name">
            <span className="name-gradient">Ayush Kumar</span>
          </h1>
          <h2 className="hero-title">
            <span className="typing-text">Computer Science Student</span>
          </h2>
          <p className="hero-description">
            A CSE student at RV Institute of Technology, Bangalore. I enjoy programming and exploring web technologies.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              Get In Touch
            </a>
            <a href="#projects" className="btn btn-secondary">
              View Projects
            </a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="profile-image-container">
            <div className="profile-glow"></div>
            <img 
              src="/src/assets/images/profile.jpg" 
              alt="Ayush Kumar" 
              className="profile-image"
              onError={(e) => {
                console.log('Image failed to load, showing placeholder');
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
              onLoad={() => console.log('Image loaded successfully')}
            />
            <div className="profile-placeholder" style={{display: 'none'}}>
              <span className="placeholder-icon">👨‍💻</span>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse"></div>
        <p>Scroll Down</p>
      </div>
    </section>
  );
};

export default Hero;
