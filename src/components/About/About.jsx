import './About.css';
import { FaRegEnvelope, FaChevronRight } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Education from '../Education/Education';

const About = () => {
  return (
    <section className="about" id="about">
      
      <div className="about-intro">
        {/* Identity Grid */}
        <div className="about-identity" id="about-identity" data-section-index="Identity">
          <div className="identity-stats bracket-box stats-brackets">
            <div className="stats-divider">// IDENTITY</div>

            <div className="stat-row">
              <div className="stat-label-wrap">
                <span className="stat-num">00</span>
                <span>NAME</span>
              </div>
              <div className="stat-value">Ayush Kumar</div>
            </div>

            <div className="stat-row">
              <div className="stat-label-wrap">
                <span className="stat-num">01</span>
                <span>AGE</span>
              </div>
              <div className="stat-value">22</div>
            </div>

            <div className="stat-row">
              <div className="stat-label-wrap">
                <span className="stat-num">02</span>
                <span>LOCATION</span>
              </div>
              <div className="stat-value">Bengaluru, IN</div>
            </div>

            <div className="stat-row">
              <div className="stat-label-wrap">
                <span className="stat-num">03</span>
                <span>ROLE</span>
              </div>
              <div className="stat-value">Software Engineer</div>
            </div>

            <div className="stat-row">
              <div className="stat-label-wrap">
                <span className="stat-num">04</span>
                <span>STATUS</span>
              </div>
              <div className="stat-value">
                <span className="stat-dot"></span>
                Open to Work
              </div>
            </div>
          </div>
        </div>

        {/* Description Block */}
        <div className="about-desc-block bracket-box" id="about-story" data-section-index="About Me">
          <h2 className="desc-title">
            <span className="desc-square"></span>
            I love what I do.
          </h2>
          <p className="desc-text">
            I build full-stack applications, AI tools, and backend systems. Lately, that means working on
            agent memory and market simulation, and contributing to open source. I enjoy digging into
            how things work, especially where product design meets systems engineering.
          </p>
        </div>
      </div>

      <Education />

      {/* Quick Reach Out */}
      <div className="quick-reach" id="about-reach" data-section-index="Reach Out">
        <div className="quick-reach-title">QUICK REACH OUT</div>
        <div className="quick-reach-row">
          <div className="qr-group">
            <a href="mailto:ayushhoff@gmail.com" className="qr-btn bracket-box qr-btn-brackets">
              <FaRegEnvelope /> Email
            </a>
            <a href="https://x.com/ayush_174_" target="_blank" rel="noopener noreferrer" className="qr-btn bracket-box qr-btn-brackets">
              <FaXTwitter /> DM me
            </a>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="about-cards" id="about-toolbox">
        
        <Link to="/skill" className="about-card bracket-box" style={{display: 'block'}}>
          <div className="ac-top">
            <span>[ 02 ]</span>
            <FaChevronRight className="ac-icon" />
          </div>
          <h3 className="ac-title">My Toolbox</h3>
          <p className="ac-desc">The frameworks and tools I use</p>
        </Link>
      </div>

      {/* Hobbies & Interests */}
      <div className="hobbies-section" id="about-interests" data-section-index="Interests">
        <div className="hobbies-header">Hobbies & Interests</div>
        
        <div className="hobbies-list">
          <div className="hobby-item">
            <div className="hobby-num">01</div>
            <div className="hobby-content">
              <div className="hobby-title">Full Stack Development</div>
              <div className="hobby-desc">Building real-world applications using modern frontend and backend frameworks.</div>
            </div>
          </div>
          
          <div className="hobby-item">
            <div className="hobby-num">02</div>
            <div className="hobby-content">
              <div className="hobby-title">Open Source</div>
              <div className="hobby-desc">Contributing to tools and frameworks that power the web.</div>
            </div>
          </div>
          
          <div className="hobby-item">
            <div className="hobby-num">03</div>
            <div className="hobby-content">
              <div className="hobby-title">Machine Learning</div>
              <div className="hobby-desc">Exploring transformer models and clinical screening tools using PyTorch.</div>
            </div>
          </div>
          
          <div className="hobby-item">
            <div className="hobby-num">04</div>
            <div className="hobby-content">
              <div className="hobby-title">System Design</div>
              <div className="hobby-desc">Designing scalable architectures and distributed systems.</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
