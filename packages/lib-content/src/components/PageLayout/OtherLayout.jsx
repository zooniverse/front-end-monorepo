import { Box, ThemeContext } from 'grommet'
import { useTranslation } from '@translations/i18n'
import { css } from 'styled-components'

import ContainerBox from './ContainerBox'
import AboutHeader from '../AboutHeader/AboutHeader'

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
  const { t } = useTranslation()

  const navTitle = t('AboutHeader.title.other')

  const links = []

  return (
    <>
      <AboutHeader links={links} navTitle={navTitle} />
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
