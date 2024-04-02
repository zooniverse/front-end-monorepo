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
    {
      href: '/acknowledgements',
      label: t('AboutHeader.links.acknowledgements')
    },
    {
      href: '/resources',
      label: t('AboutHeader.links.resources')
    },
    {
      href: '/contact',
      label: t('AboutHeader.links.contact')
    },
    {
      href: '/faq',
      label: t('AboutHeader.links.faq')
    },
    {
      href: '/highlights',
      label: t('AboutHeader.links.highlights')
    },
    {
      href: '/mobile-app',
      label: t('AboutHeader.links.mobile')
    },
    {
      href: '/donate',
      label: t('AboutHeader.links.donate')
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
              <NavLink color='white' label={link.label} href={link.href} />
            </Box>
          ))}
        </Box>
        {/* Enable logo when ready for all About Zooniverse pages to be hosted from FEM */}
        {/* <ZooniverseLogotype id="About Zooniverse Header component" color='white' /> */}
      </Box>
    </header>
  )
}

export default AboutHeader
