import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BookCall.css';

const bookingUrl = 'https://cal.com/ayushoff/15min';

const BookCall = ({ theme }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition book-call">
      <nav className="book-call-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Ayush</Link><span>/</span><span>Book a call</span>
      </nav>
      <h1>Book a call</h1>
      <p className="book-call-intro">Hiring, a collaboration, or an idea? Pick a date and time that suits you.</p>
      <p className="book-call-duration"><strong>15 minutes.</strong> Say hi, ask a question, or talk through an idea.</p>
      <iframe
        className="book-call-calendar"
        title="Book a 15-minute call with Ayush"
        src={`${bookingUrl}?embed=true&theme=${theme}&layout=month_view`}
      />
      <p className="book-call-fallback">Calendar not loading? <a href={bookingUrl} target="_blank" rel="noopener noreferrer">Open it on Cal.com ↗</a></p>
    </div>
  );
};

export default BookCall;
