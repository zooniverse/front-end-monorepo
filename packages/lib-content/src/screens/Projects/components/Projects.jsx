import { ProjectCard } from '@zooniverse/react-components'
import { Pagination, ResponsiveContext } from 'grommet'
import { useContext } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import StyledCardsContainer from './StyledCardsContainer'
import useProjects from '../hooks/useProjects'

export default function Projects() {
  const size = useContext(ResponsiveContext)

  // Could try clearOnDefault: false from nuqs if we always want default searchParams in the url
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [sort, setSort] = useQueryState('sort', {
    defaultValue: '-launch_date'
  })
  const [state, setProjectState] = useQueryState('state', {
    defaultValue: 'live'
  })

  function handlePageChange({ page }) {
    setPage(page)
  }

  const query = {
    page: page,
    sort: sort,
    state: state
    // eventually add "search" and "languages" too
  }

  /**
    data receives a fallback from SSR in ProjectsPageContainer.
    Otherwise, this hook will rerun anytime query changes as a result of useQueryState updates.
  */
  const { data, error, isLoading, isValidating } = useProjects(query)

  const { numProjects, projects } = data || {}

  return (
    <>
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
    </>
  )
}
