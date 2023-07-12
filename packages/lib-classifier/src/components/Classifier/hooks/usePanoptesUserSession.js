import {
  usePanoptesUser,
  useProjectPreferences,
  useProjectRoles
} from '@hooks'

export default function usePanoptesUserSession({ authClient, projectID }) {
  const { data: user, isLoading: userLoading } = usePanoptesUser(authClient)
  const userID = !userLoading && user?.id
  const { data: upp, isLoading: uppLoading } = useProjectPreferences({ authClient, projectID, userID })
  const { data: projectRoles, isLoading: rolesLoading } = useProjectRoles({ authClient, projectID, userID })
  const userHasLoaded = userID ?
    // logged-in user is loaded once we have user, preferences and roles.
    !!userID && !!upp && !!projectRoles :
    // anonymous user's are always falsy but ready once all API checks have resolved.
    !userLoading && !uppLoading && !rolesLoading

  return { user, upp, projectRoles, userHasLoaded }
}