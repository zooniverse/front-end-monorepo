import { CloseButton } from '@zooniverse/react-components'
import {
  Box,
  Button,
  Image,
  Text
} from 'grommet'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components'
import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'

import theme from './theme'

export const THUMBNAIL_ASPECT_RATIO = 1.25

function ChoiceButton({
  ariaChecked = undefined,
  choiceId = '',
  choiceLabel = '',
  columnsCount = 1,
  disabled = false,
  hasFocus = false,
  onChoose = () => true,
  onDelete = () => true,
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
  const handleDelete = useCallback(() => {
    onDelete(choiceId)
  }, [choiceId, onDelete])
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
    <Box
      align='center'
      direction='row'
    >
      <Button
        ref={choiceButton}
        aria-checked={ariaChecked}
        disabled={disabled}
        label={
          <Box
            align='center'
            direction='row'
            forwardedAs='span'
          >
            {thumbnailSize !== 'none' && src &&
              <Image
                alt=''
                height='fill'
                src={thumbnailSrc}
                width={thumbnailWidth}
              />}
            <Text>
              {choiceLabel}
            </Text>
          </Box>
        }
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={role}
        selected={selected}
        tabIndex={tabIndex}
      />
      {selected && (
        <CloseButton
          closeFn={handleDelete}
          disabled={disabled}
        />
      )}
    </Box>
  )
}

ChoiceButton.propTypes = {
  ariaChecked: PropTypes.string,
  choiceId: PropTypes.string,
  choiceLabel: PropTypes.string,
  columnsCount: PropTypes.number,
  disabled: PropTypes.bool,
  hasFocus: PropTypes.bool,
  onChoose: PropTypes.func,
  onDelete: PropTypes.func,
  onKeyDown: PropTypes.func,
  role: PropTypes.string,
  selected: PropTypes.bool,
  src: PropTypes.string,
  tabIndex: PropTypes.number,
  thumbnailSize: PropTypes.string
}

export default withThemeContext(ChoiceButton, theme)
export { ChoiceButton }
