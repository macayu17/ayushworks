export const getOpenSourceMetricCards = (prs = []) => {
  const organizationCounts = prs.reduce((counts, entry) => {
    const organization = entry.repository.split('/')[0];
    if (organization) {
      counts.set(organization, (counts.get(organization) || 0) + 1);
    }
    return counts;
  }, new Map());
  const organizations = [...organizationCounts.keys()].sort(
    (first, second) => organizationCounts.get(second) - organizationCounts.get(first) || first.localeCompare(second),
  );
  const mergedCount = prs.filter((entry) => entry.status === 'Merged').length;
  const openCount = prs.filter((entry) => entry.status === 'Open').length;

  return [
    { label: 'Tracked PRs / MRs', value: prs.length },
    { label: 'Merged', value: mergedCount },
    {
      label: 'Organizations',
      logos: organizations.slice(0, 5).map((name) => ({
        name,
        src: `https://github.com/${name}.png?size=64`,
      })),
    },
    { label: 'Open PRs / MRs', value: openCount },
  ];
};
