'use client'

import { ProjectCard } from '@zooniverse/react-components'
import { Pagination, ResponsiveContext } from 'grommet'
import { useContext } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import ContainerBox from '@components/PageLayout/ContainerBox'
import FeaturedProjects from './components/FeaturedProjects'
import Organizations from './components/Organizations'
import StyledCardsContainer from './components/StyledCardsContainer'

export default function ProjectsPageContainer({
  featuredProjects,
  numProjects,
  projects,
  organizations
}) {
  const size = useContext(ResponsiveContext)
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  )

  function handlePageChange({ page }) {
    setPage(page)
  }

  return (
    <>
      <FeaturedProjects featuredProjects={featuredProjects} />
      <ContainerBox
        align='center'
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        width='min(100%, 90rem)'
      >
        {numProjects > 20 ? (
          <Pagination
            alignSelf='center'
            page={page}
            numberItems={numProjects}
            onChange={handlePageChange}
            step={20}
          />
        ) : null}
        <StyledCardsContainer>
          {projects?.map(project => (
            <li key={project.id}>
              <ProjectCard
                description={project.description}
                displayName={project.display_name}
                href={`/projects/${project.slug}`}
                imageSrc={project.avatar_src}
                size={size}
                state={project.state}
              />
            </li>
          ))}
        </StyledCardsContainer>
        <Organizations organizations={organizations} />
      </ContainerBox>
    </>
  )
}
