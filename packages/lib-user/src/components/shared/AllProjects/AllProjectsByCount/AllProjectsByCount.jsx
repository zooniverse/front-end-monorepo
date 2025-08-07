import { useState } from 'react'
import { arrayOf, bool, number, shape, string } from 'prop-types'

import { usePanoptesProjects } from '@hooks'
import Projects from '../Projects/Projects'

export const PAGE_SIZE = 49 // 7 cards in each row

function AllProjectsByCount({
  containerError,
  containerLoading = false,
  projectContributions = []
}) {
  const [page, setPage] = useState(1)

  // grab the project ids. They are in order of descending classification count
  const projectIds = projectContributions?.map(project => project.project_id)

  const numProjects = projectIds?.length
  const numPages = Math.ceil(numProjects / PAGE_SIZE)
  const startSlice = (page - 1) * PAGE_SIZE
  const endSlice = page < numPages ? page * PAGE_SIZE : numProjects

  // fetch project data from panoptes
  const projectsQuery = {
    cards: true,
    id: projectIds?.slice(startSlice, endSlice).join(','),
    page_size: PAGE_SIZE
  }

  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects(projectsQuery)

  // Match project data from panoptes to the stat from ERAS
  const renderedProjects = projectContributions
    ?.map(projectContribution => {
      const projectData = projects
        ?.find(
          project => project.id === projectContribution.project_id.toString()
        )
      return {
        count: projectContribution.count, // for the badge in ProjectCard
        ...projectData
      }
    })
    .filter(project => project?.id) // in case a project is not returned from panoptes

  const loading = containerLoading || projectsLoading
  const error = containerError || projectsError

  return (
    <Projects
      error={error}
      loading={loading}
      numProjects={numProjects}
      page={page}
      pageSize={PAGE_SIZE}
      renderedProjects={renderedProjects}
      setPage={setPage}
    />
  )
}

AllProjectsByCount.propTypes = {
  containerError: shape({
    message: string,
    status: number
  }),
  containerLoading: bool,
  projectContributions: arrayOf(
    shape({
      count: number,
      project_id: number
    })
  )
}

export default AllProjectsByCount
