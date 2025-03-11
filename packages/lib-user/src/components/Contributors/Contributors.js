import asyncStates from '@zooniverse/async-states'
import { Loader, SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useState } from 'react'
import { useTranslation } from '../../translations/i18n.js'

import {
  usePanoptesProjects,
  usePanoptesUsers,
  useStats
} from '@hooks'

import {
  ContentBox,
  HeaderLink,
  Layout,
  Pagination
} from '@components/shared'

import ContributorsList from './components/ContributorsList'
import ExportStats from './components/ExportStats/ExportStats'
import { handleGenerateExport } from './helpers/handleGenerateExport'

const STATS_ENDPOINT = '/classifications/user_groups'
const CONTRIBUTORS_PER_PAGE = 40

function Contributors({
  adminMode,
  authUser,
  group,
  membership
}) {
  const [exportStatus, setExportStatus] = useState(asyncStates.initialized)
  const [exportProgress, setExportProgress] = useState(0)
  const [page, setPage] = useState(1)
  
  const { t } = useTranslation()
  
  const showContributors = adminMode
    || membership?.roles.includes('group_admin')
    || (membership?.roles.includes('group_member') && group?.stats_visibility === 'private_show_agg_and_ind')
    || (membership?.roles.includes('group_member') && group?.stats_visibility === 'public_agg_show_ind_if_member')
    || group?.stats_visibility === 'public_show_all'

  // fetch stats
  const statsQuery = {
    individual_stats_breakdown: true,
  }

  const {
    data: stats,
    error: statsError,
    isLoading: statsLoading
  } = useStats({
    authUserId: authUser?.id,
    endpoint: STATS_ENDPOINT,
    sourceId: group?.id,
    query: statsQuery
  })

  // fetch users
  const memberIdsPerStats = stats?.group_member_stats_breakdown?.map(member => member.user_id.toString())
  const currentPageUserIds = memberIdsPerStats?.slice(((page - 1) * CONTRIBUTORS_PER_PAGE), (page * CONTRIBUTORS_PER_PAGE))
  const usersQuery = {
    id: currentPageUserIds?.join(','),
    page_size: CONTRIBUTORS_PER_PAGE
  }

  const {
    data: users,
    error: usersError,
    isLoading: usersLoading
  } = usePanoptesUsers(usersQuery)

  // fetch projects
  const arrayOfProjectContributionArrays = stats?.group_member_stats_breakdown?.map(member => member.project_contributions)
  const flattenedProjectContributionArray = arrayOfProjectContributionArrays?.flat()
  const projectIds = [...new Set(flattenedProjectContributionArray?.map(item => item.project_id))]

  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects({
    cards: true,
    id: projectIds?.join(','),
    page_size: 100
  })

  // combine member stats with user data
  let contributors = []
  if (stats && users && projects) {
    contributors = users?.map(user => {
      const member = stats?.group_member_stats_breakdown?.find(member => member.user_id.toString() === user.id)
      return {
        ...member,
        ...user
      }
    })
  }

  function confirmExport() {
    const approximateSize = memberIdsPerStats?.length * 1.85
    let csvSizeEstimate = ''
    if (approximateSize > 1000) {
      csvSizeEstimate = `${Math.round(approximateSize / 1000)} MB`
    } else {
      csvSizeEstimate = `${Math.round(approximateSize)} KB`
    }
    const message = `Download CSV of groups stats for ${memberIdsPerStats?.length.toLocaleString()} members? Approximately ${csvSizeEstimate}.`

    if (confirm(message)) {
      handleGenerateExport({
        group,
        memberIdsPerStats,
        projects,
        setExportProgress,
        setExportStatus,
        stats
      })
    }
  }

  function handlePageChange({ page }) {
    setPage(page)
  }

  const error = statsError || usersError || projectsError
  const loading = statsLoading || usersLoading || projectsLoading
  const disableStatsExport = !showContributors || !!error || loading || !contributors?.length

  return (
    <>
      <ExportStats 
        exportProgress={exportProgress}
        exportStatus={exportStatus}
      />
      <Layout
        primaryHeaderItem={
          <HeaderLink
            href={`/groups/${group.id}`}
            label={t('common.back')}
            primaryItem={true}
          />
        }
      >
        <ContentBox
          linkLabel={t('Contributors.exportLink')}
          linkProps={{
            as: 'button',
            disabled: disableStatsExport,
            onClick: confirmExport
          }}
          title={t('Contributors.title')}
        >
          {!showContributors ? (
            <Box align='center' justify='center' fill pad='medium'>
              <SpacedText uppercase={false}>
                {t('Contributors.noPermission')}
              </SpacedText>
            </Box>
          ) : loading ? (
            <Box align='center' justify='center' fill pad='medium'>
              <Loader />
            </Box>
          ) : error ? (
            <Box align='center' justify='center' fill pad='medium'>
              <SpacedText uppercase={false}>
                {t('Contributors.error')}
              </SpacedText>
              <SpacedText uppercase={false}>
                {error?.message}
              </SpacedText>
            </Box>
          ) : contributors?.length > 0 ? (
            <ContributorsList
              contributors={contributors}
              projects={projects}
            />
          ) : (
            <Box align='center' justify='center' fill pad='medium'>
              <SpacedText uppercase={false}>
                {t('Contributors.none')}
              </SpacedText>
            </Box>
          )}
          {memberIdsPerStats?.length > CONTRIBUTORS_PER_PAGE ? (
            <Pagination
              alignSelf='center'
              numberItems={memberIdsPerStats?.length}
              page={page}
              onChange={handlePageChange}
              step={CONTRIBUTORS_PER_PAGE}
            />
          ) : null}
        </ContentBox>
      </Layout>
    </>
  )
}

Contributors.propTypes = {
  adminMode: bool,
  authUser: shape({
    id: string
  }),
  group: shape({
    display_name: string,
    id: string
  }),
  membership: shape({
    id: string,
    roles: arrayOf(string)
  })
}

export default Contributors
