'use client'

import { Box, Heading } from 'grommet'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import AboutLayout from '@components/PageLayout/AboutLayout'
import DropdownNav from '@components/DropdownNav/DropdownNav'
import HeadingForAboutNav from '@components/HeadingForAboutNav/HeadingForAboutNav'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import {
  mobileBreakpoint,
  MobileHeading,
  StickyBox,
  StickySidebar,
  StyledGrid
} from '@components/SharedStyledComponents/SharedStyledComponents'

const StyledAIEthicsHeading = styled(Heading)`
  position: relative;
  padding: 44px 0;
  margin: 0;
  text-align: center;

  @media (width <= ${mobileBreakpoint}) {
    display: none;
  }
`

function AboutPage() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState(0)

  const sidebarSections = [
    { name: t('AIEthics.heading.first'), slug: 'preamble' },
    { name: t('AIEthics.heading.second'), slug: 'table-of-contents' },
    { name: t('AIEthics.heading.third'), slug: 'key-principle' },
    { name: t('AIEthics.heading.fourth'), slug: 'internal-actions' },
    { name: t('AIEthics.heading.fifth'), slug: 'project-recommendations' },
    { name: t('AIEthics.heading.sixth'), slug: '5-ws' },
    { name: t('AIEthics.heading.seventh'), slug: 'ai-ml-on-zooniverse' },
    { name: t('AIEthics.heading.eighth'), slug: 'resources' },
    { name: t('AIEthics.heading.nineth'), slug: 'faq' },
    { name: t('AIEthics.heading.tenth'), slug: 'about-this-framework' }
  ]

  return (
    <AboutLayout>
      <MobileHeading level='1' size='1.5rem'>
        {t('AIEthics.title')}
      </MobileHeading>
      <StickyBox background={{ dark: 'dark-3', light: 'neutral-6' }}>
        <DropdownNav
          activeSection={activeSection}
          sidebarLabel={t('AIEthics.sidebarLabel')}
          sections={sidebarSections}
          setActiveSection={setActiveSection}
        />
      </StickyBox>
      <MaxWidthContent>
        <StyledAboutHeading color={{ light: 'neutral-1', dark: 'accent-1' }} level='1' size='small'>
          {t('AIEthics.title')}
        </StyledAboutHeading>
      </MaxWidthContent>

      <StyledGrid>
        <Box as='aside' align='center'>
          <StickySidebar
            activeSection={activeSection}
            ariaLabel={t('AIEthics.sidebarLabel')}
            sections={sidebarSections}
            setActiveSection={setActiveSection}
          />
        </Box>

        <article>
          {/* Preamble */}
          <HeadingForAboutNav
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            pad={{ top: '40px', bottom: '10px' }}
            sectionIndex={0}
            sectionName={t('AIEthics.heading.first')}
            setActiveSection={setActiveSection}
            slug={sidebarSections[0].slug}
          />

          {/* Clickable Table of Contents */}
          <HeadingForAboutNav
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            pad={{ top: '40px', bottom: '10px' }}
            sectionIndex={1}
            sectionName={t('AIEthics.heading.second')}
            setActiveSection={setActiveSection}
            slug={sidebarSections[1].slug}
          />

          {/* Key Principles */}
          <HeadingForAboutNav
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            pad={{ top: '40px', bottom: '10px' }}
            sectionIndex={2}
            sectionName={t('AIEthics.heading.third')}
            setActiveSection={setActiveSection}
            slug={sidebarSections[2].slug}
          />

          {/* Internal Actions Taken by Zooniverse */}
          <HeadingForAboutNav
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            pad={{ top: '40px', bottom: '10px' }}
            sectionIndex={3}
            sectionName={t('AIEthics.heading.fourthext')}
            setActiveSection={setActiveSection}
            slug={sidebarSections[3].slug}
          />

          {/* Recommendations for Project Teams */}
          <HeadingForAboutNav
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            pad={{ top: '40px', bottom: '10px' }}
            sectionIndex={4}
            sectionName={t('AIEthics.heading.fifthext')}
            setActiveSection={setActiveSection}
            slug={sidebarSections[4].slug}
          />

          {/* The 5 Ws of AI/ML-Engaged Projects */}
          <HeadingForAboutNav
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            pad={{ top: '40px', bottom: '10px' }}
            sectionIndex={5}
            sectionName={t('AIEthics.heading.sixth')}
            setActiveSection={setActiveSection}
            slug={sidebarSections[5].slug}
          />

          {/* AI and Machine Learning on Zooniverse */}
          <HeadingForAboutNav
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            pad={{ top: '40px', bottom: '10px' }}
            sectionIndex={6}
            sectionName={t('AIEthics.heading.seventh')}
            setActiveSection={setActiveSection}
            slug={sidebarSections[6].slug}
          />

          {/* Resources */}
          <HeadingForAboutNav
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            pad={{ top: '40px', bottom: '10px' }}
            sectionIndex={7}
            sectionName={t('AIEthics.heading.eighth')}
            setActiveSection={setActiveSection}
            slug={sidebarSections[7].slug}
          />

          {/* Frequently Asked Questions */}
          <HeadingForAboutNav
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            pad={{ top: '40px', bottom: '10px' }}
            sectionIndex={8}
            sectionName={t('AIEthics.heading.ninth')}
            setActiveSection={setActiveSection}
            slug={sidebarSections[8].slug}
          />

          {/* About this Framework */}
          <HeadingForAboutNav
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            pad={{ top: '40px', bottom: '10px' }}
            sectionIndex={9}
            sectionName={t('AIEthics.heading.tenth')}
            setActiveSection={setActiveSection}
            slug={sidebarSections[9].slug}
          />
        </article>
      </StyledGrid>
    </AboutLayout>
  )
}
