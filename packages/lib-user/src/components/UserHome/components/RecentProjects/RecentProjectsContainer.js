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
  const user = await auth.checkCurrent()
  const token = await auth.checkBearerToken()
  const authorization = `Bearer ${token}`
  try {
    const query = {
      sort: '-updated_at',
      user_id: user.id
    }
    const response = await panoptes.get('/project_preferences', query, { authorization })
    if (response.ok) {
      const projectPreferencesUserHasClassified =
        response.body.project_preferences
          .filter(preference => preference.activity_count > 0)
      return projectPreferencesUserHasClassified
    }
    return []
  } catch (error) {
    console.error(error)
    throw error
  }
}

function RecentProjectsContainer({ authUser }) {
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
  } = usePanoptesProjects({
    cards: true,
    id: recentProjectIds?.join(',')
  })
  
  // Attach project object to each project preference
  let projectPreferencesWithProjectObj
  if (projects?.length) {
    projectPreferencesWithProjectObj = projectPreferences
      .map(preference => {
        const matchedProjectObj = projects.find(
          project => project.id === preference.links?.project
        )

        if (matchedProjectObj) {
          preference.project = matchedProjectObj
        }
        return preference
      })
      .filter(preference => preference?.project?.slug)
      .slice(0, 10)
  }

  return (
    <RecentProjects
      isLoading={preferencesLoading || projectsLoading}
      projectPreferences={projectPreferencesWithProjectObj}
      error={preferencesError || projectsError}
    />
  )
}

RecentProjectsContainer.propTypes = {
  authUser: shape({
    id: string
  })
}

export default RecentProjectsContainer
