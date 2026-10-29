import { act, render } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import TypedPrompt from './TypedPrompt';

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

const media = (mobile) => {
  const queries = new Map();
  vi.stubGlobal('matchMedia', vi.fn((query) => {
    const result = { matches: query.includes('639px') && mobile, addEventListener: vi.fn(), removeEventListener: vi.fn() };
    queries.set(query, result);
    return result;
  }));
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
  return queries;
};

test('keeps the desktop typing, hold and deletion timing', () => {
  vi.useFakeTimers(); media(false);
  const view = render(<TypedPrompt />);
  act(() => vi.advanceTimersByTime(449));
  expect(view.container.textContent.trim()).toBe('');
  act(() => vi.advanceTimersByTime(1));
  expect(view.container.textContent).toBe('E');
  act(() => vi.advanceTimersByTime(65 * 18));
  expect(view.container.textContent).toBe('Explore my projects');
  act(() => vi.advanceTimersByTime(2099));
  expect(view.container.textContent).toBe('Explore my projects');
  act(() => vi.advanceTimersByTime(1));
  expect(view.container.textContent).toBe('Explore my project');
  view.unmount();
  expect(vi.getTimerCount()).toBe(0);
});

test('runs no hidden mobile timer, and resumes when the desktop trigger is visible', () => {
  vi.useFakeTimers(); const queries = media(true);
  const view = render(<TypedPrompt />);
  expect(vi.getTimerCount()).toBe(0);
  const mobile = queries.get('(max-width: 639px)');
  mobile.matches = false;
  act(() => mobile.addEventListener.mock.calls[0][1]());
  act(() => vi.advanceTimersByTime(450));
  expect(view.container.textContent).toBe('E');
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
  act(() => document.dispatchEvent(new Event('visibilitychange')));
  expect(vi.getTimerCount()).toBe(0);
  view.unmount();
  expect(mobile.removeEventListener).toHaveBeenCalled();
});
