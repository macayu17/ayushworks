import './About.css';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const About = () => {
  const [titleRef, titleVisible] = useScrollAnimation({ threshold: 0.2 });
  const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.1 });
  const [techRef, techVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="glass-container">
          <h2
            ref={titleRef}
            className={`section-title scroll-hidden ${titleVisible ? 'scroll-visible' : ''}`}
          >
            About Me
          </h2>
          <div
            ref={contentRef}
            className={`about-content scroll-hidden ${contentVisible ? 'scroll-visible' : ''}`}
          >
            <div className="about-text">
              <p className="about-description">
                Hello! I'm a developer from Bangalore, India. I enjoy programming and exploring technology.
              </p>

              <div className="about-section">
                <h3 className="about-heading">What I do?</h3>
                <p className="about-description">
                  I'm currently pursuing my Computer Science Engineering degree at RV Institute of Technology and Management. I love taking my skills beyond the classroom, whether that's applying machine learning to novel challenges, thriving in competitive coding environments, or leading technical and web teams for large-scale events.
                </p>
              </div>

              <div className="about-section">
                <h3 className="about-heading">Areas of Interest</h3>
                <p className="about-description">
                  Areas of Interest Artificial Intelligence & NLP, Web Development, Competitive Programming, Software Engineering, Database Management Systems
                </p>
              </div>

              <p className="about-description">
                My curiosity extends beyond code. I'm always exploring new frameworks, diving into tech publications, and looking for the next problem to solve.
              </p>

              <p className="about-description about-cta">
                I'm always open to new opportunities and collaborations. <a href="#contact" className="contact-link">Let's Connect</a>.
              </p>
            </div>
            <div className="about-image">
              <div className="profile-placeholder">
                <div className="profile-icon">👨‍💻</div>
              </div>
            </div>
          </div>

          <div
            ref={techRef}
            className={`tech-section scroll-hidden ${techVisible ? 'scroll-visible' : ''}`}
          >
            <h3 className="tech-title">Tools that I have used</h3>
            <div className="marquee-wrapper">
              <div className="marquee-container">
                <div className="marquee-content marquee-left">
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" className="tech-item-icon" /><span>Bootstrap</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" className="tech-item-icon" /><span>C++</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" className="tech-item-icon" /><span>CSS</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" className="tech-item-icon" /><span>C</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="tech-item-icon" /><span>Python</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" className="tech-item-icon" /><span>HTML</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="tech-item-icon" /><span>JavaScript</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="tech-item-icon" /><span>TypeScript</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="tech-item-icon" /><span>Next.js</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" className="tech-item-icon" /><span>Vite</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" className="tech-item-icon" /><span>Tailwind</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" className="tech-item-icon" /><span>Express</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="tech-item-icon" /><span>Git</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" className="tech-item-icon" /><span>VS Code</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" alt="Jupyter" className="tech-item-icon" /><span>Jupyter</span></div>
                </div>
                <div className="marquee-content marquee-left" aria-hidden="true">
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" className="tech-item-icon" /><span>Bootstrap</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" className="tech-item-icon" /><span>C++</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" className="tech-item-icon" /><span>CSS</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" className="tech-item-icon" /><span>C</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="tech-item-icon" /><span>Python</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" className="tech-item-icon" /><span>HTML</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="tech-item-icon" /><span>JavaScript</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" className="tech-item-icon" /><span>TypeScript</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" className="tech-item-icon" /><span>Next.js</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" className="tech-item-icon" /><span>Vite</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" className="tech-item-icon" /><span>Tailwind</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" className="tech-item-icon" /><span>Express</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="tech-item-icon" /><span>Git</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" className="tech-item-icon" /><span>VS Code</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" alt="Jupyter" className="tech-item-icon" /><span>Jupyter</span></div>
                </div>
              </div>

              <div className="marquee-container">
                <div className="marquee-content marquee-right">
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="tech-item-icon" /><span>React</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="tech-item-icon" /><span>MongoDB</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="tech-item-icon" /><span>MySQL</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="tech-item-icon" /><span>PostgreSQL</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" alt="Prisma" className="tech-item-icon" /><span>Prisma</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="tech-item-icon" /><span>Node.js</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" alt="Firebase" className="tech-item-icon" /><span>Firebase</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="tech-item-icon" /><span>Java</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="tech-item-icon" /><span>TensorFlow</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" className="tech-item-icon" /><span>PyTorch</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" alt="Scikit-learn" className="tech-item-icon" /><span>Scikit-learn</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" alt="Pandas" className="tech-item-icon" /><span>Pandas</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy" className="tech-item-icon" /><span>NumPy</span></div>
                </div>
                <div className="marquee-content marquee-right" aria-hidden="true">
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="tech-item-icon" /><span>React</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" className="tech-item-icon" /><span>MongoDB</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" className="tech-item-icon" /><span>MySQL</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="tech-item-icon" /><span>PostgreSQL</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" alt="Prisma" className="tech-item-icon" /><span>Prisma</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" className="tech-item-icon" /><span>Node.js</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" alt="Firebase" className="tech-item-icon" /><span>Firebase</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" className="tech-item-icon" /><span>Java</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" className="tech-item-icon" /><span>TensorFlow</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" className="tech-item-icon" /><span>PyTorch</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" alt="Scikit-learn" className="tech-item-icon" /><span>Scikit-learn</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" alt="Pandas" className="tech-item-icon" /><span>Pandas</span></div>
                  <div className="tech-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy" className="tech-item-icon" /><span>NumPy</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default About;
