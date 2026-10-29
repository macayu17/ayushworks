import { render, screen, waitFor } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import SectionIndex from './SectionIndex';

test('the page index follows the projects currently shown', async () => {
  const renderPage = (project) => (
    <>
      <main id="main-content">
        <article id={`project-${project}`} data-section-index={project}>{project}</article>
      </main>
      <SectionIndex sourceSelector="[data-section-index]" anchorSelector={null} />
    </>
  );

  const { rerender } = render(renderPage('Sentinel'));
  expect(await screen.findByRole('link', { name: 'Sentinel' })).toHaveAttribute('href', '#project-Sentinel');

  rerender(renderPage('EquityFlow'));
  await waitFor(() => {
    expect(screen.getByRole('link', { name: 'EquityFlow' })).toHaveAttribute('href', '#project-EquityFlow');
    expect(screen.queryByRole('link', { name: 'Sentinel' })).not.toBeInTheDocument();
  });
});

test('the final section becomes active at the end of the page', () => {
  vi.stubGlobal('scrollY', 400);
  vi.stubGlobal('innerHeight', 800);
  Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 1200 });

  try {
    render(
      <>
        <main id="main-content"><section id="first" /><section id="last" /></main>
        <SectionIndex sections={[{ id: 'first', label: 'First' }, { id: 'last', label: 'Interests' }]} anchorSelector={null} />
      </>,
    );
    expect(screen.getByRole('link', { name: 'Interests' })).toHaveClass('active');
  } finally {
    vi.unstubAllGlobals();
    delete document.documentElement.scrollHeight;
  }
});

test('batches scroll bursts and cancels the pending update when unmounted', () => {
  const request = vi.fn().mockReturnValue(42);
  const cancel = vi.fn();
  vi.stubGlobal('requestAnimationFrame', request);
  vi.stubGlobal('cancelAnimationFrame', cancel);
  const view = render(<SectionIndex sections={[]} anchorSelector={null} />);
  try {
    for (let index = 0; index < 60; index++) window.dispatchEvent(new Event('scroll'));
    expect(request).toHaveBeenCalledTimes(1);
    view.unmount();
    expect(cancel).toHaveBeenCalledWith(42);
  } finally {
    vi.unstubAllGlobals();
  }
});
