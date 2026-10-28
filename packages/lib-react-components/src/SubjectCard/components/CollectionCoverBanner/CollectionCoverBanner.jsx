import { Box } from 'grommet'
import { rgba } from 'polished'
import { bool, func } from 'prop-types'
import styled, { css } from 'styled-components'

import { useTranslation } from '../../../translations/i18n'
import SpacedText from '../../../SpacedText'

const bannerStyles = css`
  backdrop-filter: blur(4px);
  background: ${props => rgba(props.theme.global.colors['neutral-1'], 0.6)};
  height: 30px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
`

// Static banner must not intercept clicks meant for the media link below it.
const StyledBanner = styled(Box)`
  ${bannerStyles}
  pointer-events: none;
`

const StyledButton = styled.button`
  ${bannerStyles}
  align-items: center;
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  opacity: 0;
  padding: 0;

  &:hover {
    background: ${props => rgba(props.theme.global.colors['neutral-1'], 0.85)};
  }

  &:focus-visible {
    background: ${props => rgba(props.theme.global.colors['neutral-1'], 0.85)};
    border: 1px solid ${props => props.theme.global.colors.white};
    box-shadow: 0 0 8px 2px ${props => props.theme.global.colors['neutral-1']};
    opacity: 1;
  }

  @media (hover: none) {
    opacity: 1;
  }
`

/**
 * Banner shown at the top of a SubjectCard. Renders a static "Collection Cover"
 * label for the cover subject, or a "Set as Collection Cover" button that is
 * revealed when the card is hovered or focused.
 */
function CollectionCoverBanner({
  isCover = false,
  onSetCover = null
}) {
  const { t } = useTranslation()

  if (isCover) {
    return (
      <StyledBanner
        align='center'
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

  if (onSetCover) {
    return (
      <StyledButton
        data-set-cover
        onClick={onSetCover}
        type='button'
      >
        <SpacedText
          color='white'
          size='0.75rem'
          weight='bold'
        >
          {t('SubjectCard.setAsCollectionCover')}
        </SpacedText>
      </StyledButton>
    )
  }

  return null
}

CollectionCoverBanner.propTypes = {
  isCover: bool,
  onSetCover: func
}

export default CollectionCoverBanner
