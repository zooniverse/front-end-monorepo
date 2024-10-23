import { Anchor, Box, ResponsiveContext, Text } from 'grommet'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import { useContext } from 'react'
import { Loader, ProjectCard, SpacedText } from '@zooniverse/react-components'

import { ContentBox } from '@components/shared'

export default function RecentProjects({
  isLoading = false,
  recentProjects = [],
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
      ) : !recentProjects.length ? (
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
          {recentProjects.map(project => (
            <li key={project.id}>
              <ProjectCard
                badge={project.count}
                description={project?.description}
                displayName={project?.display_name}
                href={`https://www.zooniverse.org/projects/${project?.slug}`}
                imageSrc={project?.avatar_src}
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
  recentProjects: arrayOf(
    shape({
      avatar_src: string,
      count: number,
      description: string,
      display_name: string,
      id: string,
      slug: string
    })
  )
}
