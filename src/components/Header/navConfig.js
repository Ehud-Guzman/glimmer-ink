// components/Header/navConfig.js
export const navLinks = [
  { name: 'Home', href: '/' },
  {
    name: 'Portfolio',
    href: '/portfolio',
    subLinks: [
      { name: 'Web Design', href: '/portfolio/#web' },
      { name: 'Branding', href: '/portfolio/#branding' },
      { name: 'Illustration', href: '/portfolio/#illustration' },
    ],
  },
  {
    name: 'Services',
    href: '/services',
    subLinks: [
      { name: 'UI/UX Design', href: '/services/#design' },
      { name: 'Development', href: '/services/#development' },
      { name: 'Consulting', href: '/services/#consulting' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];
