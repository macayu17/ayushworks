import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <h3 className="footer-logo">
            <span className="footer-bracket">{`{`}</span>
            <span className="footer-logo-text">ayush</span>
            <span className="footer-bracket">{`}`}</span>
          </h3>
          <p className="footer-copyright">© {currentYear} Ayush Kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
