import { Anchor, Box, ResponsiveContext, Text } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useContext } from 'react'
import { Loader, SpacedText } from '@zooniverse/react-components'

import { ContentBox } from '@components/shared'
import SubjectCard from '../SubjectCard/SubjectCard.js'

function RecentSubjects({
  isLoading = false,
  recents = [],
  error = undefined
}) {
  const size = useContext(ResponsiveContext)

  return (
    <ContentBox title='Recent Classifications' screenSize={size}>
      {isLoading && (
        <Box fill justify='center' align='center'>
          <Loader />
        </Box>
      )}
      {!isLoading && error && (
        <Box fill justify='center' align='center' pad='medium'>
          <SpacedText>
            There was an error fetching recent classifications
          </SpacedText>
        </Box>
      )}
      {!isLoading && !recents?.length && !error && (
        <Box fill justify='center' align='center' pad='medium'>
          <SpacedText>No Recent Classifications found</SpacedText>
          <Text>
            Start by{' '}
            <Anchor href='https://www.zooniverse.org/projects'>
              classifying any project
            </Anchor>{' '}
            to show your recent classifications here.
          </Text>
        </Box>
      )}
      {!isLoading && recents?.length
        ? (
          <Box
            as='ul'
            direction='row'
            gap='small'
            pad={{ horizontal: 'xxsmall', bottom: 'xsmall', top: 'xxsmall' }}
            overflow={{ horizontal: 'auto' }}
            style={{ listStyle: 'none' }}
            margin='0'
          >
            {recents.map(recent => {
              const subjectMedia = recent?.locations?.map(
                location => Object.values(location)[0]
              )
              return (
                <li key={recent?.id}>
                  <SubjectCard
                    size={size}
                    subjectID={recent?.links.subject}
                    mediaSrc={subjectMedia?.[0]}
                    projectSlug={recent?.project_slug}
                  />
                </li>
              )
            })}
          </Box>
        ) : null}
    </ContentBox>
  )
}

export default RecentSubjects

RecentSubjects.propTypes = {
  isLoading: bool,
  recents: arrayOf(
    shape({
      id: string,
      slug: string
    })
  )
}
