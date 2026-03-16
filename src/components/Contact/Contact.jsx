import './Contact.css';
import { FaGithub, FaLinkedinIn, FaEnvelope, FaFileDownload, FaCheck } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useState } from 'react';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "ayushhoff@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="contact" id="contact">
      <div className="section-header">
        <span>// CONTACT</span>
      </div>

      <div className="contact-content">
        <div className="contact-text-box">
          <p className="contact-text">
            I'm currently open to internships, freelance work, and full-time opportunities.
            Feel free to reach out if you'd like to collaborate, ask a question, or simply say hi!
          </p>
        </div>

        <div className="contact-actions">
          <button 
            onClick={handleCopy} 
            className={`contact-action-btn ${copied ? 'copied' : ''}`}
            aria-label="Copy Email"
          >
            {copied ? <FaCheck size={14} /> : <FaEnvelope size={14} />}
            <span>{copied ? "Email Copied!" : email}</span>
          </button>
          
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-action-btn"
            aria-label="View Resume"
          >
            <FaFileDownload size={14} />
            <span>View Resume</span>
          </a>
        </div>

        <div className="contact-socials-wrapper">
          <span className="socials-label">// FIND ME ONLINE</span>
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
      </div>
    </section>
  );
};

export default Contact;
