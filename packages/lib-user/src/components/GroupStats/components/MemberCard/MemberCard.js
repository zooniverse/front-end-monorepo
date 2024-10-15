import { SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { number, string } from 'prop-types'

import { Avatar } from '@components/shared'

function MemberCard({
  avatar = '',
  classifications = 0,
  displayName = '',
  login = ''
}) {
  return (
    <Box
      direction='row'
      gap='xsmall'
    >
      <Avatar
        alt={`${login} avatar`}
        src={avatar || 'https://static.zooniverse.org/fem-assets/simple-avatar.jpg'}
      />
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
          {`${classifications.toLocaleString()} Classifications`}
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
