import Contact from '../components/Contact/Contact';
import { useEffect } from 'react';

const Chat = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition">
      <Contact />
    </div>
  );
};

export default Chat;
