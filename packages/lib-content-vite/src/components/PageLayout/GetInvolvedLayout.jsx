import { Box, ThemeContext } from 'grommet'
import { useTranslation } from '../../translations/i18n.jsx'
import { css } from 'styled-components'

import ContainerBox from './ContainerBox.jsx'
import AboutHeader from '../AboutHeader'

const customTheme = {
  paragraph: {
    extend: props => {
      return css`
        color: ${props.theme.dark ? 'white' : 'black'};
      `
    }
  }
}

function GetInvolvedLayout({ children }) {
  const { t } = useTranslation()

  const navTitle = t('AboutHeader.title.getInvolved')

  const links = [
    {
      href: '/get-involved/volunteer',
      label: t('AboutHeader.links.volunteer')
    },
    {
      href: '/get-involved/educate',
      label: t('AboutHeader.links.educate')
    },
    {
      href: '/get-involved/collaborate',
      label: t('AboutHeader.links.collaborate')
    },
    {
      href: '/get-involved/donate',
      label: t('AboutHeader.links.donate')
    }
  ]

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

export default GetInvolvedLayout
