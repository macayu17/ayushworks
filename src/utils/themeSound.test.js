import { afterEach, expect, it, vi } from 'vitest';
import { createThemeSound } from './themeSound';

afterEach(() => vi.unstubAllGlobals());

it('prepares embedded audio and schedules playback without waiting for context resume', async () => {
  const audio = { load: vi.fn(), play: vi.fn(() => Promise.resolve()) };
  vi.stubGlobal('Audio', vi.fn(function () { return audio; }));
  const source = { connect: vi.fn(), start: vi.fn(), stop: vi.fn() };
  const decoded = {};
  const context = {
    state: 'suspended', destination: {},
    createGain: () => ({ gain: {}, connect: vi.fn() }),
    decodeAudioData: vi.fn(async () => decoded),
    resume: vi.fn(() => new Promise(() => {})),
    createBufferSource: () => source,
  };
  vi.stubGlobal('AudioContext', vi.fn(function () { return context; }));
  vi.stubGlobal('fetch', vi.fn(async () => ({ arrayBuffer: async () => new ArrayBuffer(8) })));
  const play = createThemeSound('data:audio/mpeg;base64,example');
  expect(audio.load).toHaveBeenCalled();
  await vi.waitFor(() => {
    play();
    expect(source.start).toHaveBeenCalled();
  });
  expect(fetch).toHaveBeenCalledWith('data:audio/mpeg;base64,example');
  expect(source.buffer).toBe(decoded);
  expect(context.resume).toHaveBeenCalled();
  play();
  expect(source.stop).toHaveBeenCalled();
});

it('uses the preloaded element when Web Audio is unavailable and tolerates denied playback', async () => {
  const audio = { load: vi.fn(), play: vi.fn(() => Promise.reject(new Error('denied'))) };
  vi.stubGlobal('Audio', vi.fn(function () { return audio; }));
  vi.stubGlobal('AudioContext', undefined);
  vi.stubGlobal('webkitAudioContext', undefined);
  vi.stubGlobal('fetch', vi.fn());
  const play = createThemeSound('data:audio/mpeg;base64,example');
  expect(() => play()).not.toThrow();
  expect(audio.currentTime).toBe(0);
  expect(audio.play).toHaveBeenCalled();
  expect(fetch).not.toHaveBeenCalled();
  await Promise.resolve();
});
