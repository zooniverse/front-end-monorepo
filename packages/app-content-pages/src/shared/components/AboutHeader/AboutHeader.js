import { Box } from 'grommet'
import { useTranslation } from 'next-i18next'
import { ZooniverseLogotype } from '@zooniverse/react-components'

import NavLink from './components/NavLink'

function AboutHeader() {
  const { t } = useTranslation('components')

  const links = [
    {
      href: '/',
      label: t('AboutHeader.links.about')
    },
    {
      href: '/publications',
      label: t('AboutHeader.links.publications')
    },
    {
      href: '/team',
      label: t('AboutHeader.links.team')
    },
    // {
    //   href: '/acknowledgements',
    //   label: t('AboutHeader.links.acknowledgements')
    // },
    {
      href: '/resources',
      label: t('AboutHeader.links.resources')
    },
    // {
    //   href: '/contact',
    //   label: t('AboutHeader.links.contact')
    // },
    {
      href: '/faq',
      label: t('AboutHeader.links.faq')
    },
    // {
    //   href: '/highlights',
    //   label: t('AboutHeader.links.highlights')
    // },
    // {
    //   href: '/mobile-app',
    //   label: t('AboutHeader.links.mobile')
    // },
    // {
    //   href: '/donate',
    //   label: t('AboutHeader.links.donate')
    // }
  ]

  return (
    <Box
      align='center'
      direction='row'
      as='nav'
      background='brand'
      pad={{ horizontal: '2rem' }}
    >
      <Box
        aria-label={`${t('AboutHeader.title')} Zooniverse`}
        align='left'
        as='ul'
        direction='row'
        gap='small'
        pad={{ left: 'none' }}
        width='100%'
        wrap
      >
        {links.map(link => (
          <Box as='li' key={link.label}>
            <NavLink color='white' label={link.label} href={link.href} />
          </Box>
        ))}
      </Box>
      <ZooniverseLogotype id="About Zooniverse Header component" color='white' />
    </Box>
  )
}

export default AboutHeader
