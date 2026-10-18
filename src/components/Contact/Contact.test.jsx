import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Contact from './Contact';

describe('Contact resume link', () => {
  test('links to the internal resume page', () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    const resumeLink = screen.getByRole('link', { name: /view resume/i });

    expect(resumeLink).toHaveAttribute('href', '/resume');
  });
});

describe('Copy email', () => {
  const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

  afterEach(() => {
    if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
    else delete navigator.clipboard;
  });

  test('reports success only after clipboard access succeeds', async () => {
    let resolveCopy;
    const writeText = vi.fn(() => new Promise((resolve) => { resolveCopy = resolve; }));
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(<MemoryRouter><Contact /></MemoryRouter>);

    fireEvent.click(screen.getByRole('button', { name: 'Copy Email' }));
    expect(writeText).toHaveBeenCalledWith('ayushhoff@gmail.com');
    expect(screen.queryByText('Email Copied!')).not.toBeInTheDocument();
    resolveCopy();
    expect(await screen.findByText('Email Copied!')).toBeInTheDocument();
  });

  test.each(['denied', 'unavailable'])('provides an email fallback when clipboard access is %s', async (reason) => {
    const clipboard = reason === 'denied'
      ? { writeText: vi.fn().mockRejectedValue(new Error('Permission denied')) }
      : undefined;
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: clipboard });
    render(<MemoryRouter><Contact /></MemoryRouter>);

    fireEvent.click(screen.getByRole('button', { name: 'Copy Email' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Couldn’t copy');
    expect(screen.getByRole('link', { name: 'Email me instead.' })).toHaveAttribute('href', 'mailto:ayushhoff@gmail.com');
    expect(screen.queryByText('Email Copied!')).not.toBeInTheDocument();
  });
});
