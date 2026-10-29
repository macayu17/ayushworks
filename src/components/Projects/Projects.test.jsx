import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import Projects from './Projects';

vi.mock('react-parallax-tilt', () => ({ default: ({ children }) => <div>{children}</div> }));
const item = { slug: 'test', title: 'Test', category: 'Demo', tags: [], imageDark: '/dark.webp', imageLight: '/light.webp' };

test('uses the app theme directly for project previews', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
  const projects = (theme) => <MemoryRouter><Projects theme={theme} items={[item]} /></MemoryRouter>;
  const view = render(projects('dark'));
  try {
    expect(screen.getByAltText('Test preview')).toHaveAttribute('src', '/dark.webp');
    view.rerender(projects('light'));
    expect(screen.getByAltText('Test preview')).toHaveAttribute('src', '/light.webp');
  } finally {
    view.unmount(); vi.unstubAllGlobals();
  }
});
