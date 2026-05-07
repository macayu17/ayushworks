import { describe, expect, test } from 'vitest';
import { areVisualEffectsProfilesEqual, getVisualEffectsProfile } from './visualEffects';

describe('visual effects profile', () => {
  test('disables expensive decorative effects for reduced motion and touch/mobile contexts', () => {
    expect(getVisualEffectsProfile({
      reducedMotion: true,
      hoverCapable: true,
      viewportWidth: 1280,
      viewportHeight: 720,
      devicePixelRatio: 1,
    })).toMatchObject({
      matrixEnabled: false,
      cursorEnabled: false,
    });

    expect(getVisualEffectsProfile({
      reducedMotion: false,
      hoverCapable: false,
      viewportWidth: 390,
      viewportHeight: 844,
      devicePixelRatio: 3,
    })).toMatchObject({
      matrixEnabled: false,
      cursorEnabled: false,
    });
  });

  test('caps desktop matrix work instead of running at full device resolution', () => {
    expect(getVisualEffectsProfile({
      reducedMotion: false,
      hoverCapable: true,
      viewportWidth: 1440,
      viewportHeight: 900,
      devicePixelRatio: 2.5,
    })).toEqual({
      matrixEnabled: true,
      cursorEnabled: true,
      matrixFrameInterval: 110,
      matrixFontSize: 18,
      matrixPixelRatio: 1.25,
      matrixColumnStep: 2,
    });
  });

  test('compares profile values so resize handlers can avoid duplicate updates', () => {
    const profile = getVisualEffectsProfile({
      reducedMotion: false,
      hoverCapable: true,
      viewportWidth: 1440,
      viewportHeight: 900,
      devicePixelRatio: 2,
    });

    expect(areVisualEffectsProfilesEqual(profile, { ...profile })).toBe(true);
    expect(areVisualEffectsProfilesEqual(profile, {
      ...profile,
      matrixEnabled: false,
    })).toBe(false);
  });
});
