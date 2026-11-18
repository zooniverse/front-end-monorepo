import { Box } from 'grommet'
import styled from 'styled-components'

import { useTranslation } from '../../../translations/i18n'
import SpacedText from '../../../SpacedText'

const StyledBanner = styled(Box)`
  backdrop-filter: blur(4px);
  height: 30px;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
`

/**
 * Static "Collection Cover" banner shown at the top of the cover subject's SubjectCard.
 */
function CollectionCoverBanner() {
  const { t } = useTranslation()

  return (
    <StyledBanner
      align='center'
      background={{ color: 'neutral-1', opacity: 0.6 }}
      justify='center'
      round={{ corner: 'top', size: '8px' }}
    >
      <SpacedText
        color='white'
        size='0.75rem'
        weight='normal'
      >
        {t('SubjectCard.collectionCover')}
      </SpacedText>
    </StyledBanner>
  )
}

export default CollectionCoverBanner
