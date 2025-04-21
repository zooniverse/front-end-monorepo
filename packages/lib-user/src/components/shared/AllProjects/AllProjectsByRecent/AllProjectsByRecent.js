import { useState } from 'react'
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

  // Number of page in Pagination is determined by the length of project_contributions
  // returned from ERAS even though we're showing this UI sorted by 'recent' as
  // determined by project_preferences
  const numProjects = projectContributions?.length

  // fetch first page of /project_preferences
  const {
    data: projectPreferences,
    error: preferencesError,
    loading: preferencesLoading
  } = useProjectPreferences({ page, pageSize: PAGE_SIZE, userID: user?.id })

  // grab the project ids in sort order from /project_preferences
  const recentProjectIds = projectPreferences?.map(
    preference => preference.links.project
  )

  // fetch project data from panoptes for the cards
  const projectsQuery = {
    cards: true,
    id: recentProjectIds?.join(','),
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
    projectPreferences
      .map(preference => {
        const matchedProjectObj = projects?.find(
          project => project.id === preference.links?.project // id string
        )

        if (matchedProjectObj) {
          const erasStat = projectContributions?.find(
            stat => stat.project_id.toString() === matchedProjectObj.id
          )
          renderedProjects.push({
            ...matchedProjectObj,
            count: erasStat.count
          })
        }
        // return null
      })
      .filter(preference => preference?.project?.slug)
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
