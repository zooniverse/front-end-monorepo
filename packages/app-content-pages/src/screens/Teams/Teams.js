import { useEffect, useState } from 'react'
import { Box, Grid, Heading } from 'grommet'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

import Team from './components/Team'
import Head from '../../shared/components/Head'
import PageLayout from '../../shared/components/PageLayout/layout.js'
import Sidebar from '../../shared/components/Sidebar/Sidebar.js'

const isBrowser = typeof window !== 'undefined' // to handle testing environment

const Relative = styled.aside`
  position: relative;
`

const StickySidebar = styled(Sidebar)`
  position: sticky;
  top: 0;
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
      <Head description={t('Team.description')} title={t('Team.title')} />
      <PageLayout>
        <Grid columns={['25%', 'flex']}>
          <Box />
          <Heading margin={{ top: 'none' }} size='small'>
            {t('Team.title')}
          </Heading>
        </Grid>
        <Grid columns={['25%', 'flex']}>
          <Relative>
            <StickySidebar
              activeSection={activeSection}
              ariaLabel={t('Team.sideBarLabel')}
              sections={sectionsPlusAll}
              setActiveSection={setActiveSection}
            />
          </Relative>
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
        </Grid>
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
