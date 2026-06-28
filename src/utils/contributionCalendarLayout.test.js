import { describe, expect, test } from 'vitest';
import { getContributionCalendarLayout } from './contributionCalendarLayout';

describe('contribution calendar layout', () => {
  test('reduces desktop block size so the calendar fits narrow containers', () => {
    expect(getContributionCalendarLayout({ containerWidth: 520, compact: false })).toEqual({
      blockSize: 8,
      blockMargin: 1,
      fontSize: 10,
    });
  });

  test('keeps larger blocks when there is enough room', () => {
    expect(getContributionCalendarLayout({ containerWidth: 720, compact: false })).toEqual({
      blockSize: 11,
      blockMargin: 2,
      fontSize: 10,
    });
  });

  test('uses larger desktop blocks to avoid an awkward right-side gap', () => {
    expect(getContributionCalendarLayout({ containerWidth: 590, compact: false })).toEqual({
      blockSize: 10,
      blockMargin: 1,
      fontSize: 10,
    });
  });

  test('uses smaller mobile sizing and never returns unusable blocks', () => {
    expect(getContributionCalendarLayout({ containerWidth: 320, compact: true })).toEqual({
      blockSize: 6,
      blockMargin: 1,
      fontSize: 9,
    });
  });
});
