const padDatePart = (value) => String(value).padStart(2, '0');

const toDateKey = (date) => (
  `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`
);

const startOfLocalDay = (date) => new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate(),
);

const addDays = (date, days) => new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDate() + days,
);

const getStartOfWeek = (date) => addDays(startOfLocalDay(date), -startOfLocalDay(date).getDay());

const getEndOfWeek = (date) => addDays(getStartOfWeek(date), 6);

const getCutoffDate = (now, monthsBack) => {
  const cutoffDate = startOfLocalDay(now);
  cutoffDate.setMonth(cutoffDate.getMonth() - monthsBack);
  return cutoffDate;
};

const createEmptyContributionDay = (date) => ({
  date: toDateKey(date),
  count: 0,
  level: 0,
});

export const getWeekPaddedContributionRange = (
  contributions,
  { monthsBack = 12, now = new Date() } = {},
) => {
  const contributionByDate = new Map(
    (Array.isArray(contributions) ? contributions : [])
      .filter((contribution) => contribution?.date)
      .map((contribution) => [contribution.date, contribution]),
  );

  const startDate = getStartOfWeek(getCutoffDate(now, monthsBack));
  const endDate = getEndOfWeek(startOfLocalDay(now));
  const paddedRange = [];

  for (let currentDate = startDate; currentDate <= endDate; currentDate = addDays(currentDate, 1)) {
    const dateKey = toDateKey(currentDate);
    paddedRange.push(contributionByDate.get(dateKey) || createEmptyContributionDay(currentDate));
  }

  return paddedRange;
};
