'use client'

import { SWRConfig } from 'swr'
import styled from 'styled-components'

import ContainerBox from '@components/PageLayout/ContainerBox'
import FeaturedProjects from './components/FeaturedProjects'
import Organizations from './components/Organizations'
import Projects from './components/Projects/Projects'

const StyledContainerBox = styled(ContainerBox)`
  padding: 30px 20px 60px;

  // Larger than grommet theme breakpoint 'small'
  @media (min-width: 48rem) {
    padding: 60px;
  }

  // When screen is wider than width of ContainerBox
  @media (min-width: 90rem) {
    padding: 60px 80px;
    border-radius: 16px;
  }
`

/**
    Pass the server-side data as fallback data for useProjects() SWR hook.
    useProjects() has a dynamic key based on query params from Projects.jsx and nuqs.
    Note that fallbackData is returned as `data` from the hook even if useProject's SWR key
    is set to default query params on mount and the /projects page.js searchParams have been
    modified from the defaults. This is ok.
*/
export default function ProjectsPageContainer({
  adminMode = false,
  featuredProjects = [],
  numProjects = 0,
  organizations = [],
  projects = []
}) {
  const fallbackData = { numProjects, projects }

  return (
    <>
      <FeaturedProjects featuredProjects={featuredProjects} />
      <StyledContainerBox
        align='center'
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        width='min(100%, 90rem)'
      >
        <SWRConfig value={{ fallbackData: fallbackData }}>
          <Projects adminMode={adminMode} />
        </SWRConfig>
        <Organizations organizations={organizations} />
      </StyledContainerBox>
    </>
  )
}
