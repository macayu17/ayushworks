import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">&lt;AK /&gt;</h3>
            <p className="footer-tagline">Building the future, one line of code at a time.</p>
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
                <li><a href="mailto:ayush.kumar@example.com">Email</a></li>
                <li><a href="https://github.com">GitHub</a></li>
                <li><a href="https://linkedin.com">LinkedIn</a></li>
                <li><a href="https://twitter.com">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Ayush Kumar. All rights reserved.</p>
          <p>Made with ❤️ using React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
