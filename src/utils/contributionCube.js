const MAX_CUBE_ENERGY = 4;
const STAGGER_STEP_MS = 42;
const STAGGER_WINDOW = 18;

const getStableIndex = (activity, visibleIndex) => {
  if (Number.isFinite(visibleIndex)) {
    return visibleIndex;
  }

  return String(activity?.date || '')
    .split('')
    .reduce((total, char) => total + char.charCodeAt(0), 0);
};

export const getContributionCubeProps = (activity, visibleIndex = 0) => {
  const count = Number(activity?.count) || 0;

  if (count <= 0) {
    return {};
  }

  const staggerIndex = getStableIndex(activity, visibleIndex);

  return {
    className: 'contribution-cube-cell',
    style: {
      '--cube-delay': `${(staggerIndex % STAGGER_WINDOW) * STAGGER_STEP_MS}ms`,
      '--cube-energy': Math.min(count, MAX_CUBE_ENERGY),
    },
  };
};
