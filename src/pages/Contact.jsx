import ContactComponent from '../components/Contact/Contact';
import { useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition">
      <ContactComponent />
    </div>
  );
};

export default Contact;
