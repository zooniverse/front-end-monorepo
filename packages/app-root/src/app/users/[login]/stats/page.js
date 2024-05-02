import UserStatsContainer from './UserStatsContainer'

export const metadata = {
  title: 'User Stats',
  description: 'My Zooniverse user stats page'
}

export default function UserStatsPage({ params }) {
  return (
    <UserStatsContainer
      login={params.login}
    />
  )
}
