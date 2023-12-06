import { Box } from 'grommet'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import PageLayout from '../../shared/components/PageLayout/layout.js'
import DropdownNav from '../../shared/components/DropdownNav/DropdownNav.js'
import Head from '../../shared/components/Head'
import Sidebar from '../../shared/components/Sidebar/Sidebar.js'
import MaxWidthContent from '../../shared/components/MaxWidthContent/MaxWidthContent.js'
import {
  HeadingForNav,
  mobileBreakpoint,
  MobileHeading,
  StyledGrid,
  StyledHeading
} from '../../shared/components/SharedStyledComponents/SharedStyledComponents.js'

const StyledSidebar = styled(Sidebar)`
  @media (width <= ${mobileBreakpoint}) {
    display: none;
  }
`

const StyledDropdownNav = styled(DropdownNav)`
  @media (width > ${mobileBreakpoint}) {
    display: none;
  }
`

function HeadingForAboutNav({ sectionName }) {
  return (
    <HeadingForNav
      id={sectionName}
      color={{ light: 'brand', dark: 'white' }}
      level={2}
      size='1.5rem'
      tabIndex={-1}
      textAlign='center'
    >
      {sectionName}
    </HeadingForNav>
  )
}

function AboutPage() {
  const { t } = useTranslation('components')

  const sections = [
    { name: t('About.OurMission'), slug: '' },
    { name: t('About.HowItWorks'), slug: 'how-it-works' },
    { name: t('About.mobile'), slug: 'mobile' },
    { name: t('About.highlights'), slug: 'hightlights' },
    { name: t('About.contact'), slug: 'contact' }
  ]

  return (
    <>
      <Head description={t('About.description')} title={t('About.title')} />
      <PageLayout>
        <MobileHeading level='1' size='1.5rem'>
          {t('About.title')}
        </MobileHeading>
        <StyledDropdownNav
          sidebarLabel={t('About.sidebarLabel')}
          sections={sections}
        />
        <MaxWidthContent>
          <StyledHeading color='brand' level='1' size='small'>
            {t('About.title')}
          </StyledHeading>
        </MaxWidthContent>
        <StyledGrid>
          <Box as='aside' align='center'>
            <StyledSidebar
              ariaLabel={t('About.sideBarLabel')}
              sections={sections}
            />
          </Box>
          <article>
            {/** Our Mission */}
            <HeadingForAboutNav sectionName={sections[0].name} />
            {/** How It Works */}
            <HeadingForAboutNav sectionName={sections[1].name} />
            {/** Mobile App */}
            <HeadingForAboutNav sectionName={sections[2].name} />
            {/** Highlights */}
            <HeadingForAboutNav sectionName={sections[3].name} />
            {/** Contact Us */}
            <HeadingForAboutNav sectionName={sections[4].name} />
          </article>
        </StyledGrid>
      </PageLayout>
    </>
  )
}

export default AboutPage
