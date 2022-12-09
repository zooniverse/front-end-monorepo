import {
  Box,
  Button,
  Image,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef } from 'react';
import { withThemeContext } from '@zooniverse/react-components'

import theme from './theme'

export const THUMBNAIL_ASPECT_RATIO = 1.25

function ChoiceButton({
  ariaChecked = undefined,
  choiceId = '',
  choiceLabel = '',
  disabled = false,
  hasFocus = false,
  onChoose = () => true,
  onKeyDown = () => true,
  role='button',
  selected = false,
  src = '',
  tabIndex = -1,
  thumbnailSize = 'none'
}) {

  const choiceButton = useRef(null)
  const handleClick = useCallback(() => {
    onChoose(choiceId)
  }, [choiceId, onChoose])
  const handleKeyDown = useCallback((event) => {
    onKeyDown(choiceId, event)
  }, [choiceId, onKeyDown])

  useEffect(() => {
    if (choiceButton && hasFocus) {
      choiceButton.current.focus()
    }
  })

  let thumbnailHeight = 0
  if (thumbnailSize === 'small') {
    thumbnailHeight = 21
  }
  if (thumbnailSize === 'medium') {
    thumbnailHeight = 42
  }
  if (thumbnailSize === 'large') {
    thumbnailHeight = 84
  }

  const thumbnailWidth = Math.round(thumbnailHeight * THUMBNAIL_ASPECT_RATIO)
  const thumbnailSrc = `https://thumbnails.zooniverse.org/${thumbnailWidth}x${thumbnailHeight}/${src.slice(8)}`
  return (
    <Button
      ref={choiceButton}
      aria-checked={ariaChecked}
      disabled={disabled}
      fill
      label={
        <Box
          as='span'
          direction='row'
          fill
          align='center'
        >
          {thumbnailSize !== 'none' && src &&
            <Image
              alt={`${choiceLabel} media`}
              height='fill'
              margin={{ right: '1ch' }}
              src={thumbnailSrc}
              width={thumbnailWidth}
            />}
          <Text
            wordBreak='break-word'
          >
            {choiceLabel}
          </Text>
        </Box>
      }
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={role}
      selected={selected}
      size='small'
      tabIndex={tabIndex}
    />
  )
}

ChoiceButton.propTypes = {
  ariaChecked: PropTypes.string,
  choiceId: PropTypes.string,
  choiceLabel: PropTypes.string,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  onChoose: PropTypes.func,
  onKeyDown: PropTypes.func,
  role: PropTypes.string,
  selected: PropTypes.bool,
  src: PropTypes.string,
  tabIndex: PropTypes.number,
  thumbnailSize: PropTypes.string
}

export default withThemeContext(ChoiceButton, theme)
export { ChoiceButton }
