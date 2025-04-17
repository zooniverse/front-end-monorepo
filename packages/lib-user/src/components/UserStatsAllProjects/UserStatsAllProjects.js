'use client'

import { bool, shape, string } from 'prop-types'
import { useContext } from 'react'
import { Heading, ResponsiveContext } from 'grommet'
import SpacedText from '@zooniverse/react-components/SpacedText'

import { usePanoptesUser, useStats } from '@hooks'
import { AllProjectsByCount, ContentBox, HeaderLink, Layout } from '@components/shared'
import { getDateInterval, getStatsDateString } from '@utils'
import { useTranslation } from '../../translations/i18n.js'

const STATS_ENDPOINT = '/classifications/users'

function UserStatsAllProjects({ authUser, login }) {
  const { t } = useTranslation()
  const grommetSize = useContext(ResponsiveContext)

  // fetch user
  const {
    data: user,
    error: userError,
    isLoading: userLoading
  } = usePanoptesUser({
    authUser,
    login,
    requiredUserProperty: 'created_at'
  })

  // fetch this users's projects stats with "All Time" interval (same as StatsTab in DefaultHome)
  const allTimeQuery = getDateInterval({
    endDate: getStatsDateString(new Date()),
    startDate: getStatsDateString(user?.created_at)
  })

  allTimeQuery.project_contributions = true

  const {
    data,
    error: statsError,
    isLoading: statsLoading
  } = useStats({
    endpoint: STATS_ENDPOINT,
    sourceId: user?.id,
    query: allTimeQuery
  })

  // order by most contributions --> least contributions
  const projectContributions = data?.project_contributions?.sort(
    (a, b) => b.count - a.count
  )

  function getPadding() {
    switch (size) {
      case 'small':
        return ''
    }
  }

  const containerLoading = statsLoading || userLoading
  const containerError = statsError || userError

  return (
    <Layout
      primaryHeaderItem={
        <HeaderLink
          href={`/users/${login}/stats`}
          label={t('common.back')}
          primaryItem={true}
        />
      }
    >
      <ContentBox pad={grommetSize}>
        <Heading level='1'>
          {user?.display_name && (
            <SpacedText
              color={{ dark: 'accent-1', light: 'neutral-1' }}
              size='large'
              weight='bold'
            >
              {t('AllProjects.title', { displayName: user?.display_name })}
            </SpacedText>
          )}
        </Heading>
        <AllProjectsByCount
          containerError={containerError}
          containerLoading={containerLoading}
          projectContributions={projectContributions}
        />
      </ContentBox>
    </Layout>
  )
}

UserStatsAllProjects.propTypes = {
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  login: string
}

export default UserStatsAllProjects
