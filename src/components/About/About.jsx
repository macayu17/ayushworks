import './About.css';

const About = () => {
  return (
    <section className="about" id="about">
      <div className="section-header">
        <span>// ABOUT</span>
      </div>

      <div className="about-content">
        <div className="about-block">
          <div className="about-block-label">Fig.01 — Identity</div>
          <div className="about-block-title">Who I am</div>
          <p>
            I'm Ayush Kumar, a Computer Science student at RV Institute of Technology, Bengaluru.
            I'm passionate about building elegant, performant web applications and exploring the
            intersection of software engineering and machine learning.
          </p>
          <div className="about-badges">
            <span className="about-badge">Full Stack</span>
            <span className="about-badge">AI/ML</span>
            <span className="about-badge">Open Source</span>
          </div>
        </div>

        <div className="about-block">
          <div className="about-block-label">Fig.02 — Background</div>
          <div className="about-block-title">What I do</div>
          <p>
            I focus on creating user-friendly applications with modern technologies.
            From event booking platforms to F1 analytics dashboards, I enjoy taking
            on complex challenges and shipping polished products. Currently exploring
            full-stack development, real-time systems, and transformer-based ML models.
          </p>
          <a href="#contact" className="about-link">Let's Connect →</a>
        </div>
      </div>
    </section>
  );
};

export default About;
