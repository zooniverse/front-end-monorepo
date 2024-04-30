import { Box } from 'grommet'
import { useTranslation } from '../../translations/i18n.js'
import { ZooniverseLogotype } from '@zooniverse/react-components'
import styled from 'styled-components'

import NavLink from './components/NavLink'

const AboutHeaderBreakpoint = '36rem'

const StyledLogo = styled(ZooniverseLogotype)`
  @media (width < ${AboutHeaderBreakpoint}) {
    display: none;
  }
`

const StyledBox = styled(Box)`
  justify-content: left;

  @media (width < ${AboutHeaderBreakpoint}) {
    justify-content: center;
  }
`

function AboutHeader() {
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
        <StyledBox
          forwardedAs='ul'
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
        </StyledBox>
        <StyledLogo id='zooniverse-logo-about-page' color='white' />
      </Box>
    </header>
  )
}

export default AboutHeader
