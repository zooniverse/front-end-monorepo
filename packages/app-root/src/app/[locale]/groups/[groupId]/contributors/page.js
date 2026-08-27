import GroupContributorsContainer from './GroupContributorsContainer'

export const metadata = {
  title: 'Group Contributors',
  description: 'Zooniverse group contributors page'
}

export default async function GroupContributors(props) {
  const params = await props.params
  const searchParams = await props.searchParams

  return (
    <GroupContributorsContainer
      groupId={params.groupId}
      joinToken={searchParams.join_token}
    />
  )
}
