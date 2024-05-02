import GroupStatsContainer from './GroupStatsContainer'

export const metadata = {
  title: 'Group Stats',
  description: 'Zooniverse group stats page'
}

export default function GroupPage({ params }) {
  return (
    <GroupStatsContainer
      groupId={params.groupId}
    />
  )
}
