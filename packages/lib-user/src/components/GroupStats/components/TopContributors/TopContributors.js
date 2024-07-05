import { Grid, ResponsiveContext } from 'grommet'
import { arrayOf, number, shape, string } from 'prop-types'
import { useContext } from 'react'

import {
  ContentBox,
  Tip
} from '@components/shared'

import MemberCard from '../MemberCard'

function TopContributors({
  groupId,
  stats,
  topContributors
}) {
  const size = useContext(ResponsiveContext)
  const gridAutoFlow = size === 'small' ? 'row' : 'column'

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
      toolTip={
        <Tip
          contentText='Includes active and inactive members.'
          buttonProps={{
            margin: { left: 'xsmall' }
          }}
        />
      }
    >
      <Grid
        as='ol'
        columns={size === 'small' ? ['1fr'] : [ '1fr', '1fr' ]}
        gap='small'
        pad='none'
        rows={['repeat(5, auto)']}
        style={{
          gridAutoFlow,
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
