import { Box } from 'grommet'
import { useTranslation } from '../../translations/i18n.js'
import { ZooniverseLogotype } from '@zooniverse/react-components'

import NavLink from './components/NavLink'

function AboutHeader({ pathname = '' }) {
  const { t } = useTranslation()

  const links = [
    {
      href: '/about',
      label: t('AboutHeader.links.about')
    },
    {
      href: '/about/publications',
      label: t('AboutHeader.links.publications')
    },
    {
      href: '/about/team',
      label: t('AboutHeader.links.team')
    },
    {
      href: '/about/resources',
      label: t('AboutHeader.links.resources')
    },
    {
      href: '/about/faq',
      label: t('AboutHeader.links.faq')
    }
  ]

  return (
    <header>
      <Box
        align='center'
        aria-label={`${t('AboutHeader.title')} Zooniverse`}
        direction='row'
        as='nav'
        background='neutral-1'
        pad={{ horizontal: 'medium' }}
      >
        <Box
          align='left'
          as='ul'
          direction='row'
          pad={{ left: 'none' }}
          width='100%'
          wrap
          // We don't use gap here bc gap inserts <div> into this <ul>
        >
          {links.map(link => (
            <Box as='li' key={link.label} pad={{ right: 'small' }}>
              <NavLink pathname={pathname} color='white' label={link.label} href={link.href} />
            </Box>
          ))}
        </Box>
        <ZooniverseLogotype id="About Zooniverse Header component" color='white' />
      </Box>
    </header>
  )
}

export default AboutHeader
