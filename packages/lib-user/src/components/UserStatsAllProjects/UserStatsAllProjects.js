'use client'

import { bool, shape, string } from 'prop-types'

import { usePanoptesUser, useStats } from '@hooks'
import { AllProjects, ContentBox, HeaderLink, Layout } from '@components/shared'
import { getDateInterval, getStatsDateString } from '@utils'
import { useTranslation } from '../../translations/i18n.js'

const STATS_ENDPOINT = '/classifications/users'

function UserStatsAllProjects({ authUser, login }) {
  const { t } = useTranslation()

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
      <ContentBox title={t('AllProjects.title')} pad='45px'>
        <AllProjects
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
