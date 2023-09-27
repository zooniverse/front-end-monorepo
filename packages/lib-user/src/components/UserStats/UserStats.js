import { string } from 'prop-types'

import {
  usePanoptesUser
} from '@hooks'

function UserStats ({
  authClient,
  login = ''
}) {
  const { data: user, error, isLoading: userLoading } = usePanoptesUser(authClient)

  return (
    <div>
      <h2>Hello User with login {login}! 👋</h2>
      <h3>Your display_name is {user?.display_name}</h3>
    </div>
  )
}

UserStats.propTypes = {
  // authClient: object.isRequired,
  login: string
}

export default UserStats
