import { Grid } from 'grommet'
import { arrayOf, number, shape, string } from 'prop-types'

import {
  ContentBox
} from '@components/shared'

import MemberCard from '../MemberCard'

function TopContributors({
  groupId,
  stats,
  topContributors
}) {
  const topContributorsWithStats = topContributors?.map(user => {
    const userStats = stats?.top_contributors?.find(topUser => topUser.user_id.toString() === user.id)
    
    return {
      classifications: userStats?.count,
      ...user
    }
  }).sort((a, b) => b.classifications - a.classifications)

  return (
    <ContentBox
      linkLabel='See all contributors and detailed stats'
      linkProps={{
        href: `/groups/${groupId}/contributors`
      }}
      title='Top Contributors'
    >
      <Grid
        as='ol'
        columns={[ 'auto', 'auto' ]}
        gap='small'
        pad='none'
        rows={['repeat(5, auto)']}
        style={{
          gridAutoFlow: 'column',
          listStyle: 'none'
        }}
      >
        {topContributorsWithStats?.length ? (
          topContributorsWithStats.map((user) => (
            <li key={`MemberCard-${user?.id}`}>
              <MemberCard
                avatar={user?.avatar_src}
                classifications={user?.classifications}
                displayName={user?.display_name}
                login={user?.login}
              />
            </li>
          ))
        ) : null}
      </Grid>
    </ContentBox>
  )
}

TopContributors.propTypes = {
  groupId: string,
  stats: shape({
    top_contributors: arrayOf(shape({
      count: number,
      user_id: number
    }))
  }),
  topContributors: arrayOf(shape({
    avatar_src: string,
    display_name: string,
    id: string,
    login: string
  }))
}

export default TopContributors
