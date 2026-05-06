import { describe, expect, test } from 'vitest';
import { getContributionCubeProps } from './contributionCube';

describe('contribution cube animation props', () => {
  test('adds cube animation metadata only for active contribution days', () => {
    expect(getContributionCubeProps({ count: 0 }, 4)).toEqual({});

    const props = getContributionCubeProps({ count: 3 }, 4);

    expect(props.className).toBe('contribution-cube-cell');
    expect(props.style).toEqual({
      '--cube-delay': '168ms',
      '--cube-energy': 3,
    });
  });

  test('caps animation intensity for very active days', () => {
    const props = getContributionCubeProps({ count: 42 }, 1);

    expect(props.style['--cube-energy']).toBe(4);
  });
});
