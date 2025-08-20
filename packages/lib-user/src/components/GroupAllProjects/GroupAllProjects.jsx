import { arrayOf, bool, shape, string } from 'prop-types'
import { useTranslation } from '@translations/i18n'
import { Heading } from 'grommet'
import SpacedText from '@zooniverse/react-components/SpacedText'

import { useStats } from '@hooks'
import {
  AllProjectsByCount,
  ContentBox,
  HeaderLink,
  Layout
} from '@components/shared'

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
      <ContentBox pad='50px'>
        <Heading level='1'>
          <SpacedText
            color={{ dark: 'accent-1', light: 'neutral-1' }}
            size='large'
            weight='bold'
          >
            {t('AllProjects.title', { displayName: group?.display_name })}
          </SpacedText>
        </Heading>
        <AllProjectsByCount
          containerError={statsError}
          containerLoading={statsLoading}
          projectContributions={projectContributions}
        />
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
