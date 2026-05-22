export const getOpenSourceMetricCards = (prs = []) => {
  const repositoryCount = new Set(prs.map((entry) => entry.repository)).size;
  const mergedCount = prs.filter((entry) => entry.status === 'Merged').length;
  const openCount = prs.filter((entry) => entry.status === 'Open').length;

  return [
    { label: 'Tracked PRs / MRs', value: prs.length },
    { label: 'Merged', value: mergedCount },
    { label: 'Repositories', value: repositoryCount },
    { label: 'Open PRs / MRs', value: openCount },
  ];
};
