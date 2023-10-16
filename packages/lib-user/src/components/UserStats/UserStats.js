'use client'

import { string } from 'prop-types'

import {
  usePanoptesUser,
  useUserStats
} from '@hooks/index.js'

function UserStats ({
  authClient,
  login = ''
}) {
  const { data: user, error, isLoading: userLoading } = usePanoptesUser(authClient)
  const userID = userLoading ? undefined : (user?.id || null)
  const { data: userStats, error: userStatsError, isLoading: userStatsLoading } = useUserStats({ authClient, userID })

  return (
    <div>
      <h2>Hello User with login {login}! 👋</h2>
      <h3>Your display_name is {user?.display_name}, ID is {user?.id}</h3>
      <h4>Here are your user stats:</h4>
      <pre>{JSON.stringify(userStats, null, 2)}</pre>
    </div>
  )
}

UserStats.propTypes = {
  // authClient: object.isRequired,
  login: string
}

export default UserStats
