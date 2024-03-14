import { SpacedHeading } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { number, string } from 'prop-types'
import styled, { css } from 'styled-components'

import TitledStat from '../../../shared/TitledStat'

const StyledBox = styled(Box)`
  border-radius: 8px;

  &:hover, &:focus {
    box-shadow: 1px 2px 6px 0px rgba(0, 0, 0, 0.25);
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
  displayName = '',
  classifications = 0,
  contributors = 0, // members
  hours = 0,
  projects = 0,
  role = ''
}) {
  return (
    <StyledBox
      pad='small'
    >
      <Box
        align='center'
        direction='row'
        gap='small'
      >
        <SpacedHeading
          color='neutral-1'
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
    </StyledBox>
  )
}

GroupCard.propTypes = {
  displayName: string,
  classifications: number,
  contributors: number,
  hours: number,
  projects: number,
  role: string
}

export default GroupCard
