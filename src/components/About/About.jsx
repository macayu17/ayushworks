import './About.css';
import { FaRegEnvelope, FaTwitter, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import ayushImg from '../../assets/images/AyushBW11.png';

const About = () => {
  return (
    <section className="about" id="about">
      
      {/* Identity Grid */}
      <div className="about-identity">
        <div className="identity-image-wrapper bracket-box bracket-corners">
          <img 
            src={ayushImg} 
            alt="Ayush Kumar" 
            className="identity-image"
          />
          <div className="bracket-box bracket-corners-bottom" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}></div>
          <div className="identity-label">FIG.01 // IDENTITY</div>
        </div>

        <div className="identity-stats bracket-box stats-brackets">
          <div className="stats-divider">---</div>
          
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
            <div className="stat-value">20</div>
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
      <div className="about-desc-block bracket-box">
        <h2 className="desc-title">
          <span className="desc-square"></span>
          I love what I do.
        </h2>
        <p className="desc-text">
          Simple as that. I enjoy building things that look good and work even better. 
          Currently at RV Institute of Technology, love to explore new things and build cool stuff. 
          If you vibe with my work or just want to chat about tech, I'm always open.
        </p>
      </div>

      {/* Quick Reach Out */}
      <div className="quick-reach">
        <div className="quick-reach-title">QUICK REACH OUT</div>
        <div className="quick-reach-row">
          <div className="qr-group">
            <a href="mailto:ayushhoff@gmail.com" className="qr-btn bracket-box qr-btn-brackets">
              <FaRegEnvelope /> Email
            </a>
            <a href="https://x.com/ayush_174_" target="_blank" rel="noopener noreferrer" className="qr-btn bracket-box qr-btn-brackets">
              <FaTwitter /> DM me
            </a>
          </div>
          <div className="qr-group">
            <a href="/skill" className="qr-btn bracket-box qr-btn-brackets">
              &gt;_ Toolbox
            </a>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="about-cards">
        {/* Intentionally removed Timeline card per user request */}
        
        <a href="/skill" className="about-card bracket-box" style={{display: 'block'}}>
          <div className="ac-top">
            <span>[ 02 ]</span>
            <FaChevronRight className="ac-icon" />
          </div>
          <h3 className="ac-title">My Toolbox</h3>
          <p className="ac-desc">The software and hardware I use daily</p>
        </a>
      </div>

      {/* Hobbies & Interests */}
      <div className="hobbies-section">
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
