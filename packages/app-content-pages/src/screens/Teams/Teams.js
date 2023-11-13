import { useEffect, useState } from 'react'
import { Box, Grid, Heading } from 'grommet'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'

import DropdownNav from '../../shared/components/DropdownNav/DropdownNav.js'
import Head from '../../shared/components/Head'
import MaxWidthContent from '../../shared/components/MaxWidthContent/MaxWidthContent.js'
import PageLayout from '../../shared/components/PageLayout/layout.js'
import Sidebar from '../../shared/components/Sidebar/Sidebar.js'
import Team from './components/Team'

const isBrowser = typeof window !== 'undefined' // to handle testing environment
const mobileBreakpoint = '72rem'

const StyledGrid = styled(Grid)`
  grid-template-columns: 1fr minmax(auto, 45rem) 1fr;
  width: 100%;
  padding: 0 30px;

  @media (width <= ${mobileBreakpoint}) {
    padding: 0 20px;
  }
`

const StyledHeading = styled(Heading)`
  position: relative;
  padding: 30px 0;
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

function TeamComponent({ teamData = [], sections = [] }) {
  const { t } = useTranslation('components')
  const [activeSection, setActiveSection] = useState('')

  useEffect(function onMount() {
    const slug = isBrowser ? window.location.hash.slice(1) : ''
    setActiveSection(slug)
  }, [])

  const sectionsPlusAll = [{ name: t('Sidebar.all'), slug: '' }, ...sections]

  return (
    <>
      <Head description={t('Teams.description')} title={t('Teams.title')} />
      <PageLayout>
      <MobileHeading
          level='1'
          color='white'
          margin='0'
          size='1.5rem'
        >
          {t('Teams.title')}
        </MobileHeading>
        <StickyBox
          background={{ dark: 'dark-3', light: 'neutral-6' }}
          margin={{ bottom: '20px' }}
        >
          <DropdownNav
            activeSection={activeSection}
            sidebarLabel={t('Teams.sidebarLabel')}
            sections={sectionsPlusAll}
            setActiveSection={setActiveSection}
          />
        </StickyBox>
        <MaxWidthContent>
          <StyledHeading color='brand' size='small' textAlign='center'>
            {t('Teams.title')}
          </StyledHeading>
        </MaxWidthContent>
        <StyledGrid>
          <Box as='aside' align='center'>
            <StickySidebar
              activeSection={activeSection}
              ariaLabel={t('Teams.sideBarLabel')}
              sections={sectionsPlusAll}
              setActiveSection={setActiveSection}
            />
          </Box>
          <article>
            {teamData?.map(team => (
              <Team
                key={team.name}
                name={team.name}
                people={team.people}
                slug={team.slug}
              />
            ))}
          </article>
          <Box />
        </StyledGrid>
      </PageLayout>
    </>
  )
}

TeamComponent.propTypes = {
  teamData: arrayOf(
    shape({
      name: string,
      people: array,
      slug: string,
      weight: number
    })
  ),
  sections: arrayOf(
    shape({
      active: bool,
      selectTeam: func,
      name: string
    })
  )
}

export default TeamComponent
