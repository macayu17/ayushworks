import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="cube">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>
      </div>
      <div className="loader-text">
        <span className="letter">L</span>
        <span className="letter">O</span>
        <span className="letter">A</span>
        <span className="letter">D</span>
        <span className="letter">I</span>
        <span className="letter">N</span>
        <span className="letter">G</span>
      </div>
    </div>
  );
};

export default Loader;
