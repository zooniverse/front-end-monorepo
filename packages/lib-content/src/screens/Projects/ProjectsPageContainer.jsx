'use client'

import { SWRConfig } from 'swr'

import ContainerBox from '@components/PageLayout/ContainerBox'
import FeaturedProjects from './components/FeaturedProjects'
import Organizations from './components/Organizations'
import Projects from './components/Projects'

/**
    Pass the server-side data as fallback data for useProjects() SWR hook.
    useProjects() has a dynamic key based on query params from Projects.jsx and nuqs.
    Note that fallbackData is returned as `data` from the hook even if useProject's SWR key
    is set to default query params on mount and the /projects page.js searchParams have been
    modified from the defaults. This is ok.
*/
export default function ProjectsPageContainer({
  featuredProjects,
  numProjects,
  organizations,
  projects
}) {
  const fallbackData = { numProjects, projects }

  return (
    <>
      <FeaturedProjects featuredProjects={featuredProjects} />
      <ContainerBox
        align='center'
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        width='min(100%, 90rem)'
      >
        <SWRConfig value={{ fallbackData: fallbackData }}>
          <Projects />
        </SWRConfig>
        <Organizations organizations={organizations} />
      </ContainerBox>
    </>
  )
}
