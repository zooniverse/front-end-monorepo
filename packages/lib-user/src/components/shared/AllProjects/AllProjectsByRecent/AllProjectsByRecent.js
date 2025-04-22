import { useMemo, useState } from 'react'
import { arrayOf, bool, number, shape, string } from 'prop-types'

import { usePanoptesProjects, useProjectPreferences } from '@hooks'
import Projects from '../Projects/Projects.js'

export const PAGE_SIZE = 49

function AllProjectsByRecent({
  containerError,
  containerLoading = false,
  projectContributions = [],
  user
}) {
  const [page, setPage] = useState(1)

  // fetch first page of /project_preferences
  const {
    data: projectPreferences,
    error: preferencesError,
    loading: preferencesLoading
  } = useProjectPreferences({
    page,
    pageSize: PAGE_SIZE,
    projectContributions,
    userID: user?.id
  })

  const numProjects = projectPreferences?.numProjects

  // fetch project data from panoptes for the cards
  const projectsQuery = {
    cards: true,
    id: projectPreferences?.recentProjectIds?.join(','),
    page_size: PAGE_SIZE
  }

  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects(projectsQuery)

  // Match project data and ERAS count by project id to each project preference to keep the sort order
  let renderedProjects = []
  if (projects?.length) {
    projectPreferences?.recentProjectIds.map(recentProjectID => {
      const matchedProjectObj = projects?.find(
        project => project.id === recentProjectID
      )

      if (matchedProjectObj) {
        const erasStat = projectContributions?.find(
          stat => stat.project_id.toString() === matchedProjectObj.id
        )
        renderedProjects.push({
          ...matchedProjectObj,
          count: erasStat?.count // this will be blank if user did not make classifications on the project
        })
      }
    })
  }

  const loading = containerLoading || projectsLoading || preferencesLoading
  const error = containerError || projectsError || preferencesError

  return (
    <>
      <Projects
        error={error}
        loading={loading}
        numProjects={numProjects}
        page={page}
        pageSize={PAGE_SIZE}
        renderedProjects={renderedProjects}
        setPage={setPage}
      />
    </>
  )
}

AllProjectsByRecent.propTypes = {
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
  ),
  user: shape({
    id: string
  })
}

export default AllProjectsByRecent
