'use client'

import { useState } from 'react'
import { Anchor, Box, Paragraph } from 'grommet'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'
import DropdownNav from '@components/DropdownNav/DropdownNav'
import MaxWidthContent from '@components/MaxWidthContent/MaxWidthContent'
import AboutLayout from '@components/PageLayout/AboutLayout'
import {
  mobileBreakpoint,
  MobileHeading,
  StickyBox,
  StickySidebar,
  StyledGrid,
  StyledHeading
} from '@components/SharedStyledComponents/SharedStyledComponents'
import Discipline from './components/Discipline/Discipline'

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdbAKVT2tGs1WfBqWNrMekFE5lL4ZuMnWlwJuCuNM33QO2ZYg/viewform'

const StyledSection = styled.section`
  // Brings this section forward in z-index order so that the next navigable
  // heading's margin doesn't overlap and render the paragraph link useless
  position: relative;

  @media (width <= ${mobileBreakpoint}) {
    padding: 0 20px;
  }
`

function Publications({ publicationsData = [], sections = [] }) {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState(0)

  return (
    <>
      <AboutLayout>
        <MobileHeading level='1' size='1.5rem'>
          {t('Publications.title')}
        </MobileHeading>
        <StickyBox background={{ dark: 'dark-3', light: 'neutral-6' }}>
          <DropdownNav
            activeSection={activeSection}
            sidebarLabel={t('Publications.sidebarLabel')}
            sections={sections}
            setActiveSection={setActiveSection}
          />
        </StickyBox>
        <MaxWidthContent>
          <StyledSection>
            <StyledHeading level='1' color={{ light: 'neutral-1', dark: 'accent-1' }} size='small'>
              {t('Publications.title')}
            </StyledHeading>
            <Paragraph textAlign='center' margin={{ top: '30px' }}>
              {t('Publications.formInstruction')}{' '}
              <Anchor href={FORM_URL}>{t('Publications.formLabel')}</Anchor>.{' '}
              {t('Publications.formInfo')}
            </Paragraph>
          </StyledSection>
        </MaxWidthContent>
        <StyledGrid>
          <Box as='aside' align='center'>
            <StickySidebar
              activeSection={activeSection}
              ariaLabel={t('Publications.sidebarLabel')}
              sections={sections}
              setActiveSection={setActiveSection}
            />
          </Box>
          <article>
            {publicationsData?.map((item, index) => (
              <Discipline
                key={item.title}
                projects={item.projects}
                sectionIndex={index}
                setActiveSection={setActiveSection}
                slug={item.slug}
                title={item.title}
              />
            ))}
          </article>
          <Box />
        </StyledGrid>
      </AboutLayout>
    </>
  )
}

Publications.propTypes = {
  publicationsData: arrayOf(
    shape({
      projects: array,
      slug: string,
      title: string,
      weight: number
    })
  ),
  sections: arrayOf(
    shape({
      active: bool,
      setActive: func,
      title: string
    })
  )
}

export default Publications
