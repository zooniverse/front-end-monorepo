import { Box } from 'grommet'
import { useTranslation } from '../../translations/i18n.js'

import ContainerBox from './ContainerBox.js'
import AboutHeader from '../AboutHeader'

function AboutLayout({ children }) {
  const { t } = useTranslation()

  const navTitle = t('AboutHeader.title.about')

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
    <>
      <AboutHeader links={links} navTitle={navTitle} />
      <main>
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
      </main>
    </>
  )
}

export default AboutLayout
