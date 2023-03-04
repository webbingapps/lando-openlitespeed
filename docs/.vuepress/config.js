import {defineUserConfig} from '@vuepress/cli';
import {defaultThemePlus} from '@lando/vuepress-theme-default-plus';

export default defineUserConfig({
  lang: 'en-US',
  title: 'Lando',
  description: 'Lando LandoOpenLiteSpeed Plugin Documentation',
  base: '/openlitespeed/',
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width, initial-scale=1'}],
    ['link', {rel: 'icon', href: '/openlitespeed/favicon.ico', size: 'any'}],
    ['link', {rel: 'icon', href: '/openlitespeed/favicon.svg', type: 'image/svg+xml'}],
    ['link', {rel: 'preconnect', href: '//fonts.googleapis.com'}],
    ['link', {rel: 'preconnect', href: '//fonts.gstatic.com', crossorigin: true}],
    ['link', {rel: 'stylesheet', href: '//fonts.googleapis.com/css2?family=Lexend:wght@500&display=swap'}],
  ],
  theme: defaultThemePlus({
    landoDocs: true,
    logo: '/images/icon.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'lando/openlitespeed',
    sidebarHeader: {
      enabled: true,
      title: 'LandoOpenLiteSpeed Plugin',
      icon: '/images/openlitespeedicon.png',
    },
    sidebar: [
      {
        text: 'Getting Started',
        link: '/index.html',
      },
      '/config.html',
      '/support.html',
      {text: 'Examples', link: 'https://github.com/lando/openlitespeed/tree/main/examples'},
      {text: 'Release Notes', link: 'https://github.com/lando/openlitespeed/releases'},
      '/development.html',
    ],
  }),
});
