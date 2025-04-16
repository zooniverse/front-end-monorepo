import { Box, Text } from 'grommet'
import { number, string } from 'prop-types'
import styled from 'styled-components'

const StyledBox = styled(Box)`
  background: ${props => props.state === 'paused' ? 
    props.theme.global.colors['neutral-5']
    : props.state === 'finished' ?
    props.theme.global.colors['neutral-4']
    : undefined};
  position: relative;
`

const StyledBadge = styled(Text)`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  height: fit-content;
  min-width: 0.75rem;
  padding: 2px 3px;
  position: absolute;
  right: 5px;
  text-align: center;
`

function CardHeader({
  badge,
  state = 'live'
}) {
  if (state === 'live' && !badge) return null
  
  return (
    <StyledBox
      direction='row'
      align='center'
      height='30px'
      justify='center'
      round={{ corner: 'top', size: '8px' }}
      state={state}
    >
      {state !== 'live' ? (
        <Text
          color='white'
          size='0.75rem'
          weight='bold'
        >
          {state.toUpperCase()}
        </Text>
      ) : null}
      {badge ? (
        <StyledBadge
          color='black'
          size='0.75rem'
          weight='bold'
          elevation='small'
        >
          {badge}
        </StyledBadge>
      ) : null}
    </StyledBox>
  )
}

CardHeader.propTypes = {
  badge: number,
  state: string
}

export default CardHeader
