import './Hero.css';
import DecryptedText from '../DecryptedText/DecryptedText';
import ProfileCard from '../ProfileCard/ProfileCard';
import profileImage from '../../assets/images/profile.png';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-greeting">
            <DecryptedText text="Hi, I'm" speed={30} showCursor={false} />
          </p>
          <h1 className="hero-name">
            <DecryptedText text="Ayush Kumar" speed={30} showCursor={true} />
          </h1>
          <h2 className="hero-title">
            <DecryptedText text="Computer Science Student" speed={30} showCursor={false} />
          </h2>
          <p className="hero-description">
            "A CSE undergrad based in Bengaluru. Tackling coding challenges, training transformers, and occasionally sleeping."
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
          <ProfileCard
            avatarUrl={profileImage}
            name="Ayush"
            title="Computer Science Undergrad"
            handle="github/macayu17"
            status="Available"
            contactText="Contact"
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={false}
          />
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
