import AboutHeader from './AboutHeader.jsx'

export default {
  title: 'Shared / AboutHeader',
  component: AboutHeader,
  args: {
    navTitle: 'About',
    links: [
      {
        href: '/about',
        label: 'About'
      },
      {
        href: '/about/publications',
        label: 'Publications'
      },
      {
        href: '/about/team',
        label: 'Team'
      },
      {
        href: '/about/resources',
        label: 'Resources'
      },
      {
        href: '/about/faq',
        label: 'FAQ'
      }
    ]
  }
}

export const Default = {}
