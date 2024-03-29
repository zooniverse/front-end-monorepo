import { SpacedHeading } from '@zooniverse/react-components'
import { Anchor, Box } from 'grommet'
import { number, string } from 'prop-types'
import styled, { css } from 'styled-components'

import { TitledStat } from '@components/shared'

const StyledListItem = styled.li`
  border-radius: 8px;
  list-style: none;
  padding: 20px;
  
  &:hover, &:focus-within {
    box-shadow: 1px 2px 6px 0px rgba(0, 0, 0, 0.25);
  }
`

const StyledAnchor = styled(Anchor)`
  &:hover, &:focus {
    text-decoration: none;
    outline: none;
    box-shadow: none;
  }
`

const StyledRole = styled(Box)`
  font-size: 9px;
  letter-spacing: 0.9px;
  display: flex;
  align-items: center;
  width: 90px;
  line-height: normal;
  padding: 5px 0;
  text-transform: uppercase;
  font-weight: bold;
  ${props =>
    css`
      color: ${props.theme.global.colors.black};
    `}
`

function GroupCard({
  classifications = 0,
  contributors = 0, // members
  displayName = '',
  hours = 0,
  id = '',
  projects = 0,
  role = ''
}) {
  return (
    <StyledListItem>
      <StyledAnchor
        href={`https://local.zooniverse.org:8080/?groups=${id}`}
      >
        <Box
          align='center'
          direction='row'
          gap='small'
        >
          <SpacedHeading
            color={{ light: 'neutral-1', dark: 'accent-1' }}
            size='16px'
          >
            {displayName}
          </SpacedHeading>
          <StyledRole
            round='xsmall'
            background={role === 'group_admin' ? 'neutral-2' : 'accent-1'}
          >
            {role === 'group_admin' ? 'Admin' : 'Member'}
          </StyledRole>
        </Box>
        <Box
          direction='row'
          justify='between'
        >
          <TitledStat
            title='Classifications'
            value={classifications}
          />
          <TitledStat
            title='Hours'
            value={hours}
          />
          <TitledStat
            title='Contributors'
            value={contributors}
          />
          <TitledStat
            title='Projects'
            value={projects}
          />
        </Box>
      </StyledAnchor>
    </StyledListItem>
  )
}

GroupCard.propTypes = {
  classifications: number,
  contributors: number,
  displayName: string,
  hours: number,
  id: string,
  projects: number,
  role: string
}

export default GroupCard
