const DESKTOP_WEEK_COLUMNS = 53;
const MOBILE_WEEK_COLUMNS = 44;
const HORIZONTAL_SAFE_SPACE = 8;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const getContributionCalendarLayout = ({ containerWidth = 0, compact = false } = {}) => {
  const maxBlockSize = compact ? 6 : 11;
  const minBlockSize = compact ? 4 : 5;
  const weekColumns = compact ? MOBILE_WEEK_COLUMNS : DESKTOP_WEEK_COLUMNS;
  const usableWidth = Math.max(containerWidth - HORIZONTAL_SAFE_SPACE, 0);
  const marginCandidates = compact ? [1] : [2, 1];

  const layouts = marginCandidates.map((blockMargin) => {
    const rawBlockSize = Math.floor(
      (usableWidth - ((weekColumns - 1) * blockMargin)) / weekColumns,
    );
    const blockSize = clamp(rawBlockSize, minBlockSize, maxBlockSize);

    return {
      blockSize,
      blockMargin,
      fontSize: compact ? 9 : 10,
      occupiedWidth: (weekColumns * blockSize) + ((weekColumns - 1) * blockMargin),
    };
  });

  const bestLayout = layouts
    .filter((layout) => layout.occupiedWidth <= usableWidth)
    .sort((first, second) => {
      if (second.blockSize !== first.blockSize) {
        return second.blockSize - first.blockSize;
      }

      return second.occupiedWidth - first.occupiedWidth;
    })[0] || layouts.at(-1);

  return {
    blockSize: bestLayout.blockSize,
    blockMargin: bestLayout.blockMargin,
    fontSize: bestLayout.fontSize,
  };
};
