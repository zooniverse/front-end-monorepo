import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'
import { Box, Text } from 'grommet'
import { useTranslation } from 'next-i18next'

import NavLink from './components/NavLink'
import theme from './theme'

function AboutHeader () {
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
    <Box align='center' as='header' background='brand'>

      <Box margin={{ bottom: 'large', top: 'xlarge' }} width='xlarge'>
        <Text color='white' size='xxlarge'>
          {t('AboutHeader.title')}
        </Text>
      </Box>

      <Box
        aria-label={`${t('AboutHeader.title')} Zooniverse`}
        as='nav'
        direction='row'
        margin={{ bottom: 'xsmall' }}
        width='xlarge'
      >
        {links.map(link => (
          <NavLink key={link.label} label={link.label} href={link.href} />
        ))}
      </Box>
    </Box>
  )
}

export default withThemeContext(AboutHeader, theme)
export { AboutHeader }
