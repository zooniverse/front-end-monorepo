import { shape, string } from 'prop-types'

import { usePanoptesProjects, useProjectPreferences } from '@hooks'
import RecentProjects from './RecentProjects'

function RecentProjectsContainer({ authUser }) {
  // fetch one page of ten /project_preferences
  const {
    data: projectPreferences,
    error: preferencesError,
    loading: preferencesLoading
  } = useProjectPreferences({
    page: 1,
    pageSize: 10,
    userID: authUser?.id
  })

  // Get more info about each project and attach it to correct projectPreference object
  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError
  } = usePanoptesProjects({
    cards: true,
    id: projectPreferences?.recentProjectIds?.join(','),
  })

  // Match project data and ERAS count by project id to each project preference to keep the sort order
  let renderedProjects = []
  if (projects?.length) {
    projectPreferences?.recentProjectIds.map(recentProjectID => {
      const matchedProjectObj = projects?.find(
        project => project.id === recentProjectID
      )

      if (matchedProjectObj) {
        renderedProjects.push(matchedProjectObj)
      }
    })
  }

  return (
    <RecentProjects
      authUser={authUser}
      error={preferencesError || projectsError}
      isLoading={preferencesLoading || projectsLoading}
      renderedProjects={renderedProjects}
    />
  )
}

RecentProjectsContainer.propTypes = {
  authUser: shape({
    id: string
  })
}

export default RecentProjectsContainer
