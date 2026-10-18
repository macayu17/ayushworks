import { useEffect } from 'react';
import { FaFileDownload, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Resume.css';

const RESUME_IMAGE = '/ResumeScreenshot.png?v=e67305f215';
const RESUME_PDF_URL = '/Ayush_Kumar_Resume.pdf?v=e67305f215';

const Resume = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_PDF_URL;
    link.download = 'Ayush_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-transition">
      <section className="resume-section" id="resume">
        <div className="section-header">
          <span>// RESUME</span>
          <div className="resume-actions">
            <a className="resume-download-btn" href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer">
              <FaExternalLinkAlt size={12} aria-hidden="true" />
              <span>Open PDF</span>
            </a>
            <button type="button" className="resume-download-btn" onClick={handleDownload}>
              <FaFileDownload size={12} aria-hidden="true" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <a className="resume-preview-wrapper bracket-box" href={RESUME_PDF_URL} target="_blank" rel="noopener noreferrer" aria-label="Open resume PDF in a new tab">
          <img
            src={RESUME_IMAGE}
            alt="Ayush Kumar Resume"
            className="resume-preview-image"
            loading="eager"
            decoding="async"
          />
        </a>

        <Link to="/contact" className="resume-back-link">
          <FaArrowLeft size={10} />
          <span>Back to Contact</span>
        </Link>
      </section>
    </div>
  );
};

export default Resume;
