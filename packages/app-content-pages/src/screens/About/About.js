import { Box } from 'grommet'
import { useTranslation } from 'next-i18next'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

import PageLayout from '@shared/components/PageLayout/layout.js'
import DropdownNav from '@shared/components/DropdownNav/DropdownNav.js'
import Head from '@shared/components/Head'
import MaxWidthContent from '@shared/components/MaxWidthContent/MaxWidthContent.js'
import {
  HeadingForNav,
  MobileHeading,
  StickyBox,
  StickySidebar,
  StyledGrid,
  StyledHeading
} from '../../shared/components/SharedStyledComponents/SharedStyledComponents.js'
import Contact from './components/Contact.js'
import Highlights from './components/Highlights.js'
import HowItWorks from './components/HowItWorks.js'
import Mobile from './components/Mobile.js'
import OurMission from './components/OurMission.js'

export function HeadingForAboutNav({
  color,
  sectionIndex,
  sectionName,
  setActiveSection,
  slug
}) {
  const headingRef = useRef()

  /**
   * Observe the headings of each navigable section
   * When a heading is fully visible in the upper-half of a viewport,
   * highlight the sidebar and update the url hash.
   */
  useEffect(() => {
    const options = {
      root: null, // use the viewport as the root element
      rootMargin: '0px 0px -50% 0px', // observe visibility in the top half of the viewport
      threshold: 1 // callback when target is fully visible
    }

    const intersectionObserver = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setActiveSection(sectionIndex)
      }
    }, options)

    intersectionObserver.observe(headingRef.current)

    return () => {
      intersectionObserver.disconnect()
    }
  }, [headingRef.current])

  return (
    <div ref={headingRef}>
      <HeadingForNav
        id={slug}
        color={color}
        level={2}
        size='1.5rem'
        tabIndex={-1}
        textAlign='center'
        style={{ padding: '30px 0 10px 0' }}
      >
        {sectionName}
      </HeadingForNav>
    </div>
  )
}

function AboutPage() {
  const { t } = useTranslation('components')
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  const sidebarSections = [
    { index: 0, name: t('AboutPage.ourMission.heading'), slug: '' },
    { index: 1, name: t('AboutPage.howItWorks.heading'), slug: 'how-it-works' },
    { index: 2, name: t('AboutPage.mobile.sidebar'), slug: 'mobile' },
    { index: 3, name: t('AboutPage.highlights.sidebar'), slug: 'highlights' },
    { index: 4, name: t('AboutPage.contact.heading'), slug: 'contact' }
  ]

  return (
    <>
      <Script
        id='freshdesk-widget-init'
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
        id='freshdesk-widget-src'
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
        <StickyBox background={{ dark: 'dark-3', light: 'neutral-6' }}>
          <DropdownNav
            activeSection={activeSection}
            sidebarLabel={t('AboutPage.sidebarLabel')}
            sections={sidebarSections}
            setActiveSection={setActiveSection}
          />
        </StickyBox>
        <MaxWidthContent>
          <StyledHeading
            color={{ light: 'brand', dark: 'accent-1' }}
            level='1'
            size='small'
          >
            {t('AboutPage.title')}
          </StyledHeading>
        </MaxWidthContent>

        <StyledGrid>
          <Box as='aside' align='center'>
            <StickySidebar
              activeSection={activeSection}
              ariaLabel={t('AboutPage.sideBarLabel')}
              sections={sidebarSections}
              setActiveSection={setActiveSection}
            />
          </Box>
          <article>
            {/** Our Mission */}
            <HeadingForAboutNav
              color={{ light: 'brand', dark: 'white' }}
              sectionIndex={0}
              sectionName={t('AboutPage.ourMission.heading')}
              setActiveSection={setActiveSection}
              slug={sidebarSections[0].slug}
            />
            <OurMission />

            {/** How It Works */}
            <HowItWorks setActiveSection={setActiveSection} />

            {/** Mobile App */}
            <MaxWidthContent pad={{ horizontal: 'medium' }}>
              <HeadingForAboutNav
                color={{ light: 'brand', dark: 'white' }}
                sectionIndex={2}
                sectionName={t('AboutPage.mobile.heading')}
                setActiveSection={setActiveSection}
                slug={sidebarSections[2].slug}
              />
              <Mobile />
            </MaxWidthContent>

            {/** Highlights */}
            <MaxWidthContent pad={{ horizontal: 'medium' }}>
              <HeadingForAboutNav
                color={{ light: 'brand', dark: 'white' }}
                sectionIndex={3}
                sectionName={t('AboutPage.highlights.heading')}
                setActiveSection={setActiveSection}
                slug={sidebarSections[3].slug}
              />
              <Highlights />
            </MaxWidthContent>

            {/** Contact Us */}
            <MaxWidthContent>
              <HeadingForAboutNav
                color={{ light: 'brand', dark: 'white' }}
                sectionIndex={4}
                sectionName={t('AboutPage.contact.heading')}
                setActiveSection={setActiveSection}
                slug={sidebarSections[4].slug}
              />
              <Contact widgetLoaded={widgetLoaded} />
            </MaxWidthContent>
          </article>
          <Box />
        </StyledGrid>
      </PageLayout>
    </>
  )
}

export default AboutPage
