import { getProjectBySlug } from '../data/projects';

const SITE_URL = 'https://ayushworks.com';
const DEFAULT_IMAGE = '/favicon.svg';

const routeMetadata = {
  '/': {
    title: 'Ayush Kumar | Software Engineer',
    browserTitle: 'Ayush',
    description:
      'Ayush Kumar is a full-stack software engineer building realtime web apps, ML systems, developer tools, and polished product interfaces.',
    canonicalPath: '/',
  },
  '/about': {
    title: 'About | Ayush Kumar',
    browserTitle: 'Ayush',
    description:
      'Learn more about Ayush Kumar, a software engineer focused on full-stack development, ML systems, and practical product engineering.',
    canonicalPath: '/about',
  },
  '/projects': {
    title: 'Projects | Ayush Kumar',
    browserTitle: 'Ayush',
    description:
      'Explore Ayush Kumar projects across realtime platforms, trading systems, event products, ML prototypes, and developer tooling.',
    canonicalPath: '/projects',
  },
  '/open-source': {
    title: 'Open Source | Ayush Kumar',
    browserTitle: 'Ayush',
    description:
      'Public GitHub pull requests and GitLab merge requests contributed by Ayush Kumar across external repositories.',
    canonicalPath: '/open-source',
  },
  '/skill': {
    title: 'Skills | Ayush Kumar',
    browserTitle: 'Ayush',
    description:
      'Technical skills used by Ayush Kumar across frontend, backend, machine learning, infrastructure, databases, and cloud systems.',
    canonicalPath: '/skill',
  },
  '/contact': {
    title: 'Contact | Ayush Kumar',
    browserTitle: 'Ayush',
    description:
      'Contact Ayush Kumar for internships, full-time roles, freelance work, collaborations, and software engineering opportunities.',
    canonicalPath: '/contact',
  },
};

const getProjectSlug = (pathname) => {
  const match = pathname.match(/^\/projects\/([^/?#]+)/);
  return match?.[1] ? decodeURIComponent(match[1]) : null;
};

export const toAbsoluteUrl = (pathOrUrl) => {
  if (!pathOrUrl) {
    return `${SITE_URL}${DEFAULT_IMAGE}`;
  }

  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return `${SITE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
};

export const getSeoMetadataForPath = (pathname = '/') => {
  const normalizedPath = pathname.split('?')[0].replace(/\/$/, '') || '/';
  const projectSlug = getProjectSlug(normalizedPath);

  if (projectSlug) {
    const project = getProjectBySlug(projectSlug);
    if (project) {
      return {
        title: `${project.title} | Ayush Kumar`,
        browserTitle: 'Ayush',
        description: project.summary,
        canonicalPath: `/projects/${project.slug}`,
        image: project.image || DEFAULT_IMAGE,
        type: 'article',
      };
    }
  }

  return {
    ...(routeMetadata[normalizedPath] || routeMetadata['/']),
    image: DEFAULT_IMAGE,
    type: 'website',
  };
};

const setMetaTag = (selector, attribute, value, createAttributes = {}) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    Object.entries(createAttributes).forEach(([key, attrValue]) => {
      element.setAttribute(key, attrValue);
    });
    document.head.appendChild(element);
  }

  element.setAttribute(attribute, value);
};

export const applySeoMetadata = (metadata) => {
  if (typeof document === 'undefined') {
    return;
  }

  const absoluteUrl = toAbsoluteUrl(metadata.canonicalPath);
  const absoluteImage = toAbsoluteUrl(metadata.image);

  document.title = metadata.browserTitle || metadata.title;
  setMetaTag('meta[name="description"]', 'content', metadata.description, {
    name: 'description',
  });
  setMetaTag('meta[property="og:title"]', 'content', metadata.title, {
    property: 'og:title',
  });
  setMetaTag('meta[property="og:description"]', 'content', metadata.description, {
    property: 'og:description',
  });
  setMetaTag('meta[property="og:type"]', 'content', metadata.type || 'website', {
    property: 'og:type',
  });
  setMetaTag('meta[property="og:url"]', 'content', absoluteUrl, {
    property: 'og:url',
  });
  setMetaTag('meta[property="og:image"]', 'content', absoluteImage, {
    property: 'og:image',
  });
  setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image', {
    name: 'twitter:card',
  });
  setMetaTag('meta[name="twitter:title"]', 'content', metadata.title, {
    name: 'twitter:title',
  });
  setMetaTag('meta[name="twitter:description"]', 'content', metadata.description, {
    name: 'twitter:description',
  });
  setMetaTag('meta[name="twitter:image"]', 'content', absoluteImage, {
    name: 'twitter:image',
  });

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', absoluteUrl);
};
