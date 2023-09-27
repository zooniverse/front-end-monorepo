import { string } from 'prop-types'

function UserStats ({
  authClient,
  login = ''
}) {
  return <div>Hello User {login}! 👋</div>
}

UserStats.propTypes = {
  login: string
}

export default UserStats
