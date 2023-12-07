import { Box, Image } from 'grommet'
import { number, string } from 'prop-types'
import styled from 'styled-components'
import { SpacedText, withResponsiveContext, ZooniverseLogo } from '@zooniverse/react-components'

const StyledAvatar = styled(Image)`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`

// TitledStat component will be moved to a shared folder when necessary

function TitledStat ({
  title = '',
  value = 0 
}) {
  return (
    <Box
      align='center'
    >
      <SpacedText
        color={{ dark: 'neutral-6', light: 'neutral-7' }}
        size='xsmall'
        uppercase={false}
      >
        {title}
      </SpacedText>
      <SpacedText
        color='brand'
        size='xlarge'
        weight='bold'
      >
        {value}
      </SpacedText>
    </Box>
  )
}

TitledStat.propTypes = {
  title: string.isRequired,
  value: number.isRequired
}

function ProfileHeader ({
  avatar = '',
  classifications = 0,
  contributors = 0,
  displayName = '',
  hours = 0,
  login = '',
  projects = 0,
  screenSize = 'medium'
}) {
  return (
    <Box
      align='center'
      direction={screenSize === 'small' ? 'column' : 'row'}
      gap='small'
      justify={screenSize === 'small' ? 'center' : 'between'}
    >
      <Box
        direction='row'
        gap='small'
      >
        {avatar ?
          <StyledAvatar
            src={avatar}
            alt={`${login} avatar`}
          />
          : <ZooniverseLogo id='GroupZooniverseLogo' size='50px' />}
        <Box
          align={screenSize === 'small' ? 'start' : 'center'}
          direction={screenSize === 'small' ? 'column' : 'row'}
          justify='center'
          gap={screenSize === 'small' ? 'none' : 'small'}
        >
          <SpacedText
            color='brand'
            size='large'
            weight='bold'
          >
            {displayName}
          </SpacedText>
          {login ?
            <SpacedText
              uppercase={false}
            >
              @{login}
            </SpacedText>
            : null}
        </Box>
      </Box>
      <Box
        align='center'
        direction='row'
        gap='small'
      >
        {classifications ?
          <TitledStat
            title='Classifications'
            value={classifications} 
          />
          : null}
        {hours ?
          <TitledStat
            title='Hours'
            value={hours}
          /> 
          : null}
        {contributors ?
          <TitledStat
            title='Contributors'
            value={contributors}
          />
          : null}
        {projects ?
          <TitledStat
            title='Projects'
            value={projects}
          />
          : null}
      </Box>
    </Box>
  )
}

ProfileHeader.propTypes = {
  avatar: string,
  classifications: number,
  contributors: number,
  displayName: string,
  hours: number,
  login: string,
  projects: number,
  screenSize: string
}

export default withResponsiveContext(ProfileHeader)
