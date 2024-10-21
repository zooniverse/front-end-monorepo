import { Anchor, Box, ResponsiveContext, Text } from 'grommet'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import { useContext } from 'react'
import { Loader, ProjectCard, SpacedText } from '@zooniverse/react-components'

import { ContentBox } from '@components/shared'

export default function RecentProjects({
  isLoading = false,
  recentProjectsStats = [],
  error = undefined
}) {
  const size = useContext(ResponsiveContext)
  return (
    <ContentBox title='Continue Classifying' screenSize={size}>
      {isLoading ? (
        <Box fill justify='center' align='center'>
          <Loader />
        </Box>
      ) : error ? (
        <Box fill justify='center' align='center' pad='medium'>
          <SpacedText>
            There was an error fetching your recent projects
          </SpacedText>
        </Box>
      ) : !recentProjectsStats.length ? (
        <Box fill justify='center' align='center' pad='medium'>
          <SpacedText>No Recent Projects found</SpacedText>
          <Text>
            Start by{' '}
            <Anchor href='https://www.zooniverse.org/projects'>
              classifying any project
            </Anchor>
            .
          </Text>
        </Box>
      ) : (
        <Box
          as='ul'
          direction='row'
          gap='small'
          pad={{ horizontal: 'xxsmall', bottom: 'xsmall', top: 'xxsmall' }}
          overflow={{ horizontal: 'auto' }}
          style={{ listStyle: 'none' }}
          margin='0'
        >
          {recentProjectsStats.map(stat => (
            <li key={stat.project_id}>
              <ProjectCard
                badge={stat.count}
                description={stat.projectInfo?.description}
                displayName={stat.projectInfo?.display_name}
                href={`https://www.zooniverse.org/projects/${stat.projectInfo?.slug}`}
                imageSrc={stat.projectInfo?.avatar_src}
                size={size}
              />
            </li>
          ))}
        </Box>
      )}
    </ContentBox>
  )
}

RecentProjects.propTypes = {
  isLoading: bool,
  recentProjectsStats: arrayOf(
    shape({
      count: number,
      project_id: number,
      projectInfo: shape({
        avatar_src: string,
        description: string,
        display_name: string,
        id: string,
        slug: string
      })
    })
  )
}
