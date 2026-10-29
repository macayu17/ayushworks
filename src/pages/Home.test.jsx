import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, expect, it, vi } from 'vitest';
import Home from './Home';

vi.mock('../components/Hero/Hero', () => ({ default: () => null }));
vi.mock('../components/Projects/Projects', () => ({ default: () => null }));
vi.mock('../components/GitHubContributions/GitHubContributions', () => ({ default: () => null }));
vi.mock('../utils/openSourcePRs', () => ({ loadOpenSourcePRs: async () => ({ prs: [] }), sortContributions: (entries) => entries }));
vi.mock('../utils/techIcons', () => ({ getTechIcon: () => null }));
const asciiRender = vi.hoisted(() => vi.fn());
vi.mock('ascii.rest/react', () => ({ Ascii: ({ piece, style }) => {
  asciiRender(piece);
  return <div data-testid={piece.meta.name} style={style} />;
} }));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

it('mounts Marine Drive only when approaching the footer and keeps it mounted', async () => {
  const observers = [];
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
      this.disconnect = vi.fn();
      observers.push(this);
    }
    observe() {}
  });
  vi.stubGlobal('scrollTo', vi.fn());
  const view = render(<MemoryRouter><Home theme="dark" onHomeEndVisibilityChange={vi.fn()} onSearchDockChange={vi.fn()} /></MemoryRouter>);
  const preload = observers.find((observer) => observer.options?.rootMargin === '400px 0px');
  expect(preload).toBeDefined();
  expect(screen.queryByTestId('marine drive')).toBeNull();
  act(() => preload.callback([{ isIntersecting: false }]));
  expect(screen.queryByTestId('marine drive')).toBeNull();
  act(() => preload.callback([{ isIntersecting: true }]));
  expect(await screen.findByTestId('marine drive')).toBeInTheDocument();
  expect(preload.disconnect).toHaveBeenCalled();
  act(() => preload.callback([{ isIntersecting: false }]));
  expect(screen.getByTestId('marine drive')).toBeInTheDocument();
  view.unmount();
});

it('picks from the matching banners on every theme switch and stays stable on other renders', () => {
  vi.stubGlobal('IntersectionObserver', class {
    observe() {}
    disconnect() {}
  });
  vi.stubGlobal('scrollTo', vi.fn());
  const random = vi.spyOn(Math, 'random').mockReturnValue(0);
  const home = (theme) => <MemoryRouter><Home theme={theme} onHomeEndVisibilityChange={vi.fn()} onSearchDockChange={vi.fn()} /></MemoryRouter>;
  const view = render(home('dark'));
  expect(screen.getByLabelText('Varanasi Ghats banner')).toBeInTheDocument();
  random.mockReturnValue(0.99);
  view.rerender(home('dark'));
  expect(screen.getByLabelText('Varanasi Ghats banner')).toBeInTheDocument();
  view.rerender(home('light'));
  expect(screen.getByLabelText('Jal Mahal banner')).toBeInTheDocument();
  view.rerender(home('dark'));
  expect(screen.getByLabelText('Amer Fort banner')).toBeInTheDocument();
  expect(screen.getByTestId('amer fort')).toHaveStyle({ objectPosition: 'center 25%' });
  random.mockReturnValue(0);
  view.rerender(home('light'));
  expect(screen.getByLabelText('Taj Mahal at dawn banner')).toBeInTheDocument();
  random.mockReturnValue(0.4);
  view.rerender(home('dark'));
  expect(screen.getByLabelText('Gangaur Ghat banner')).toBeInTheDocument();
  view.unmount();
});

it('batches footer layout work once per frame and cancels pending work', () => {
  vi.stubGlobal('IntersectionObserver', class { observe() {} disconnect() {} });
  vi.stubGlobal('scrollTo', vi.fn());
  const request = vi.fn().mockReturnValue(42);
  const cancel = vi.fn();
  vi.stubGlobal('requestAnimationFrame', request);
  vi.stubGlobal('cancelAnimationFrame', cancel);
  const visibility = vi.fn();
  const view = render(<MemoryRouter><Home theme="dark" onHomeEndVisibilityChange={visibility} onSearchDockChange={vi.fn()} /></MemoryRouter>);
  visibility.mockClear();
  for (let index = 0; index < 60; index++) window.dispatchEvent(new Event('scroll'));
  expect(request).toHaveBeenCalledTimes(1);
  expect(visibility).not.toHaveBeenCalled();
  act(() => request.mock.calls[0][0]());
  expect(visibility).toHaveBeenCalledTimes(1);
  window.dispatchEvent(new Event('resize'));
  expect(request).toHaveBeenCalledTimes(2);
  view.unmount();
  expect(cancel).toHaveBeenCalledWith(42);
});


it('updates the banner clock without rerendering its ASCII scene', () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-10-29T12:00:00'));
  vi.stubGlobal('IntersectionObserver', class { observe() {} disconnect() {} });
  vi.stubGlobal('scrollTo', vi.fn());
  asciiRender.mockClear();
  const view = render(<MemoryRouter><Home theme="dark" onHomeEndVisibilityChange={vi.fn()} onSearchDockChange={vi.fn()} /></MemoryRouter>);
  try {
    const time = view.container.querySelector('.home-banner-time');
    const initial = time.textContent;
    expect(asciiRender).toHaveBeenCalledTimes(1);
    act(() => vi.advanceTimersByTime(1000));
    expect(time.textContent).not.toBe(initial);
    expect(asciiRender).toHaveBeenCalledTimes(1);
  } finally {
    view.unmount();
    vi.useRealTimers();
  }
});
