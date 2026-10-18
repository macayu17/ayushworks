import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import BookCall from './BookCall';

describe('Booking calendar loading', () => {
  beforeEach(() => vi.spyOn(window, 'scrollTo').mockImplementation(() => {}));
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('keeps the direct link available before the calendar loads', () => {
    render(<MemoryRouter><BookCall theme="dark" /></MemoryRouter>);
    const frame = screen.getByTitle('Book a 15-minute call with Ayush');
    const fallback = screen.getByRole('link', { name: /Open it on Cal.com/ });

    expect(screen.getByRole('status')).toHaveTextContent('Loading calendar');
    expect(fallback.compareDocumentPosition(frame) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    fireEvent.load(frame);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  test('offers a fallback for slow loading and recovers when the frame loads', () => {
    vi.useFakeTimers();
    render(<MemoryRouter><BookCall theme="dark" /></MemoryRouter>);
    act(() => vi.advanceTimersByTime(15000));
    expect(screen.getByRole('status')).toHaveTextContent('taking longer than usual');
    expect(screen.getByRole('link', { name: /Open it on Cal.com/ })).toHaveAttribute('href', 'https://cal.com/ayushoff/15min');
    fireEvent.load(screen.getByTitle('Book a 15-minute call with Ayush'));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  test('shows loading again when the theme changes', () => {
    const { rerender } = render(<MemoryRouter><BookCall theme="dark" /></MemoryRouter>);
    fireEvent.load(screen.getByTitle('Book a 15-minute call with Ayush'));
    rerender(<MemoryRouter><BookCall theme="light" /></MemoryRouter>);
    expect(screen.getByRole('status')).toHaveTextContent('Loading calendar');
  });
});
