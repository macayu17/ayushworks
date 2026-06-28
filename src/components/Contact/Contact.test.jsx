import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
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
