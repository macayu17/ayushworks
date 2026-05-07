const MIN_DESKTOP_WIDTH = 768;
const MIN_DESKTOP_HEIGHT = 520;
const DEFAULT_FRAME_INTERVAL = 110;
const DEFAULT_FONT_SIZE = 18;
const MAX_CANVAS_PIXEL_RATIO = 1.25;
const COLUMN_STEP = 2;

const toFiniteNumber = (value, fallback) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

export const getVisualEffectsProfile = ({
  reducedMotion = false,
  hoverCapable = false,
  viewportWidth = 0,
  viewportHeight = 0,
  devicePixelRatio = 1,
  saveData = false,
} = {}) => {
  const width = toFiniteNumber(viewportWidth, 0);
  const height = toFiniteNumber(viewportHeight, 0);
  const pixelRatio = Math.max(1, toFiniteNumber(devicePixelRatio, 1));
  const isSmallViewport = width < MIN_DESKTOP_WIDTH || height < MIN_DESKTOP_HEIGHT;
  const canRunDecorativeEffects = !reducedMotion && !saveData && hoverCapable;

  return {
    matrixEnabled: canRunDecorativeEffects && !isSmallViewport,
    cursorEnabled: canRunDecorativeEffects,
    matrixFrameInterval: DEFAULT_FRAME_INTERVAL,
    matrixFontSize: DEFAULT_FONT_SIZE,
    matrixPixelRatio: Math.min(pixelRatio, MAX_CANVAS_PIXEL_RATIO),
    matrixColumnStep: COLUMN_STEP,
  };
};

export const readVisualEffectsProfile = () => {
  if (typeof window === 'undefined') {
    return getVisualEffectsProfile({ reducedMotion: true });
  }

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  return getVisualEffectsProfile({
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    hoverCapable: window.matchMedia('(hover: hover) and (pointer: fine)').matches,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    saveData: Boolean(connection?.saveData),
  });
};

export const areVisualEffectsProfilesEqual = (first, second) => (
  Boolean(first) &&
  Boolean(second) &&
  first.matrixEnabled === second.matrixEnabled &&
  first.cursorEnabled === second.cursorEnabled &&
  first.matrixFrameInterval === second.matrixFrameInterval &&
  first.matrixFontSize === second.matrixFontSize &&
  first.matrixPixelRatio === second.matrixPixelRatio &&
  first.matrixColumnStep === second.matrixColumnStep
);
