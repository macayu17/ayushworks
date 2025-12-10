import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo"><span className="footer-bracket">{`{`}</span><span className="footer-logo-text">ayush</span><span className="footer-bracket">{`}`}</span></h3>
            <p className="footer-tagline"></p>
          </div>

          <div className="footer-links">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Contact</h4>
              <ul>
                <li><a href="mailto:ayushhoff@gmail.com">Email</a></li>
                <li><a href="https://github.com/macayu17">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/anayush14/">LinkedIn</a></li>
                <li><a href="https://x.com/ayush_174_">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Ayush Kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
