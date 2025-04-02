import { useTranslation } from '../../translations/i18n.js'
import { arrayOf, bool, shape, string } from 'prop-types'
import { Loader, ProjectCard } from '@zooniverse/react-components'
import { Box, ResponsiveContext, Text } from 'grommet'
import { useContext } from 'react'
import styled from 'styled-components'

import { usePanoptesProjects, useStats } from '@hooks'
import { ContentBox, HeaderLink, Layout } from '@components/shared'

const STATS_ENDPOINT = '/classifications/user_groups'

const StyledBox = styled(Box)`
  list-style: none;
  margin-block-start: 0;
  padding-inline-start: 0;
`

// props are passed from GroupContainer via cloneElement
function GroupAllProjects({ adminMode, authUser, group, membership }) {
  const { t } = useTranslation()

  const size = useContext(ResponsiveContext)
  const cardSize = size

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
      <ContentBox title='All Projects'>
        {loading ? (
          <Box fill align='center' justify='center'>
            <Loader />
          </Box>
        ) : topProjects?.length === 0 ? (
          <Text>No projects found for this group</Text>
        ) : error ? (
          <Text>There was an error fetching project stats for this group</Text>
        ) : (
          <StyledBox forwardedAs='ul' direction='row' wrap gap='10px'>
            {topProjects.map(topProject => {
              return (
                <li key={topProject?.id}>
                  <ProjectCard
                    badge={topProject?.count}
                    description={topProject?.description}
                    displayName={topProject?.display_name}
                    href={`https://www.zooniverse.org/projects/${topProject?.slug}`}
                    imageSrc={topProject?.avatar_src}
                    size={cardSize}
                  />
                </li>
              )
            })}
          </StyledBox>
        )}
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
