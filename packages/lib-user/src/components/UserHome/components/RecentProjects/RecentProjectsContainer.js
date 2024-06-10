import { shape, string } from 'prop-types'
import { panoptes } from '@zooniverse/panoptes-js'
import useSWR from 'swr'
import auth from 'panoptes-client/lib/auth'

import { usePanoptesProjects } from '@hooks'
import RecentProjects from './RecentProjects.js'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

async function fetchUserProjectPreferences() {
  const user = auth.checkCurrent()
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  try {
    const query = {
      page: 1, // returns 20 items
      sort: '-updated_at',
      user_id: user.id
    }
    const response = await panoptes.get('/project_preferences', query, { authorization})
    if (response.ok) {
      const projectPreferencesUserHasClassified =
        response.body.project_preferences
          .filter(preference => preference.activity_count > 0)
          .slice(0, 10)
      return projectPreferencesUserHasClassified
    }
    return []
  } catch (error) {
    console.error(error)
    return []
  }
}

export default function RecentProjectsContainer({ authUser }) {
  // Get user's project preference.activity_count for 10 most recently classified projects
  const cacheKey = {
    name: 'user-project-preferences',
    userId: authUser.id
  }
  const {
    data: projectPreferences,
    isLoading: preferencesLoading,
    error: preferencesError
  } = useSWR(cacheKey, fetchUserProjectPreferences, SWROptions)

  // Get more info about each project and attach it to correct projectPreference object
  const recentProjectIds = projectPreferences?.map(
    preference => preference.links.project
  )
  const {
    data: projects,
    isLoading: projectsLoading,
    error: projectsError
  } = usePanoptesProjects(recentProjectIds)

  let projectPreferencesWithProjectObj

  if (projects?.length) {
    projectPreferencesWithProjectObj = projectPreferences?.map(preference => {
      const matchedProjectObj = projects.find(
        project => project.id === preference.links.project
      )

      if (matchedProjectObj) {
        preference.project = matchedProjectObj
      }
      return preference
    })
  }

  return (
    <RecentProjects
      projectPreferences={projectPreferencesWithProjectObj}
      error={preferencesError || projectsError}
      isLoading={preferencesLoading || projectsLoading}
    />
  )
}

RecentProjectsContainer.propTypes = {
  user: shape({
    id: string.isRequired
  })
}
