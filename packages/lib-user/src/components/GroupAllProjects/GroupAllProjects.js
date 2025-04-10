import { arrayOf, bool, shape, string } from 'prop-types'
import { useTranslation } from '../../translations/i18n.js'

import { useStats } from '@hooks'
import { AllProjects, ContentBox, HeaderLink, Layout } from '@components/shared'

const STATS_ENDPOINT = '/classifications/user_groups'

// props are passed from GroupContainer via cloneElement
function GroupAllProjects({ authUser, group }) {
  const { t } = useTranslation()

  // fetch all projects contributions from ERAS; Date range is "All Time"
  const {
    data: allProjectsStats,
    error: statsError,
    isLoading: statsLoading
  } = useStats({
    authUserId: authUser?.id,
    endpoint: STATS_ENDPOINT,
    sourceId: group?.id
  })

  // order by most contributions --> least contributions
  const projectContributions = allProjectsStats?.project_contributions?.sort(
    (a, b) => b.count - a.count
  )

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
      <ContentBox title={t('AllProjects.title')} pad='45px'>
        <AllProjects error={statsError} loading={statsLoading} projectContributions={projectContributions} />
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
