import { useEffect, useState } from 'react'
import { Box } from 'grommet'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import DropdownNav from '../../shared/components/DropdownNav/DropdownNav.js'
import Head from '../../shared/components/Head'
import MaxWidthContent from '../../shared/components/MaxWidthContent/MaxWidthContent.js'
import PageLayout from '../../shared/components/PageLayout/layout.js'
import Team from './components/Team'
import {
  MobileHeading,
  StickyBox,
  StickySidebar,
  StyledGrid,
  StyledHeading
} from '../../shared/components/SharedStyledComponents/SharedStyledComponents.js'

function TeamComponent({ teamData = [], sections = [] }) {
  const { t } = useTranslation('components')
  const [activeSection, setActiveSection] = useState('')

  useEffect(function onMount() {
    const slug = window.location.hash.slice(1)
    setActiveSection(slug)
  }, [])

  const sectionsPlusAll = [{ name: t('Sidebar.all'), slug: '' }, ...sections]

  return (
    <>
      <Head description={t('Teams.description')} title={t('Teams.title')} />
      <PageLayout>
        <MobileHeading level='1' size='1.5rem'>
          {t('Teams.title')}
        </MobileHeading>
        <StickyBox background={{ dark: 'dark-3', light: 'neutral-6' }}>
          <DropdownNav
            activeSection={activeSection}
            sidebarLabel={t('Teams.sidebarLabel')}
            sections={sectionsPlusAll}
            setActiveSection={setActiveSection}
          />
        </StickyBox>
        <MaxWidthContent>
          <StyledHeading color={{ light: 'brand', dark: 'accent-1' }} level='1' size='small'>
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
