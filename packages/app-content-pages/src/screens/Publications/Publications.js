import { useState } from 'react'
import { Anchor, Box, Paragraph } from 'grommet'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import Category from './components/Category/Category.js'
import DropdownNav from '../../shared/components/DropdownNav/DropdownNav.js'
import Head from '../../shared/components/Head'
import MaxWidthContent from '../../shared/components/MaxWidthContent/MaxWidthContent.js'
import PageLayout from '../../shared/components/PageLayout/layout.js'

import {
  mobileBreakpoint,
  MobileHeading,
  StickyBox,
  StickySidebar,
  StyledGrid,
  StyledHeading
} from '../../shared/components/SharedStyledComponents/SharedStyledComponents.js'

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
  const { t } = useTranslation('components')
  const [activeSection, setActiveSection] = useState(0)

  const sectionsPlusAll = [{ name: t('Sidebar.all'), slug: '' }, ...sections]

  return (
    <>
      <Head
        description={t('Publications.description')}
        title={t('Publications.title')}
      />
      <PageLayout>
        <MobileHeading level='1' size='1.5rem'>
          {t('Publications.title')}
        </MobileHeading>
        <StickyBox background={{ dark: 'dark-3', light: 'neutral-6' }}>
          <DropdownNav
            activeSection={activeSection}
            sidebarLabel={t('Publications.sidebarLabel')}
            sections={sectionsPlusAll}
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
              ariaLabel={t('Publications.sideBarLabel')}
              sections={sectionsPlusAll}
              setActiveSection={setActiveSection}
            />
          </Box>
          <article>
            {publicationsData?.map((category, index) => (
              <Category
                key={category.title}
                projects={category.projects}
                sectionIndex={index + 1} // Have to account for "All" as index=0 in the Sidebar
                setActiveSection={setActiveSection}
                slug={category.slug}
                title={category.title}
              />
            ))}
          </article>
          <Box />
        </StyledGrid>
      </PageLayout>
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
