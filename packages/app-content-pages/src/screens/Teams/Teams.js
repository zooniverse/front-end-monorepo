import { useEffect, useState } from 'react'
import { Box, Grid, Heading } from 'grommet'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

import Content from '../../shared/components/Content/Content.js'
import DropdownNav from '../../shared/components/DropdownNav/DropdownNav.js'
import Head from '../../shared/components/Head'
import PageLayout from '../../shared/components/PageLayout/layout.js'
import Sidebar from '../../shared/components/Sidebar/Sidebar.js'
import Team from './components/Team'

const isBrowser = typeof window !== 'undefined' // to handle testing environment

const StyledGrid = styled(Grid)`
  grid-template-columns: 1fr minmax(auto, 45rem) 1fr;
  width: 100%;
`

const StickySidebar = styled(Sidebar)`
  position: sticky;
  top: 0;

  @media (width < 75rem) {
    display: none;
  }
`

const StickyBox = styled(Box)`
  position: sticky;
  top: 0;
  width: 100%;

  @media (width > 75rem) {
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
        <Content>
          <Heading margin={{ top: 'none' }} size='small'>
            {t('Teams.title')}
          </Heading>
        </Content>
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
