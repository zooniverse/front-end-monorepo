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
  let displayValue = value
  if (isNaN(value)) {
    displayValue = 0
  }

  return (
    <Box
      align='center'
    >
      <SpacedText
        color={{ dark: 'neutral-6', light: 'neutral-7' }}
        uppercase={false}
      >
        {title}
      </SpacedText>
      <SpacedText
        color='brand'
        size='xlarge'
        weight='bold'
      >
        {Math.round(displayValue).toLocaleString()}
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
  classifications = undefined,
  contributors = undefined,
  displayName = '',
  hours = undefined,
  login = '',
  projects = undefined,
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
        {classifications !== undefined ?
          <TitledStat
            title='Classifications'
            value={classifications} 
          />
          : null}
        {hours !== undefined ?
          <TitledStat
            title='Hours'
            value={hours}
          /> 
          : null}
        {contributors !== undefined ?
          <TitledStat
            title='Contributors'
            value={contributors}
          />
          : null}
        {projects !== undefined ?
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
