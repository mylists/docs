// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Introduction & Overview',
    },
    {
      type: 'category',
      label: 'MTVL App User Guide',
      collapsed: false,
      items: [
        'app/overview',
        'app/catalogs',
        'app/tracking-lists',
        'app/ratings-and-progress',
        'app/search-and-discovery',
        'app/import-export',
        'app/profile-and-tokens',
      ],
    },
    {
      type: 'category',
      label: 'MTVL REST API Reference',
      collapsed: false,
      items: [
        'api/overview',
        'api/authentication',
        'api/categories',
        'api/movies',
        'api/tvshows',
        'api/books',
        'api/search',
        'api/stats',
        'api/import-export',
        'api/tokens',
        'api/health-probes',
      ],
    },
    {
      type: 'category',
      label: 'Developer Guide',
      collapsed: false,
      items: [
        'developer/architecture',
        'developer/getting-started',
        'developer/adding-categories',
        'developer/pluggable-auth',
        'developer/frontend-development',
        'developer/testing',
      ],
    },
    {
      type: 'category',
      label: 'Neon Postgres Setup',
      collapsed: false,
      items: [
        'neon/overview',
        'neon/quickstart',
        'neon/connection-pooling',
        'neon/migrations',
        'neon/branching-workflow',
        'neon/deployment',
      ],
    },
  ],
};

module.exports = sidebars;
