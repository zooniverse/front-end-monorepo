import { Box, ThemeContext } from 'grommet'
import { useTranslation } from '@translations/i18n'
import styled, { css } from 'styled-components'

import { ZooniverseLogotype } from '@zooniverse/react-components'
import ContainerBox from './ContainerBox'

const HeaderBreakpoint = '36rem'
const DecorativePseudoHeader = styled(Box)`
  min-height: 2em;
`
const StyledLogo = styled(ZooniverseLogotype)`
  margin-top: 1em;
  margin-bottom: 1em;

  @media (width < ${HeaderBreakpoint}) {
    display: none;
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

function OtherLayout({ children }) {
  // Note: the the Decorative Pseudo-Header looks visually similar to the
  // AboutLayout's AboutHeader (used on About pages), except the DPH isn't a
  // <header> element and has no <nav> elements. It's purely decorative.
  // The Zooniverse logo disappears in narrow views, but a strip of teal remains
  // visible on the page.

  return (
    <>
      <DecorativePseudoHeader
        direction='row'
        background='neutral-1'
        justify='end'
        pad={{ horizontal: 'medium' }}
      >
        <StyledLogo id='zooniverse-logo-other-page' color='white' />
      </DecorativePseudoHeader>
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
            >
              {children}
            </ContainerBox>
          </Box>
        </ThemeContext.Extend>
      </main>
    </>
  )
}

export default OtherLayout
