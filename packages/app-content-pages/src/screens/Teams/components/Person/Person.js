import { Box, Heading, Text } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

import Avatar from './components/Avatar'
import TwitterLink from './components/TwitterLink'

const PersonName = styled(Heading)`
  font-size: 18px;
  margin: 0;
`

function Person({
  avatarSrc = '',
  className = '',
  bio = '',
  jobTitle = '',
  name = '',
  twitterID = ''
}) {
  return (
    <Box
      className={className}
      data-testid='person-test-element'
      direction='row'
      gap='small'
      margin={{ bottom: 'small' }}
    >
      <Avatar avatarSrc={avatarSrc} name={name} />

      <Box direction='column'>
        <Box direction='row' gap='xsmall' align='center'>
          <PersonName level='3'>{`${name}, ${jobTitle}`}</PersonName>
          {twitterID && <TwitterLink name={name} twitterId={twitterID} />}
        </Box>
        <Text size='medium'>{bio}</Text>
      </Box>
    </Box>
  )
}

Person.propTypes = {
  avatarSrc: string,
  className: string,
  bio: string,
  jobTitle: string,
  name: string,
  twitterID: string
}

export default Person
