import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, expect, it, vi } from 'vitest';
import Home from './Home';

vi.mock('../components/Hero/Hero', () => ({ default: () => null }));
vi.mock('../components/Projects/Projects', () => ({ default: () => null }));
vi.mock('../components/GitHubContributions/GitHubContributions', () => ({ default: () => null }));
vi.mock('../utils/openSourcePRs', () => ({ loadOpenSourcePRs: async () => ({ prs: [] }) }));
vi.mock('../utils/techIcons', () => ({ getTechIcon: () => null }));
vi.mock('ascii.rest/react', () => ({ Ascii: ({ piece }) => <div data-testid={piece.meta.name} /> }));

afterEach(() => vi.unstubAllGlobals());

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
