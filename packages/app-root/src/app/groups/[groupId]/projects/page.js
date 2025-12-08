import GroupAllProjectsContainer from './GroupAllProjectsContainer.js'

export const metadata = {
  title: 'Group All Projects',
  description: 'Zooniverse group all projects page'
}

export default async function GroupAllProjectsPage(props) {
  const params = await props.params
  const searchParams = await props.searchParams

  return (
    <GroupAllProjectsContainer
      groupId={params.groupId}
      joinToken={searchParams.join_token}
    />
  )
}
