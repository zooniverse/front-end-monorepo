import { Anchor, Box, Text, ThemeContext } from 'grommet'
import { FormPrevious as BackLinkIcon } from 'grommet-icons'
import styled, { css } from 'styled-components'
import Link from 'next/link'

import { ZooniverseLogotype } from '@zooniverse/react-components'
import ContainerBox from './ContainerBox'

const HeaderBreakpoint = '36rem'

const StyledLogo = styled(ZooniverseLogotype)`
  margin-top: 1em;
  margin-bottom: 1em;

  @media (width < ${HeaderBreakpoint}) {
    display: none;
  }
`

const StyledBox = styled(Box)`
  justify-content: left;

  @media (width < ${HeaderBreakpoint}) {
    justify-content: center;
  }
`

const StyledAnchor = styled(Anchor)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;

  border-bottom: 2px solid transparent;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    border-bottom-color: white;
  }
`


const customTheme = {
  paragraph: {
    extend: props => {
      return css`
        color: ${props.theme.dark ? 'white' : 'black'};
      `
    }
  }
}

function SettingsLayout({ children }) {
  // Note: the the Decorative Pseudo-Header looks visually similar to the
  // AboutLayout's AboutHeader (used on About pages), except the DPH isn't a
  // <header> element and has no <nav> elements. It's purely decorative.

  // TODO: add to en.json
  const navTitle = 'Settings'
  const backLinkLabel = 'Back Home'
  const backLinkUrl = '/'

  return (
    <>
      <header
        // This header is a variant of <AboutHeader> with one unique nav link.
        // If AboutHeader is changed, this should be too.
      >
        <Box
          align='center'
          aria-label={navTitle}
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
          >
            <Box as='li' pad={{ right: 'small' }}>
              <StyledAnchor as={Link} href={backLinkUrl}>
                <BackLinkIcon color='white' />
                <Text color='white'>{backLinkLabel}</Text>
              </StyledAnchor>
            </Box>
          </StyledBox>
          <StyledLogo id='zooniverse-logo-settings-page' color='white' />
        </Box>
      </header>
      <main>
        <ThemeContext.Extend value={customTheme}>
          <Box
            background={{
              dark: 'dark-1',
              light: 'light-1'
            }}
            align='center'
          >
            <ContainerBox
              align='center'
              background={{ dark: 'dark-3', light: 'neutral-6' }}
              width='min(100%, 90rem)'
              height={{ min: '80vh' }}
              pad={{ horizontal: '20px', top: '60px', bottom: '60px' }}
            >
              {children}
            </ContainerBox>
          </Box>
        </ThemeContext.Extend>
      </main>
    </>
  )
}

export default SettingsLayout
