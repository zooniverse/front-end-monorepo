import { Box } from 'grommet'
import styled from 'styled-components'

import { useTranslation } from '@translations/i18n'

const StyledBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.4;
`

function LoadingPlaceholder() {
  const { t } = useTranslation()
  return (
    <StyledBox
      background={{ light: 'neutral-6', dark: 'dark-3' }}
      fill
    />
  )
}

export default LoadingPlaceholder
