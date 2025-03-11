import asyncStates from '@zooniverse/async-states'
import { Loader, SpacedText } from '@zooniverse/react-components'
import { Box, Layer } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useState } from 'react'
import { useTranslation } from '../../translations/i18n.js'

import { fetchPanoptesUsers } from '../../utils'

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
import { generateExport } from './helpers/generateExport'

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

  const loadingExportMessage = t('Contributors.generating')

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
      handleGenerateExport()
    }
  }

  async function handleGenerateExport() {
    setExportStatus(asyncStates.loading)
    setExportProgress(0)

    let allUsers = []
    
    // maximum number of IDs per request, see GitHub issue front-end-monorepo/issues/6363
    // to keep request less then 2084 characters, with IDs ~6 characters long plus %2C2 (encoded comma), use chunk size of 200
    const CHUNK_SIZE = 200

    try {
      if (memberIdsPerStats && memberIdsPerStats.length > 0) {
        // If there are more than CHUNK_SIZE users, make multiple requests
        if (memberIdsPerStats.length > CHUNK_SIZE) {
          const userPromises = []
          const totalChunks = Math.ceil(memberIdsPerStats.length / CHUNK_SIZE)

          for (let i = 0; i < memberIdsPerStats.length; i += CHUNK_SIZE) {
            const chunk = memberIdsPerStats.slice(i, i + CHUNK_SIZE)
            const chunkQuery = {
              id: chunk.join(','),
              page_size: 100 // per panoptes, maximum page_size is 100
            }

            const wrappedPromise = fetchPanoptesUsers(chunkQuery).then(result => {
              setExportProgress(prevProgress => prevProgress + ((1 / totalChunks) * 100))
              return result
            })

            userPromises.push(wrappedPromise)
          }
          
          const userResults = await Promise.all(userPromises)
          allUsers = userResults.flat()
        } else {
          // If there are fewer users than CHUNK_SIZE, make a single request
          const allUsersQuery = {
            id: memberIdsPerStats.join(','),
            page_size: 100 // per panoptes, maximum page_size is 100
          }
          allUsers = await fetchPanoptesUsers(allUsersQuery)
          setExportProgress(100)
        }
      }

      const { filename, dataExportUrl } = await generateExport({
        group,
        projects,
        stats,
        users: allUsers
      })

      // Create an anchor element and trigger download
      const link = document.createElement('a')
      link.href = dataExportUrl
      link.setAttribute('download', filename)
      document.body.appendChild(link) // Append to the document
      link.click() // Programmatically click the link to trigger the download
      document.body.removeChild(link) // Clean up
    } catch (error) {
      console.error('Error generating export:', error)
      alert(t('Contributors.error'))
    } finally {
      setExportStatus(asyncStates.success)
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
      {exportStatus === asyncStates.loading ? (
          <Layer>
            <Box
              align='center'
              gap='small'
              height='medium'
              justify='center'
              width='medium'
            >
              <SpacedText>
                {loadingExportMessage}
              </SpacedText>
              <Loader
                loadingMessage={loadingExportMessage}
              />
              <SpacedText>
                {`Progress: ${Math.round(exportProgress)}%`}
              </SpacedText>
            </Box>
          </Layer>
        ) : null
      }
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
