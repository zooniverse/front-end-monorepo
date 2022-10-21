import {
  Box,
  Button,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef } from 'react'
import { Media, withThemeContext } from '@zooniverse/react-components'

import theme from './theme'

export const THUMBNAIL_ASPECT_RATIO = 1.25

function ChoiceButton({
  choiceId = '',
  choiceLabel = '',
  disabled = false,
  hasFocus = false,
  onKeyDown = () => true,
  onChoose = () => true,
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

  return (
    <Button
      a11yTitle={choiceLabel}
      ref={choiceButton}
      disabled={disabled}
      fill
      label={
        <Box
          direction='row'
          fill
          align='center'
        >
          {thumbnailSize !== 'none' && src &&
            <Media
              alt={choiceLabel}
              height={thumbnailHeight}
              margin={{ right: '1ch' }}
              src={src}
              width={Math.round(thumbnailHeight * THUMBNAIL_ASPECT_RATIO)}
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
      selected={selected}
      size='small'
      tabIndex={tabIndex}
    />
  )
}

ChoiceButton.propTypes = {
  choiceId: PropTypes.string,
  choiceLabel: PropTypes.string,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  onChoose: PropTypes.func,
  onKeyDown: PropTypes.func,
  selected: PropTypes.bool,
  src: PropTypes.string,
  tabIndex: PropTypes.number,
  thumbnailSize: PropTypes.string
}

export default withThemeContext(ChoiceButton, theme)
export { ChoiceButton }
