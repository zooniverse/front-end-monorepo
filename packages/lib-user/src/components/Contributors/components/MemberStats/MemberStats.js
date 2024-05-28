import { SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { number, string } from 'prop-types'

import {
  Avatar,
  TitledStat
} from '@components/shared'

function MemberStats({
  avatar = '',
  classifications = 0,
  displayName = '',
  hours = 0,
  login = ''
}) {
  return (
    <Box
      align='center'
      direction='row'
      gap='medium'
    >
      <Box
        direction='row'
        gap='xsmall'
      >
        <Avatar
          alt={`${login} avatar`}
          src={avatar || 'https://www.zooniverse.org/assets/simple-avatar.png'}
        />
        <Box
          flex='grow'
        >
          <SpacedText
            color={{ dark: 'accent-1', light: 'neutral-1' }}
            size='large'
            weight='bold'
          >
            {displayName}
          </SpacedText>
          <SpacedText
            uppercase={false}
          >
            @{login}
          </SpacedText>
        </Box>
      </Box>
      <Box>
        <TitledStat
          title='Classifications'
          value={classifications}
        />
        <TitledStat
          title='Hours'
          value={hours}
        />
      </Box>
    </Box>
  )
}

MemberStats.propTypes = {
  avatar: string,
  classifications: number,
  displayName: string,
  hours: number,
  login: string
}

export default MemberStats
