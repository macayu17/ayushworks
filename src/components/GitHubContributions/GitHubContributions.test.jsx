import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, expect, it, vi } from 'vitest';
import GitHubContributions from './GitHubContributions';

vi.mock('react-tooltip', () => ({ Tooltip: () => null }));

afterEach(() => {
  delete document.body.dataset.profileIntro;
  vi.unstubAllGlobals();
});

it('waits for data, visibility and the profile intro, then reveals once with a left-to-right stagger', async () => {
  let resolveFetch;
  const observers = [];
  vi.stubGlobal('fetch', vi.fn(() => new Promise((resolve) => { resolveFetch = resolve; })));
  vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback) {
      this.callback = callback;
      this.disconnect = vi.fn();
      observers.push(this);
    }
    observe() {}
  });
  document.body.dataset.profileIntro = 'reveal';
  const view = render(<MemoryRouter><GitHubContributions /></MemoryRouter>);
  const grid = screen.getByLabelText('macayu17 GitHub contribution calendar');
  expect(grid).not.toHaveClass('is-revealed');
  expect(observers).toHaveLength(0);
  await act(async () => resolveFetch({ json: async () => ({ contributions: [], total: { 2026: 42 } }) }));
  expect(observers).toHaveLength(1);
  act(() => observers[0].callback([{ isIntersecting: false }]));
  expect(grid).not.toHaveClass('is-revealed');
  act(() => observers[0].callback([{ isIntersecting: true }]));
  expect(grid).not.toHaveClass('is-revealed');
  await act(async () => { delete document.body.dataset.profileIntro; });
  await waitFor(() => expect(grid).toHaveClass('is-revealed'));
  expect(observers[0].disconnect).toHaveBeenCalled();
  const firstWeek = grid.querySelectorAll('.calendar-week')[0];
  const secondWeek = grid.querySelectorAll('.calendar-week')[1];
  expect(firstWeek.style.getPropertyValue('--week-delay')).toBe('0ms');
  expect(secondWeek.style.getPropertyValue('--week-delay')).toBe('16ms');
  expect(firstWeek.children[0].style.getPropertyValue('--cell-delay')).toBe('');
  act(() => observers[0].callback([{ isIntersecting: false }]));
  expect(grid).toHaveClass('is-revealed');
  view.unmount();
});
