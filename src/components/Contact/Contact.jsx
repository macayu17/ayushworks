import './Contact.css';
import { FaGithub, FaLinkedinIn, FaEnvelope, FaFileDownload, FaCheck } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useState } from 'react';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const email = "ayushhoff@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        const val = activeEl.value.trim().toLowerCase();
        const commands = ['ls', 'whoami', 'clear', 'sudo'];
        
        if (commands.includes(val)) {
          e.preventDefault();
          
          if (val === 'clear') {
            setFormStatus("");
            activeEl.value = ''; 
          } else if (val === 'ls') {
            setFormStatus("LS_OUTPUT");
          } else if (val === 'whoami') {
            setFormStatus("WHOAMI_OUTPUT");
          } else if (val === 'sudo') {
            setFormStatus("SUDO_OUTPUT");
            document.body.classList.add('sudo-glitch');
            setTimeout(() => document.body.classList.remove('sudo-glitch'), 1000);
          }
        }
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("SENDING");
    const form = e.target;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/maqppewd", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setFormStatus("SUCCESS");
        form.reset();
        setTimeout(() => setFormStatus(""), 5000);
      } else {
        setFormStatus("ERROR");
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      setFormStatus("ERROR");
    }
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
            href="https://drive.google.com/file/d/1l3HHt4OLJ9Pz5g8nZ5K4spQow7iUgb1d/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-action-btn"
            aria-label="View Resume"
          >
            <FaFileDownload size={14} />
            <span>View Resume</span>
          </a>
        </div>

        <div className="contact-terminal">
          <div className="term-header">
            <div className="term-buttons">
              <span className="term-btn close"></span>
              <span className="term-btn min"></span>
              <span className="term-btn max"></span>
            </div>
            <span className="term-title">ayushhoff@gmail.com:~</span>
          </div>
          <div className="term-body">
            <div className="term-line">
              <span className="term-user">ayushhoff@gmail.com</span><span className="term-colon">:</span><span className="term-path">~</span><span className="term-prompt">$</span> 
              <span className="term-cmd"> ./contact.sh</span>
            </div>
            <form className="term-form" onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
              <div className="term-input-group">
                <label htmlFor="name" className="term-label"><span className="term-caret">&gt;</span> Name: </label>
                <input type="text" id="name" name="name" required className="term-input" spellCheck="false" autoComplete="off" />
              </div>
              <div className="term-input-group">
                <label htmlFor="email" className="term-label"><span className="term-caret">&gt;</span> Email: </label>
                <input type="email" id="email" name="email" required className="term-input" spellCheck="false" autoComplete="off" />
              </div>
              <div className="term-input-group">
                <label htmlFor="subject" className="term-label"><span className="term-caret">&gt;</span> Subject: </label>
                <input type="text" id="subject" name="subject" required className="term-input" spellCheck="false" autoComplete="off" />
              </div>
              <div className="term-input-group textarea-group">
                <label htmlFor="message" className="term-label"><span className="term-caret">&gt;</span> Message: </label>
                <textarea id="message" name="message" required className="term-input" rows="3" spellCheck="false"></textarea>
              </div>
              
              <div className="term-submit-group">
                <button type="submit" className="term-submit" disabled={formStatus === "SENDING"}>
                  <span className="term-user">ayushhoff@gmail.com</span><span className="term-colon">:</span><span className="term-path">~</span><span className="term-prompt">$</span> Execute [-Y/n]{formStatus === "SENDING" ? "..." : ""}
                </button>
              </div>
              
              {/* Output variants */}
              {formStatus === "SUCCESS" && (
                <div className="term-status success">
                  <span className="term-sys">[SYSTEM]</span> Message payload delivered successfully.
                </div>
              )}
              {formStatus === "ERROR" && (
                <div className="term-status error">
                  <span className="term-sys">[ERROR]</span> Connection refused. Please try again.
                </div>
              )}
              {formStatus === "LS_OUTPUT" && (
                <div className="term-status" style={{ whiteSpace: 'pre-wrap', color: 'var(--zinc-400)', lineHeight: '1.4' }}>
                  drwxr-xr-x 2 root root 4096 about/{'\n'}
                  drwxr-xr-x 2 root root 4096 skills/{'\n'}
                  drwxr-xr-x 2 root root 4096 projects/{'\n'}
                  -rw-r--r-- 1 root root  235 resume.pdf
                </div>
              )}
              {formStatus === "WHOAMI_OUTPUT" && (
                <div className="term-status" style={{ color: 'var(--zinc-300)' }}>
                  visitor@ayush_os. You are browsing the portfolio of Ayush Kumar, Developer.
                </div>
              )}
              {formStatus === "SUDO_OUTPUT" && (
                <div className="term-status error" style={{ fontWeight: 'bold' }}>
                  <span className="term-sys">[ERROR]</span> 0x0000005: Access Denied. System override attempt logged.
                </div>
              )}
            </form>
          </div>
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
