import { Loader, SpacedText } from '@zooniverse/react-components'
import { Box, Grid, ResponsiveContext } from 'grommet'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import { useContext } from 'react'
import { useTranslation } from '../../../../translations/i18n.js'

import {
  ContentBox,
  Tip
} from '@components/shared'

import MemberCard from '../MemberCard'

function TopContributors({
  error,
  groupId,
  loading,
  stats,
  topContributors
}) {
  const { t } = useTranslation()
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
      linkLabel={t('GroupStats.TopContributors.linkLabel')}
      linkProps={{
        href: `/groups/${groupId}/contributors`
      }}
      title={t('GroupStats.TopContributors.title')}
      toolTip={
        <Tip
          contentText={t('GroupStats.TopContributors.tip')}
          buttonProps={{
            margin: { left: 'xsmall' }
          }}
        />
      }
    >
      {loading ? (
        <Box
          align='center'
          fill
          justify='center'
          pad='medium'
        >
          <Loader />
        </Box>
      ) : error ? (
        <Box
          align='center'
          fill
          justify='center'
          pad='medium'
        >
          <SpacedText uppercase={false}>
            {t('GroupStats.TopContributors.error')}
          </SpacedText>
          <SpacedText uppercase={false}>
            {error?.message}
          </SpacedText>
        </Box>
      ) : (
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
      )}
    </ContentBox>
  )
}

TopContributors.propTypes = {
  groupId: string,
  loading: bool,
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
