import { describe, expect, test } from 'vitest';
import { getWeekPaddedContributionRange } from './contributionCalendarData';

describe('contribution calendar data', () => {
  test('pads a desktop one-year range to full week boundaries', () => {
    const result = getWeekPaddedContributionRange(
      [
        { date: '2025-05-04', count: 2, level: 1 },
        { date: '2026-05-06', count: 3, level: 2 },
      ],
      { monthsBack: 12, now: new Date(2026, 4, 7) },
    );

    expect(result).toHaveLength(371);
    expect(result[0]).toEqual({ date: '2025-05-04', count: 2, level: 1 });
    expect(result.at(-1)).toEqual({ date: '2026-05-09', count: 0, level: 0 });
    expect(result.find((day) => day.date === '2026-05-06')).toEqual({
      date: '2026-05-06',
      count: 3,
      level: 2,
    });
  });

  test('pads the compact ten-month range to 44 complete weeks', () => {
    const result = getWeekPaddedContributionRange([], {
      monthsBack: 10,
      now: new Date(2026, 4, 7),
    });

    expect(result).toHaveLength(308);
    expect(result[0].date).toBe('2025-07-06');
    expect(result.at(-1).date).toBe('2026-05-09');
  });
});
