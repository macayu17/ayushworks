import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Contact from './Contact';

const UPDATED_RESUME_URL =
  'https://drive.google.com/file/d/1ZTOkMCdRPItP7UQhPIlFogsYbIAUGu9p/view?usp=sharing';

describe('Contact resume link', () => {
  test('opens the updated resume in a new tab', () => {
    render(<Contact />);

    const resumeLink = screen.getByRole('link', { name: /view resume/i });

    expect(resumeLink).toHaveAttribute('href', UPDATED_RESUME_URL);
    expect(resumeLink).toHaveAttribute('target', '_blank');
    expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
