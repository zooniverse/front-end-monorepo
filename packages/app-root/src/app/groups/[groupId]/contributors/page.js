import GroupContributorsContainer from './GroupContributorsContainer'

export const metadata = {
  title: 'Group Contributors',
  description: 'Zooniverse group contributors page'
}

export default function GroupContributors({ params, searchParams }) {
  return (
    <GroupContributorsContainer
      groupId={params.groupId}
      joinToken={searchParams.join_token}
    />
  )
}
