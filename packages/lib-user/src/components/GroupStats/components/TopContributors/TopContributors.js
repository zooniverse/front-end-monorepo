import { Grid } from 'grommet'
import { arrayOf, number, shape, string } from 'prop-types'

import {
  ContentBox
} from '@components/shared'

import MemberCard from '../MemberCard'

function TopContributors({
  stats,
  topContributors
}) {
  const topContributorsWithStats = topContributors?.map(user => {
    const userStats = stats?.top_contributors?.find(topUser => topUser.user_id.toString() === user.id)
    
    return {
      classifications: userStats?.count,
      ...user
    }
  })

  return (
    <ContentBox
      title='Top Contributors'
    >
      <Grid
        columns={[ 'auto', 'auto' ]}
        gap='small'
        rows={['repeat(5, auto)']}
        style={{ gridAutoFlow: 'column' }}
      >
        {topContributorsWithStats?.length ? (
          topContributorsWithStats.map((user) => (
            <MemberCard
              key={`MemberCard-${user?.id}`}
              avatar={user?.avatar_src}
              classifications={user?.classifications}
              displayName={user?.display_name}
              login={user?.login}
            />
          ))
        ) : null}
      </Grid>
    </ContentBox>
  )
}

TopContributors.propTypes = {
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
