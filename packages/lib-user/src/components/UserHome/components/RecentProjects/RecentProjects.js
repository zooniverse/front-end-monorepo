import { Anchor, Box, ResponsiveContext, Text } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useContext } from 'react'
import { Loader, ProjectCard, SpacedText } from '@zooniverse/react-components'

import { ContentBox } from '@components/shared'

export default function RecentProjects({
  isLoading = false,
  projectPreferences = [],
  error = undefined
}) {
  const size = useContext(ResponsiveContext)

  return (
    <ContentBox title='Recent Projects' screenSize={size}>
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
      ) : !projectPreferences?.length ? (
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
      ) : projectPreferences?.length ? (
        <Box
          as='ul'
          direction='row'
          gap='small'
          pad={{ horizontal: 'xxsmall', bottom: 'xsmall', top: 'xxsmall' }}
          overflow={{ horizontal: 'auto' }}
          style={{ listStyle: 'none' }}
          margin='0'
        >
          {projectPreferences.map(preference => (
            <li key={preference?.project?.id}>
              <ProjectCard
                badge={preference?.activity_count}
                description={preference?.project?.description}
                displayName={preference?.project?.display_name}
                href={`https://www.zooniverse.org/projects/${preference?.project?.slug}`}
                imageSrc={preference?.project?.avatar_src}
                size={size}
              />
            </li>
          ))}
        </Box>
      ) : null}
    </ContentBox>
  )
}

RecentProjects.propTypes = {
  isLoading: bool,
  projectPreferences: arrayOf(
    shape({
      id: string
    })
  )
}
