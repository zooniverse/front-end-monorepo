import { Box } from 'grommet'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import Script from 'next/script'
import { useState } from 'react'

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
import Contact from './components/Contact.js'
import OurMission from './components/OurMission.js'

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

function HeadingForAboutNav({ sectionName, slug }) {
  return (
    <HeadingForNav
      id={slug}
      color={{ light: 'brand', dark: 'white' }}
      level={2}
      size='1.5rem'
      tabIndex={-1}
      textAlign='center'
      style={{ padding: '30px 0 10px 0' }}
    >
      {sectionName}
    </HeadingForNav>
  )
}

function AboutPage() {
  const { t } = useTranslation('components')
  const [widgetLoaded, setWidgetLoaded] = useState(false)

  const sidebarSections = [
    { name: t('AboutPage.ourMission.heading'), slug: '' },
    { name: t('AboutPage.howItWorks.heading'), slug: 'how-it-works' },
    { name: t('AboutPage.mobile.sidebar'), slug: 'mobile' },
    { name: t('AboutPage.highlights.sidebar'), slug: 'highlights' },
    { name: t('AboutPage.contact.heading'), slug: 'contact' }
  ]

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
        window.fwSettings={
          'widget_id':44000004375,
          'locale': 'en'
        };
        !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()
      `
        }}
      />
      {/** Init the Freshdesk Widget, but hide it until volunteer clicks Contact section button */}
      <Script
        src='https://widget.freshworks.com/widgets/44000004375.js'
        async
        defer
        onLoad={() => {
          window.FreshworksWidget('hide', 'launcher')
          setWidgetLoaded(true)
        }}
      />

      <Head
        description={t('AboutPage.description')}
        title={t('AboutPage.title')}
      />
      <PageLayout>
        <MobileHeading level='1' size='1.5rem'>
          {t('AboutPage.title')}
        </MobileHeading>
        <StyledDropdownNav
          sidebarLabel={t('AboutPage.sidebarLabel')}
          sections={sidebarSections}
        />
        <MaxWidthContent>
          <StyledHeading
            color={{ light: 'brand', dark: 'accent-1' }}
            level='1'
            size='small'
          >
            {t('AboutPage.title')}
          </StyledHeading>
        </MaxWidthContent>

        {/** Our Mission */}
        <StyledGrid>
          <Box as='aside' align='center'>
            <StyledSidebar
              ariaLabel={t('AboutPage.sideBarLabel')}
              sections={sidebarSections}
            />
          </Box>
          <article>
            <Box>
              <HeadingForAboutNav
                sectionName={t('AboutPage.ourMission.heading')}
                slug={sidebarSections[0].slug}
              />
              <OurMission />
            </Box>
          </article>
        </StyledGrid>

        {/** How It Works */}
        <Box>
          <HeadingForAboutNav
            sectionName={t('AboutPage.howItWorks.heading')}
            slug={sidebarSections[1].slug}
          />
        </Box>

        {/** Mobile App */}
        <MaxWidthContent>
          <HeadingForAboutNav
            sectionName={t('AboutPage.mobile.heading')}
            slug={sidebarSections[2].slug}
          />
        </MaxWidthContent>

        {/** Highlights */}
        <MaxWidthContent>
          <HeadingForAboutNav
            sectionName={t('AboutPage.highlights.heading')}
            slug={sidebarSections[3].slug}
          />
        </MaxWidthContent>

        {/** Contact Us */}
        <MaxWidthContent>
          <HeadingForAboutNav
            sectionName={t('AboutPage.contact.heading')}
            slug={sidebarSections[4].slug}
          />
          <Contact widgetLoaded={widgetLoaded} />
        </MaxWidthContent>
      </PageLayout>
    </>
  )
}

export default AboutPage
