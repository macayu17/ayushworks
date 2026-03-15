import './Contact.css';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="section-header">
        <span>// CONTACT</span>
      </div>

      <div className="contact-content">
        <p className="contact-text">
          I'm currently open to internships, freelance work, and full-time opportunities.
          Feel free to reach out if you'd like to collaborate or just say hi!
        </p>

        <div className="contact-email-row">
          <a href="mailto:ayushhoff@gmail.com" className="contact-email">
            <FaEnvelope size={14} />
            ayushhoff@gmail.com
          </a>
        </div>

        <div className="contact-socials">
          <a href="https://github.com/macayu17" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/anayush14/" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="LinkedIn">
            <FaLinkedinIn size={20} />
          </a>
          <a href="https://x.com/ayush_174_" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="X">
            <FaXTwitter size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
