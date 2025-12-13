import { ProjectCard } from '@zooniverse/react-components'
import { CheckBox, Pagination, ResponsiveContext } from 'grommet'
import { useContext, useState } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'

import StyledCardsContainer from './StyledCardsContainer'
import useProjects from '../hooks/useProjects'

export default function Projects({ adminMode = false }) {
  const size = useContext(ResponsiveContext)

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [sort, setSort] = useQueryState('sort', {
    defaultValue: '-launch_date'
  })
  const [state, setProjectState] = useQueryState('state', {
    defaultValue: 'live'
  })

  /*
    Note: A signed-in admin is not required by panoptes to fetch projects where launch_approved=false or undefined,
    but this component checks if adminMode is turned on in localStorage, and provides the option to return ALL projects regardless of launch approval.
  */
  const [launchApproved, setLaunchApproved] = useState(true)

  const query = {
    launch_approved: launchApproved ? true : undefined,
    page: page,
    page_size: size === 'small' ? 10 : 20,
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
      {!!adminMode ? (
        <CheckBox
          checked={!launchApproved}
          onChange={() => setLaunchApproved(!launchApproved)}
          label='(Admin) Include not-launch-approved projects in results?'
        />
      ) : null}
      {numProjects > 20 ? (
        <Pagination
          alignSelf='center'
          page={page}
          numberItems={numProjects}
          onChange={({ page }) => setPage(page)}
          step={size === 'small' ? 10 : 20}
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
