// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MTVL Documentation',
  tagline: 'Modular Media & Literature Tracking Platform, API, and Developer Guide',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.mylists.cc',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'mylists',
  projectName: 'docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/', // Serve docs from the root
          editUrl: 'https://github.com/mylists/docs/tree/main/',
        },
        blog: false, // Optional: disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/mtvl-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'MTVL Docs',
        logo: {
          alt: 'MTVL Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/api/overview',
            label: 'API Reference',
            position: 'left',
          },
          {
            to: '/developer/architecture',
            label: 'Developer Guide',
            position: 'left',
          },
          {
            to: '/neon/overview',
            label: 'Neon Setup',
            position: 'left',
          },
          {
            href: 'https://github.com/mylists/mtvl',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/',
              },
              {
                label: 'App User Guide',
                to: '/app/overview',
              },
              {
                label: 'API Reference',
                to: '/api/overview',
              },
            ],
          },
          {
            title: 'Developers',
            items: [
              {
                label: 'Architecture',
                to: '/developer/architecture',
              },
              {
                label: 'Adding Categories',
                to: '/developer/adding-categories',
              },
              {
                label: 'Neon Postgres Setup',
                to: '/neon/overview',
              },
            ],
          },
          {
            title: 'Ecosystem & Repositories',
            items: [
              {
                label: 'Backend (mtvl)',
                href: 'https://github.com/mylists/mtvl',
              },
              {
                label: 'Frontend (mtvl-frontend)',
                href: 'https://github.com/mylists/mtvl-frontend',
              },
              {
                label: 'Kubernetes Helm Charts',
                href: 'https://github.com/mylists/kubernetes',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MTVL (mylists). Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
        additionalLanguages: ['bash', 'json', 'go', 'sql', 'yaml', 'docker', 'typescript'],
      },
    }),
};

module.exports = config;
