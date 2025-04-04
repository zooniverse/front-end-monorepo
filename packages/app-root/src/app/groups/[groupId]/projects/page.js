import GroupAllProjectsContainer from './GroupAllProjectsContainer.js'

export const metadata = {
  title: 'Group All Projects',
  description: 'Zooniverse group all projects page'
}

export default function GroupAllProjectsPage({ params, searchParams }) {
  return (
    <GroupAllProjectsContainer
      groupId={params.groupId}
      joinToken={searchParams.join_token}
    />
  )
}
