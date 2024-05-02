import { SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { number, string } from 'prop-types'

import { Avatar } from '@components/shared'

function MemberCard({
  avatar = 'https://www.zooniverse.org/assets/simple-avatar.png',
  classifications = 0,
  displayName = '',
  login = ''
}) {
  let displayValue = classifications
  if (isNaN(classifications)) {
    displayValue = 0
  }

  return (
    <Box
      direction='row'
      gap='xsmall'
    >
      {avatar ? (
        <Avatar
          alt={`${login} avatar`}
          src={avatar}
        />) : (
        <Avatar
          alt={`${login} avatar`}
          src='https://www.zooniverse.org/assets/simple-avatar.png'
        />)}
      <Box
        justify='center'
      >
        <SpacedText
          weight='bold'
        >
          {displayName}
        </SpacedText>
        <SpacedText
          uppercase={false}
        >
          {`${Math.round(displayValue).toLocaleString()} Classifications`}
        </SpacedText>
      </Box>
    </Box>
  )
}

MemberCard.propTypes = {
  avatar: string,
  classifications: number,
  displayName: string,
  login: string
}

export default MemberCard
