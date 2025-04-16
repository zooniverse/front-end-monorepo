import { Box, Text } from 'grommet'
import { number, string } from 'prop-types'
import styled from 'styled-components'

import { useTranslation } from '../../translations/i18n'
import SpacedText from '../../SpacedText'

const StyledBox = styled(Box)`
  background: ${props => props.state === 'paused' ? 
    'rgba(67, 187, 253, 0.5)'
    : props.state === 'finished' ?
    'rgba(228, 89, 80, 0.5)'
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
  top: 5px;
`

function CardHeader({
  badge,
  state = 'live'
}) {
  if ((state === 'live' || state === 'development') && !badge) return null
  
  const { t } = useTranslation()

  let stateText
  if (state === 'paused') {
    stateText = t('ProjectCard.paused')
  } else if (state === 'finished') {
    stateText = t('ProjectCard.finished')
  }

  return (
    <StyledBox
      direction='row'
      align='center'
      height='30px'
      justify='center'
      round={{ corner: 'top', size: '8px' }}
      state={state}
    >
      {stateText ? (
        <SpacedText
          color='white'
          size='0.75rem'
          weight='bold'
        >
          {stateText}
        </SpacedText>
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
