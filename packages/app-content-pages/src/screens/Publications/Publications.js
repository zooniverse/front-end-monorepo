import { useEffect, useState } from 'react'
import { Anchor, Box, Grid, Heading, Paragraph } from 'grommet'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next'
import styled, { css } from 'styled-components'

import Category from './components/Category/Category.js'
import DropdownNav from '../../shared/components/DropdownNav/DropdownNav.js'
import Head from '../../shared/components/Head'
import MaxWidthContent from '../../shared/components/MaxWidthContent/MaxWidthContent.js'
import PageLayout from '../../shared/components/PageLayout/layout.js'
import Sidebar from '../../shared/components/Sidebar/Sidebar.js'

const isBrowser = typeof window !== 'undefined' // to handle testing environment
const mobileBreakpoint = '72rem'

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdbAKVT2tGs1WfBqWNrMekFE5lL4ZuMnWlwJuCuNM33QO2ZYg/viewform'

const StyledGrid = styled(Grid)`
  grid-template-columns: 1fr minmax(auto, 45rem) 1fr;
  width: 100%;
  padding: 0 30px;

  @media (width <= ${mobileBreakpoint}) {
    padding: 0 20px;
  }
`

const StyledSection = styled.section`
  padding: 30px 30px 0 30px;

  @media (width <= ${mobileBreakpoint}) {
    padding: 0 20px;
  }
`

const StyledHeading = styled(Heading)`
  position: relative;
  padding-bottom: 30px;
  margin: 0 0 20px 0;

  @media (width <= ${mobileBreakpoint}) {
    display: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, #ffffff 0%, #a6a7a9 50%, #ffffff 100%);
    height: 2px;
    width: 100%;
  }
`

const StickySidebar = styled(Sidebar)`
  max-height: 100vh;
  overflow: auto;
  position: sticky;
  top: 0;

  @media (width <= ${mobileBreakpoint}) {
    display: none;
  }
`

const StickyBox = styled(Box)`
  position: sticky;
  top: 0;
  width: 100%;

  @media (width > ${mobileBreakpoint}) {
    display: none;
  }
`

const MobileHeading = styled(Heading)`
  width: 100%;
  padding: 0 0 20px 0;
  display: flex;
  justify-content: center;
  ${props =>
    css`
      background: ${props.theme.global.colors.brand};
    `}

  @media (width > ${mobileBreakpoint}) {
    display: none;
  }
`

function Publications({ publicationsData = [], sections = [] }) {
  const { t } = useTranslation('components')
  const [activeSection, setActiveSection] = useState('')

  useEffect(function onMount() {
    const slug = isBrowser ? window.location.hash.slice(1) : ''
    setActiveSection(slug)
  }, [])

  const sectionsPlusAll = [{ name: t('Sidebar.all'), slug: '' }, ...sections]

  return (
    <>
      <Head
        description={t('Publications.description')}
        title={t('Publications.title')}
      />
      <PageLayout>
        <MobileHeading
          level='1'
          color='white'
          margin='0'
          size='1.5rem'
        >
          {t('Publications.title')}
        </MobileHeading>
        <StickyBox
          background={{ dark: 'dark-3', light: 'neutral-6' }}
          margin={{ bottom: '20px' }}
        >
          <DropdownNav
            activeSection={activeSection}
            sidebarLabel={t('Publications.sidebarLabel')}
            sections={sectionsPlusAll}
            setActiveSection={setActiveSection}
          />
        </StickyBox>
        <MaxWidthContent>
          <StyledSection>
            <StyledHeading
              level='1'
              color='brand'
              size='small'
              textAlign='center'
            >
              {t('Publications.title')}
            </StyledHeading>
            <Paragraph textAlign='center' margin={{ top: '0' }}>
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
            {publicationsData?.map(category => (
              <Category
                key={category.title}
                projects={category.projects}
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
