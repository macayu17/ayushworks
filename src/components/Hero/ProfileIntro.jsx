import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './ProfileIntro.css';

let hasPlayed = false;

export default function ProfileIntro({ targetRef }) {
  const imageRef = useRef(null);
  const [visible, setVisible] = useState(() => (
    !hasPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ));

  useLayoutEffect(() => {
    if (!visible) return;
    const root = document.getElementById('root');
    const image = imageRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const previousInert = root.inert;
    let animation;
    let revealAnimation;
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      hasPlayed = true;
      revealAnimation?.cancel();
      animation?.cancel();
      delete document.body.dataset.profileIntro;
      root.inert = previousInert;
      setVisible(false);
    };
    document.body.dataset.profileIntro = 'greeting';
    root.inert = true;
    const target = targetRef.current.getBoundingClientRect();
    const introWidth = image.parentElement.getBoundingClientRect().width;
    const dx = (introWidth - 112) / 2 - target.left;
    const dy = window.innerHeight / 2 - 90 - target.top;
    Object.assign(image.style, {
      left: `${target.left}px`, top: `${target.top}px`,
      width: `${target.width}px`, height: `${target.height}px`,
    });
    const start = `translate(${dx}px, ${dy}px) scale(${112 / target.width})`;
    image.style.transform = start;
    const cx = target.left + dx + 56;
    const cy = target.top + dy + 56;
    const radius = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
    const movePortrait = () => {
      if (cancelled) return;
      document.body.dataset.profileIntro = 'moving';
      animation = image.animate([
        { transform: start }, { transform: 'translate(0, 0) scale(1)' },
      ], { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
      // Cancelling the finished animation must not restore the centred pose.
      image.style.transform = 'translate(0, 0) scale(1)';
      animation.onfinish = finish;
    };
    const revealTimer = window.setTimeout(() => {
      document.body.dataset.profileIntro = 'reveal';
      revealAnimation = root.animate([
        { clipPath: `circle(0px at ${cx}px ${cy}px)` },
        { clipPath: `circle(${radius}px at ${cx}px ${cy}px)` },
      ], { duration: 1000, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' });
      revealAnimation.onfinish = movePortrait;
    }, 550);
    const safetyTimer = window.setTimeout(finish, 2900);
    window.addEventListener('resize', finish);
    motion.addEventListener('change', finish);
    return () => {
      cancelled = true;
      animation?.cancel();
      revealAnimation?.cancel();
      window.clearTimeout(revealTimer);
      window.clearTimeout(safetyTimer);
      window.removeEventListener('resize', finish);
      motion.removeEventListener('change', finish);
      root.inert = previousInert;
      delete document.body.dataset.profileIntro;
    };
  }, [visible, targetRef]);

  if (!visible) return null;
  return createPortal(
    <div className="profile-intro" aria-hidden="true">
      <div ref={imageRef} className="profile-intro-photo">
        <img src="/profile.webp" alt="" />
      </div>
      <p className="profile-intro-greeting">Hello, I’m Ayush<span>Nice to see you here.</span></p>
    </div>,
    document.body,
  );
}
