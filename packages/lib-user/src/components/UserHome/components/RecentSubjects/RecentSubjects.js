import { Anchor, Box, ResponsiveContext, Text } from 'grommet'
import { arrayOf, bool, shape, string } from 'prop-types'
import { useContext } from 'react'
import { Loader, SpacedHeading, SpacedText } from '@zooniverse/react-components'

import SubjectCard from '../SubjectCard/SubjectCard.js'

function RecentSubjects({
  isLoading = false,
  recents = [],
  recentsError = undefined
}) {
  const size = useContext(ResponsiveContext)

  return (
    <Box
      pad='medium'
      height={{ min: '200px' }}
      round='small'
      border={{
        color: { light: 'light-5', dark: 'black' },
        size: 'xsmall'
      }}
    >
      <SpacedHeading size='1.125rem' level={2} margin={{ top: '0' }}>
        Recent Classifications
      </SpacedHeading>
      <Box
        as='ul'
        direction='row'
        gap='small'
        pad={{ horizontal: 'xxsmall', bottom: 'xsmall' }}
        overflow={{ horizontal: 'auto' }}
        style={{ listStyle: 'none' }}
        margin='0'
      >
        {isLoading && (
          <Box fill justify='center' align='center'>
            <Loader />
          </Box>
        )}
        {!isLoading && recentsError && (
          <Box fill justify='center' align='center' pad='medium'>
            <SpacedText>
              There was an error fetching recent classifications
            </SpacedText>
          </Box>
        )}
        {!isLoading && !recents?.length && !recentsError && (
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
          ? recents.slice(0, 10).map(classification => {
              const subjectMedia = classification.locations.map(
                location => Object.values(location)[0]
              )
              return (
                <SubjectCard
                  key={classification.id}
                  size={size}
                  subjectID={classification.links.subject}
                  mediaSrc={subjectMedia[0]}
                  projectSlug={classification.slug}
                />
              )
            })
          : null}
      </Box>
    </Box>
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
