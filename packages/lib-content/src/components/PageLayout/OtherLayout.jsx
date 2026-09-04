import { Box, ThemeContext } from 'grommet'
import styled, { css } from 'styled-components'

import { ZooniverseLogotype } from '@zooniverse/react-components'
import ContainerBox from './ContainerBox'

// The DecorativePseudoHeader isn't an actual `<header>` because it has no
// actual content or navigation elements. See Github:
// https://github.com/zooniverse/front-end-monorepo/pull/7514#discussion_r3630704741
const DecorativePseudoHeader = styled(Box)`
  min-height: 2em;
`
const StyledLogo = styled(ZooniverseLogotype)`
  margin-top: 1em;
  margin-bottom: 1em;
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

  return (
    <>
      <DecorativePseudoHeader
        direction='row'
        background='neutral-1'
        justify='end'
        pad={{ horizontal: '20px' }}
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

export default OtherLayout
