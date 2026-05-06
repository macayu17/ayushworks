const normalize = (value = '') => String(value).trim().toLowerCase();

const includesSearchTerm = (project, query) => {
  const searchTerm = normalize(query);
  if (!searchTerm) {
    return true;
  }

  const searchableFields = [
    project.title,
    project.status,
    project.category,
    project.summary,
    ...(project.tags || []),
  ];

  return searchableFields.some((value) => normalize(value).includes(searchTerm));
};

export const filterProjects = (projects, filters = {}) => {
  const statusFilter = normalize(filters.status);
  const tagFilter = normalize(filters.tag);

  return projects.filter((project) => {
    const matchesQuery = includesSearchTerm(project, filters.query);
    const matchesStatus = !statusFilter || normalize(project.status) === statusFilter;
    const matchesTag =
      !tagFilter || (project.tags || []).some((tag) => normalize(tag) === tagFilter);

    return matchesQuery && matchesStatus && matchesTag;
  });
};

export const getProjectFilterOptions = (projects) => {
  const statuses = new Set();
  const tags = new Set();

  projects.forEach((project) => {
    if (project.status) {
      statuses.add(project.status);
    }

    (project.tags || []).forEach((tag) => tags.add(tag));
  });

  return {
    statuses: [...statuses].sort((first, second) => first.localeCompare(second)),
    tags: [...tags].sort((first, second) => first.localeCompare(second)),
  };
};
