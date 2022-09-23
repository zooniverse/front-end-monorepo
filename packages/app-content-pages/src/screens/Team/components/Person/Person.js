import { Box, Heading, Text } from 'grommet'
import { string } from 'prop-types'
import styled from 'styled-components'

import Avatar from './components/Avatar'
import TwitterLink from './components/TwitterLink'

const PersonName = styled(Heading)`
  font-size: 18px;
  margin: 0;
`

function Person (props) {
  const { avatarSrc, className, bio, jobTitle, name, twitter } = props

  return (
    <Box
      className={className}
      direction='row'
      gap='small'
      margin={{ bottom: 'small' }}
    >

      <Avatar avatarSrc={avatarSrc} name={name} />

      <Box direction='column'>
        <Box direction='row' gap='xsmall' align='center'>
          <PersonName level='3'>{`${name}, ${jobTitle}`}</PersonName>
          {twitter && (<TwitterLink name={name} twitterId={twitter} />)}
        </Box>
        <Text size='medium'>{bio}</Text>
      </Box>

    </Box>
  )
}

Person.propTypes = {
  authors: string,
  avatarSrc: string,
  className: string,
  title: string,
  url: string,
  year: string
}

export default Person
