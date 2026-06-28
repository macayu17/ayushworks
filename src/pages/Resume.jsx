import { useEffect } from 'react';
import { FaFileDownload, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Resume.css';

const RESUME_IMAGE = '/ResumeScreenshot.png';
const RESUME_PDF_URL = '/Ayush_Kumar_Resume.pdf';

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
          <button type="button" className="resume-download-btn" onClick={handleDownload}>
            <FaFileDownload size={12} />
            <span>Download PDF</span>
          </button>
        </div>

        <div className="resume-preview-wrapper bracket-box">
          <img
            src={RESUME_IMAGE}
            alt="Ayush Kumar Resume"
            className="resume-preview-image"
            onClick={handleDownload}
            loading="eager"
            decoding="async"
          />
        </div>

        <Link to="/contact" className="resume-back-link">
          <FaArrowLeft size={10} />
          <span>Back to Contact</span>
        </Link>
      </section>
    </div>
  );
};

export default Resume;
