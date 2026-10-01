import { Anchor, Box, Text, ThemeContext } from 'grommet'
import { FormPrevious as BackLinkIcon } from 'grommet-icons'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

import { ZooniverseLogotype } from '@zooniverse/react-components'
import ContainerBox from './ContainerBox'
import HeaderLink from '../HeaderLinkAndButton/HeaderLink'

const HeaderBreakpoint = '36rem'

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

function FormLayout({ children }) {
  
  const { t } = useTranslation()
  const navTitle = t('Settings.common.title')
  const backLinkLabel = t('Settings.common.backHome')
  const backLinkUrl = '/'

  return (
    <>
      <header>
        <Box
          align='center'
          aria-label={navTitle}
          direction='row'
          as='nav'
          background='neutral-1'
          pad={{ horizontal: 'medium' }}
          height={{ min: '3.5rem' }}
        >
          <Box
            forwardedAs='ul'
            direction='row'
            width='100%'
            wrap
          >
            <Box as='li' pad={{ right: 'small' }}>
              <HeaderLink
                href={backLinkUrl}
                label={backLinkLabel}
                primaryItem={true}
              />
            </Box>
          </Box>
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

export default FormLayout
