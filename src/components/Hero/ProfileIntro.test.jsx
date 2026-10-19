import { StrictMode } from 'react';
import { act, render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import ProfileIntro from './ProfileIntro';

it('reveals outwards from the portrait before moving it and restores interaction', () => {
  vi.useFakeTimers();
  const animation = { cancel: vi.fn(), onfinish: null };
  const revealAnimation = { cancel: vi.fn(), onfinish: null };
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn(),
  })));
  const animate = vi.fn(function () { return this.id === 'root' ? revealAnimation : animation; });
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate });
  const root = document.createElement('div');
  root.id = 'root';
  root.inert = false;
  document.body.append(root);
  const targetRef = { current: { getBoundingClientRect: () => ({ left: 100, top: 200, width: 72, height: 72 }) } };
  const view = render(<StrictMode><ProfileIntro targetRef={targetRef} /></StrictMode>, { container: root });
  try {
    expect(document.body.dataset.profileIntro).toBe('greeting');
    expect(root.inert).toBe(true);
    act(() => vi.advanceTimersByTime(550));
    expect(animate).toHaveBeenCalledTimes(1);
    expect(document.body.dataset.profileIntro).toBe('reveal');
    expect(animate.mock.instances[0]).toBe(root);
    expect(animate.mock.calls[0][0][0].clipPath).toBe('circle(0px at 0px 350px)');
    expect(root.inert).toBe(true);
    act(() => revealAnimation.onfinish());
    expect(document.body.dataset.profileIntro).toBe('moving');
    expect(animate).toHaveBeenCalledTimes(2);
    expect(document.querySelector('.profile-intro-photo').style.transform).toBe('translate(0, 0) scale(1)');
    expect(root.inert).toBe(true);
    act(() => animation.onfinish());
    expect(root.inert).toBe(false);
    expect(revealAnimation.cancel).toHaveBeenCalled();
    expect(document.querySelector('.profile-intro')).toBeNull();
    expect(document.body.dataset.profileIntro).toBeUndefined();
  } finally {
    view.unmount();
    root.remove();
    delete Element.prototype.animate;
    vi.unstubAllGlobals();
    vi.useRealTimers();
  }
});
