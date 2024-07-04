import UserStatsContainer from './UserStatsContainer'

export const metadata = {
  title: 'User Stats',
  description: 'My Zooniverse user stats page'
}

export default function UserStatsPage({ params, searchParams }) {
  return (
    <UserStatsContainer
      login={params.login}
      projectId={searchParams.project_id}
    />
  )
}
