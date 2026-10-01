import AboutHeader from './AboutHeader'

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
      },
      {
        href: '/about/ai-ethics',
        label: 'AI Ethics'
      }
    ]
  }
}

export const Default = {}
