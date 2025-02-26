import { Box, Heading, Text } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'
import withResponsiveContext from '@zooniverse/react-components/helpers/withResponsiveContext'

import Avatar from './components/Avatar'

const PersonName = styled(Heading)`
  margin: 0;
  line-height: 1.4;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`

function Person({
  avatarSrc = '',
  className = '',
  bio = '',
  jobTitle = '',
  name = '',
  screenSize = 'medium',
}) {
  return (
    <Box
      className={className}
      data-testid='person-test-element'
      direction='row'
      gap='small'
      margin={{ bottom: 'small' }}
    >
      <Avatar avatarSrc={avatarSrc} name={name} screenSize={screenSize} />
      <Box direction='column'>
        <Box direction='row' gap='xsmall' align='center'>
          <PersonName
            color={{ light: 'black', dark: 'white' }}
            level='3'
            size={screenSize === 'small' ? '1rem' : '1.13rem'}
          >
            {`${name}, ${jobTitle}`}
          </PersonName>
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
}

export default withResponsiveContext(Person)
