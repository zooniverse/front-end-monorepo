import { SpacedText } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { number, string } from 'prop-types'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  box-shadow: 8px 0px 6px -6px rgba(0, 0, 0, 0.25);
`

import { Avatar } from '@components/shared'

function MemberStats({
  avatar = '',
  classifications = 0,
  displayName = '',
  hours = 0,
  login = ''
}) {
  return (
    <StyledBox
      align='center'
      direction='row'
      gap='medium'
      justify='between'
      pad={{ horizontal: 'small' }}
      width={{ max: '400px', min: '400px' }}
    >
      <Box
        align='center'
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
            size='1rem'
            weight='bold'
          >
            {displayName}
          </SpacedText>
          <SpacedText
            size='small'
            uppercase={false}
          >
            @{login}
          </SpacedText>
        </Box>
      </Box>
      <Box>
        <Box
          align='center'
        >
          <SpacedText
            color={{ dark: 'neutral-6', light: 'neutral-7' }}
            uppercase={false}
          >
            Classifications
          </SpacedText>
          <SpacedText
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            size='large'
            weight='bold'
          >
            {classifications.toLocaleString()}
          </SpacedText>
        </Box>
        <Box
          align='center'
        >
          <SpacedText
            color={{ dark: 'neutral-6', light: 'neutral-7' }}
            uppercase={false}
          >
            Hours
          </SpacedText>
          <SpacedText
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            size='large'
            weight='bold'
          >
            {hours.toLocaleString()}
          </SpacedText>
        </Box>
      </Box>
    </StyledBox>
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
