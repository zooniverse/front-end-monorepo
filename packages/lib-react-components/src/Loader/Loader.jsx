import { string } from 'prop-types'
import { Box } from 'grommet'
import { useTranslation } from '../translations/i18n'
import styled from 'styled-components'

const StyledBar = styled(Box)`
  @keyframes bounce-height {
    0% {
      height: 20%;
    }

    10% {
      height: 100%;
    }

    100% {
      height 20%;
    }
  }

  animation: bounce-height 1s linear 0s infinite;
  height: 20%;
  width: 10%;
  border-radius: 4px;
  background: ${props => props.theme.global.colors.brand};

  &.delayed-one {
    animation: bounce-height 1s linear 200ms infinite;
  }

  &.delayed-two {
    animation: bounce-height 1s linear 500ms infinite;
  }
`

function Loader({
  height = 'xxsmall',
  loadingMessage = '',
  width = 'xxsmall'
}) {
  const { t } = useTranslation()

  return (
    <Box
      a11yTitle={loadingMessage || t('Loader.loading')}
      role='status'
      direction='row'
      justify='between'
      align='center'
      height={height}
      width={width}
    >
      <StyledBar className='delayed-two' />
      <StyledBar className='delayed-one' />
      <StyledBar />
      <StyledBar className='delayed-one' />
      <StyledBar className='delayed-two' />
    </Box>
  )
}

Loader.propTypes = {
  height: string,
  loadingMessage: string,
  width: string
}

export default Loader
