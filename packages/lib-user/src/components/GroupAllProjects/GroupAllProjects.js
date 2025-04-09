import { arrayOf, bool, shape, string } from 'prop-types'
import { useTranslation } from '../../translations/i18n.js'

import { usePanoptesProjects, useStats } from '@hooks'
import { AllProjects, ContentBox, HeaderLink, Layout } from '@components/shared'

const STATS_ENDPOINT = '/classifications/user_groups'

// props are passed from GroupContainer via cloneElement
function GroupAllProjects({ authUser, group }) {
  const { t } = useTranslation()

  // fetch all projects stats; date range is all time
  const {
    data: allProjectsStats,
    error: statsError,
    isLoading: statsLoading
  } = useStats({
    authUserId: authUser?.id,
    endpoint: STATS_ENDPOINT,
    sourceId: group?.id
  })

  // fetch project data from panoptes
  const projectIds = allProjectsStats?.project_contributions?.map(
    project => project.project_id
  )
  const projectsQuery = {
    cards: true,
    id: projectIds?.join(','),
    page_size: 100
  }
  const {
    data: projects,
    error: projectsError,
    isLoading: projectsLoading
  } = usePanoptesProjects(projectsQuery)

  // order by top projects
  let topProjects = []
  const topProjectContributions = allProjectsStats?.project_contributions?.sort(
    (a, b) => b.count - a.count
  )

  if (topProjectContributions?.length > 0) {
    topProjects = topProjectContributions
      ?.map(projectContribution => {
        const projectData = projects?.find(
          project => project.id === projectContribution.project_id.toString()
        )
        return {
          count: projectContribution.count,
          ...projectData
        }
      })
      .filter(project => project?.id)
  }

  const error = statsError || projectsError
  const loading = statsLoading || projectsLoading

  return (
    <Layout
      primaryHeaderItem={
        <HeaderLink
          href={`/groups/${group.id}`}
          label={t('common.back')}
          primaryItem={true}
        />
      }
    >
      <ContentBox title='All Projects' pad='45px'>
        <AllProjects error={error} loading={loading} projects={topProjects} />
      </ContentBox>
    </Layout>
  )
}

GroupAllProjects.propTypes = {
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

export default GroupAllProjects
