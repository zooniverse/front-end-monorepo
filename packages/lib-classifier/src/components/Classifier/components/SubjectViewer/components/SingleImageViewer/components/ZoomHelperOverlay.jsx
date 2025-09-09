import { Box, Text } from 'grommet'
import { bool } from 'prop-types'
import styled, { keyframes } from 'styled-components'

import { useTranslation } from '@translations/i18n'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

const StyledOverlay = styled(Box)`
  position: absolute;
  top: 0;
  background: ${props => props.theme.dark ? 'rgba(45, 45, 45, 0.40)' : 'rgba(255, 255, 255, 0.40)'};
  backdrop-filter: blur(1px);
  pointer-events: none;
  animation: ${props => props.$fadeOut ? fadeOut : fadeIn} 0.3s forwards;
`

const StyledBox = styled(Box)`
  background: ${props => props.theme.dark ? 'rgba(45, 45, 45, 0.60)' : 'rgba(255, 255, 255, 0.60)'};
  backdrop-filter: blur(4px);
`

function ZoomHelperOverlay({
  fadingOut = false
}) {
  const { t } = useTranslation('components')

  return (
    <StyledOverlay
      align='center'
      direction='row'
      $fadeOut={fadingOut}
      justify='center'
      width='100%'
      height='100%'
    >
      <StyledBox
        align='center'
        flex='grow'
        height='120px'
        justify='center'
        pad={{ horizontal: 'medium', vertical: 'small' }}
        round='8px'
        width={{ max: '400px' }}
      >
        <Text
          weight='bold'
          size='18px'
        >
          {t('SubjectViewer.zoomHelp')}
        </Text>
      </StyledBox>
    </StyledOverlay>
  )
}

ZoomHelperOverlay.propTypes = {
  fadingOut: bool
}

export default ZoomHelperOverlay
