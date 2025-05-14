import { Box, Heading, ResponsiveContext, Text } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'
import { useContext } from 'react'

import Avatar from './components/Avatar/Avatar.jsx'

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
  name = ''
}) {
  const size = useContext(ResponsiveContext)

  return (
    <Box
      className={className}
      data-testid='person-test-element'
      direction='row'
      gap='small'
      margin={{ bottom: 'small' }}
    >
      <Avatar avatarSrc={avatarSrc} name={name} screenSize={size} />
      <Box direction='column'>
        <Box direction='row' gap='xsmall' align='center'>
          <PersonName
            color={{ light: 'black', dark: 'white' }}
            level='3'
            size={size === 'small' ? '1rem' : '1.13rem'}
          >
            {`${name}, ${jobTitle}`}
          </PersonName>
        </Box>
        <Text size='medium' color={{ light: 'black', dark: 'white' }}>{bio}</Text>
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

export default Person
