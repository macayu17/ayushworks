export const createThemeSound = (url) => {
  const audio = new Audio(url);
  audio.volume = 0.32;
  audio.preload = 'auto';
  audio.load();
  let context;
  let buffer;
  let gain;
  let activeSource;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      context = new AudioContext({ latencyHint: 'interactive' });
      gain = context.createGain();
      gain.gain.value = 0.32;
      gain.connect(context.destination);
      fetch(url)
        .then((response) => response.arrayBuffer())
        .then((bytes) => context.decodeAudioData(bytes))
        .then((decoded) => { buffer = decoded; })
        .catch(() => {});
    }
  } catch {
    // The preloaded audio element also works when Web Audio is unavailable.
  }

  return () => {
    try {
      if (buffer && context.state !== 'closed') {
        // Schedule on the audio thread before the theme's canvas work begins.
        context.resume().catch(() => {});
        activeSource?.stop();
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(gain);
        source.start();
        activeSource = source;
      } else {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    } catch {
      // A browser denying sound must not prevent changing theme.
    }
  };
};
