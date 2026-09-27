import { StrictMode } from 'react';
import { act, render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import ProfileIntro from './ProfileIntro';

it('moves the portrait before revealing the page and restores interaction', () => {
  vi.useFakeTimers();
  const animation = { cancel: vi.fn(), onfinish: null };
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn(),
  })));
  const animate = vi.fn(() => animation);
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
    expect(document.body.dataset.profileIntro).toBe('moving');
    act(() => animation.onfinish());
    expect(document.body.dataset.profileIntro).toBe('reveal');
    expect(root.inert).toBe(false);
    act(() => vi.advanceTimersByTime(500));
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
