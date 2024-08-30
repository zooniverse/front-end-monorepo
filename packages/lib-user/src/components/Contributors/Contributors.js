import { Loader, SpacedText } from '@zooniverse/react-components'
import { Box, Layer } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useState } from 'react'

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
  const [exportLoading, setExportLoading] = useState(false)
  const [page, setPage] = useState(1)

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

  const loadingExportMessage = 'Generating stats export...'

  async function handleGenerateExport() {
    setExportLoading(true)

    const allUsersQuery = {
      id: memberIdsPerStats?.join(','),
      page_size: 100
    }

    const allUsers = await fetchPanoptesUsers(allUsersQuery)

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

    setExportLoading(false)
  }

  function handlePageChange({ page }) {
    setPage(page)
  }

  const error = statsError || usersError || projectsError
  const loading = statsLoading || usersLoading || projectsLoading
  const disableStatsExport = !showContributors || !!error || loading || !contributors?.length

  return (
    <>
      {exportLoading ? (
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
            </Box>
          </Layer>
        ) : null
      }
      <Layout
        primaryHeaderItem={
          <HeaderLink
            href={`/groups/${group.id}`}
            label='back'
            primaryItem={true}
          />
        }
      >
        <ContentBox
          linkLabel='Export all stats'
          linkProps={{
            as: 'button',
            disabled: disableStatsExport,
            onClick: handleGenerateExport
          }}
          title='Full Group Stats'
        >
          {!showContributors ? (
            <Box align='center' justify='center' fill pad='medium'>
              <SpacedText uppercase={false}>
                You do not have permission to view this group&apos;s contributors.
              </SpacedText>
            </Box>
          ) : loading ? (
            <Box align='center' justify='center' fill pad='medium'>
              <Loader />
            </Box>
          ) : error ? (
            <Box align='center' justify='center' fill pad='medium'>
              <SpacedText uppercase={false}>
                There was an error.
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
                There are no contributors to this group.
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
