import { useEffect, useState } from 'react';

const prompts = ['Explore my projects', 'See my open source work', 'Say hello', 'Switch the theme'];

export default function TypedPrompt() {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 639px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let word = 0;
    let length = 0;
    let deleting = false;
    const tick = () => {
      const phrase = prompts[word];
      length += deleting ? -1 : 1;
      setTyped(phrase.slice(0, length));
      let delay = deleting ? 32 : 65;
      if (length === phrase.length) { deleting = true; delay = 2100; }
      if (length === 0) { deleting = false; word = (word + 1) % prompts.length; delay = 450; }
      timer = window.setTimeout(tick, delay);
    };
    const update = () => {
      window.clearTimeout(timer);
      if (!mobile.matches && !reducedMotion.matches && !document.hidden) {
        timer = window.setTimeout(tick, 450);
      }
    };
    update();
    mobile.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      window.clearTimeout(timer);
      mobile.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return <span className="cmdk-typed" aria-hidden="true">{typed || '\u00a0'}<span className="cmdk-caret" /></span>;
}
